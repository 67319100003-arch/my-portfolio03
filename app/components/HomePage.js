import Link from 'next/link';
import { supabase } from '../lib/supabase';

const shortcuts = [
  { name: 'ระบบทะเบียน (RMS)', icon: '📊', url: '#', color: 'blue' },
  { name: 'ห้องเรียนออนไลน์', icon: '📚', url: '#', color: 'purple' },
  { name: 'ระบบจัดซื้อจัดจ้าง', icon: '📝', url: '#', color: 'amber' },
  { name: 'ติดต่อฝ่ายบริหาร', icon: '🤝', url: '#', color: 'emerald' },
];

const colorMap = {
  blue:    'hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-blue-500/20',
  purple:  'hover:border-purple-500/50 hover:bg-purple-500/10 hover:shadow-purple-500/20',
  amber:   'hover:border-amber-500/50 hover:bg-amber-500/10 hover:shadow-amber-500/20',
  emerald: 'hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-emerald-500/20',
};

export default async function HomePage() {
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  const newsData = newsItems || [];

  return (
    <div className="flex flex-col">

      {/* ═══ HERO SECTION ═══ */}
      <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background orbs */}
        <div className="orb orb-blue w-[600px] h-[600px] top-[-100px] left-[-200px] animate-glow-pulse" />
        <div className="orb orb-gold w-[400px] h-[400px] bottom-[-50px] right-[-100px] animate-glow-pulse" style={{animationDelay:'1.5s'}} />
        <div className="orb orb-purple w-[300px] h-[300px] top-[40%] right-[15%] animate-glow-pulse" style={{animationDelay:'0.8s'}} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize:'48px 48px'}} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            อาชีวศึกษา · กรุงเทพมหานคร
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 animate-fade-up" style={{animationDelay:'0.1s'}}>
            <span className="gradient-text">วิทยาลัย</span>
            <br />
            <span className="text-white">พณิชยการธนบุรี</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10 animate-fade-up" style={{animationDelay:'0.2s'}}>
            มุ่งมั่นสร้างสรรค์ ยกระดับวิชาชีพ สู่มาตรฐานสากล<br />
            <span className="text-slate-500 text-sm">Thonburi Commercial College</span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-up" style={{animationDelay:'0.3s'}}>
            <Link
              href="#news"
              className="px-7 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              ข่าวประชาสัมพันธ์
            </Link>
            <Link
              href="#contact"
              className="px-7 py-3 rounded-xl bg-white/8 border border-white/15 text-white font-bold text-sm hover:bg-white/14 hover:border-white/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              ติดต่อเรา
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-slate-600 animate-float">
            <span className="text-xs font-medium">เลื่อนลงเพื่อดูข้อมูล</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══ SHORTCUTS ═══ */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {shortcuts.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className={`glass-card p-5 flex flex-col items-center text-center gap-3 border border-white/8 hover:shadow-xl transition-all duration-300 ${colorMap[item.color]}`}
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs font-bold text-slate-300 leading-snug">{item.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ NEWS SECTION ═══ */}
      <section id="news" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-black text-blue-400 tracking-widest uppercase mb-2">NEWS & UPDATES</p>
            <h2 className="text-3xl font-black text-white">ข่าวเด่นประจำสัปดาห์</h2>
            <div className="section-divider mt-3" />
          </div>
          <Link href="/news" className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-400 transition-colors group">
            ดูทั้งหมด
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Cards */}
        {newsData.length === 0 ? (
          <div className="text-center py-16 text-slate-600">
            <p className="text-4xl mb-3">📰</p>
            <p className="text-sm">ยังไม่มีข่าวประชาสัมพันธ์ในขณะนี้</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newsData.map((news, i) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="group glass-card overflow-hidden border border-white/8 hover:border-blue-500/30 flex flex-col"
              >
                <div className="h-44 bg-slate-800 overflow-hidden flex-shrink-0">
                  {news.image_url ? (
                    <img
                      src={news.image_url}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  {news.category && (
                    <span className="inline-block text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full mb-3 self-start">
                      {news.category}
                    </span>
                  )}
                  <h3 className="font-bold text-sm text-slate-200 line-clamp-2 group-hover:text-blue-400 transition-colors leading-snug flex-grow">
                    {news.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/8">
                    <span className="text-[11px] text-slate-500">
                      {new Date(news.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-xs font-bold text-blue-400 group-hover:gap-2 flex items-center gap-1">
                      อ่านต่อ <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/news" className="text-sm font-bold text-blue-400 hover:text-blue-300">ดูข่าวทั้งหมด →</Link>
        </div>
      </section>

      {/* ═══ STATS BAND ═══ */}
      <section className="py-12 my-8 bg-gradient-to-r from-blue-600/10 via-slate-800/50 to-amber-500/10 border-y border-white/8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { num: '60+', label: 'ปีแห่งประสบการณ์' },
            { num: '5,000+', label: 'ศิษย์เก่า' },
            { num: '4', label: 'สาขาวิชาหลัก' },
            { num: '100%', label: 'มุ่งมั่นพัฒนา' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black gradient-text">{stat.num}</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}