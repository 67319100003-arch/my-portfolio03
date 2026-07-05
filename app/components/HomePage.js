import Link from 'next/link';
import { supabase } from '../lib/supabase';

const shortcuts = [
  { name: 'ระบบทะเบียน (RMS)', icon: '📊', url: '#' },
  { name: 'ห้องเรียนออนไลน์', icon: '📚', url: '#' },
  { name: 'ระบบจัดซื้อจัดจ้าง', icon: '📝', url: '#' },
  { name: 'ติดต่อฝ่ายบริหาร', icon: '🤝', url: '#' },
];

export default async function HomePage() {
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  const newsData = newsItems || [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* 1. Hero Banner */}
      <header className="bg-gradient-to-br from-blue-900 via-blue-850 to-indigo-950 text-white p-8 md:p-12 rounded-2xl text-center shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-70"></div>
        <h1 className="text-2xl md:text-4xl font-black tracking-tight">วิทยาลัยพณิชยการธนบุรี</h1>
        <p className="text-blue-200/90 text-xs md:text-sm mt-2 max-w-md mx-auto font-light">
          มุ่งมั่นสร้างสรรค์ ยกระดับวิชาชีพ สู่มาตรฐานสากล
        </p>
      </header>

      {/* 2. ทางลัดระบบสารสนเทศ */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {shortcuts.map((item, idx) => (
          <a key={idx} href={item.url} className="bg-white p-3.5 rounded-xl border border-slate-100 text-center shadow-sm hover:shadow-md hover:border-blue-200 transition active:scale-95 flex flex-col items-center justify-center">
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-bold text-slate-600 tracking-wide">{item.name}</span>
          </a>
        ))}
      </section>

      {/* 3. ข่าวเด่น */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">✨ ข่าวเด่นประจำสัปดาห์</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {newsData.map((news) => (
            <div key={news.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group">
              <div className="overflow-hidden h-36 bg-slate-50">
                <img src={news.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" alt={news.title} />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between bg-white">
                <h3 className="font-bold text-xs md:text-sm text-slate-700 line-clamp-2 group-hover:text-blue-600 transition mb-3">{news.title}</h3>
                <Link href={`/news/${news.id}`} className="text-xs font-extrabold text-blue-600 inline-flex items-center gap-0.5 hover:gap-1.5 transition-all">
                  อ่านต่อ ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}