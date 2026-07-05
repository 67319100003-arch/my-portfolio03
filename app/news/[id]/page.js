import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function formatThaiDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() + 543}`;
}

const categoryColor = {
  'ประชาสัมพันธ์': 'text-blue-400 bg-blue-500/10 border-blue-500/25',
  'จัดซื้อ': 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  'ประกาศ': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
};

export default async function NewsDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !news) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6">
        <article className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-blue-400 transition-colors">หน้าแรก</Link>
            <span>/</span>
            <span className="text-slate-400">ข่าวประชาสัมพันธ์</span>
          </nav>

          {/* Category badge */}
          {news.category && (
            <span className={`inline-block text-[10px] font-black px-3 py-1 rounded-full border mb-5 ${categoryColor[news.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/25'}`}>
              {news.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            {news.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-8 pb-6 border-b border-white/8">
            <span className="flex items-center gap-1.5">
              <span>📅</span> {formatThaiDate(news.created_at)}
            </span>
            {news.file_url && (
              <a
                href={news.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-bold"
              >
                📎 ดาวน์โหลดเอกสารแนบ
              </a>
            )}
          </div>

          {/* Hero image */}
          {news.image_url && (
            <div className="overflow-hidden rounded-2xl mb-10 border border-white/8 max-h-[450px]">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body */}
          <div className="text-slate-300 text-base leading-relaxed whitespace-pre-line space-y-4">
            {news.content}
          </div>

          {/* Back */}
          <div className="mt-14 pt-8 border-t border-white/8">
            <Link
              href="/#news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
            >
              ← กลับหน้าข่าวทั้งหมด
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
