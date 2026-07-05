import Link from 'next/link';
import { supabase } from '../lib/supabase';

function formatThaiDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() + 543;
  return `${day} ${month} ${year}`;
}

export default async function NewsListPage() {
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  const allNews = newsItems || [];

  return (
    <main className="max-w-5xl mx-auto my-12 px-4 space-y-8">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-black text-amber-500 tracking-wide">ข่าวประชาสัมพันธ์ทั้งหมด</h1>
        <p className="text-gray-400 text-xs mt-1">อัปเดตกิจกรรมและข่าวสารล่าสุดจากวิทยาลัย</p>
      </div>

      {/* News Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allNews.map((news) => (
          <div key={news.id} className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group">
            {/* รูปภาพพร้อมเอฟเฟกต์ซูมเบาๆ เวลา Hover */}
            <div className="overflow-hidden bg-slate-100 h-40">
              <img 
                src={news.img} 
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105" 
                alt={news.title} 
              />
            </div>
            
            {/* เนื้อหา */}
            <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
              <div>
                <span className="text-[11px] font-medium text-slate-400 block">{formatThaiDate(news.created_at)}</span>
                <h3 className="font-bold text-sm text-slate-800 line-clamp-2 mt-1 group-hover:text-blue-600 transition">
                  <Link href={`/news/${news.id}`}>{news.title}</Link>
                </h3>
              </div>
              
              <Link href={`/news/${news.id}`} className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 self-start">
                อ่านต่อ ➔
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}