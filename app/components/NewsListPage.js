import Link from 'next/link';
import { supabase } from '../lib/supabase';

function formatThaiDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() + 543}`;
}

const categoryColor = {
  'ประชาสัมพันธ์': 'text-blue-400 bg-blue-500/10 border-blue-500/25',
  'จัดซื้อ': 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  'ประกาศ': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
};

export default async function NewsListPage() {
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  const allNews = newsItems || [];

  return (
    <section id="news-list" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-black text-blue-400 tracking-widest uppercase mb-3">NEWS & ANNOUNCEMENTS</p>
        <h2 className="text-4xl font-black text-white mb-3">ข่าวประชาสัมพันธ์ทั้งหมด</h2>
        <div className="section-divider" />
        <p className="text-slate-400 text-sm mt-4">อัปเดตกิจกรรมและข่าวสารล่าสุดจากวิทยาลัยพณิชยการธนบุรี</p>
      </div>

      {/* Grid */}
      {allNews.length === 0 ? (
        <div className="text-center py-24 text-slate-600">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-sm font-medium">ยังไม่มีข่าวประชาสัมพันธ์</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="group glass-card overflow-hidden border border-white/8 hover:border-blue-500/30 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 bg-slate-800 overflow-hidden flex-shrink-0">
                {news.image_url ? (
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">📰</div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                {news.category && (
                  <span className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full border mb-3 self-start ${categoryColor[news.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/25'}`}>
                    {news.category}
                  </span>
                )}
                <h3 className="font-bold text-sm text-slate-200 line-clamp-2 group-hover:text-blue-300 transition-colors flex-grow leading-snug mb-4">
                  {news.title}
                </h3>
                <div className="flex items-center justify-between pt-3 border-t border-white/8">
                  <span className="text-[11px] text-slate-500 font-medium">{formatThaiDate(news.created_at)}</span>
                  <span className="text-xs font-black text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    อ่านต่อ →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}