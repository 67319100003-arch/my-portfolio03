import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
      
      <main className="flex-grow max-w-3xl mx-auto my-12 px-4 space-y-6">
        {/* ปุ่มย้อนกลับ */}
        <Link 
          href="/" 
          className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 hover:gap-2 transition-all"
        >
          ➔ ย้อนกลับหน้าหลัก
        </Link>

        {/* หัวข้อข่าว */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            {news.title}
          </h1>
          <div className="flex items-center text-xs text-slate-400 gap-2">
            <span>📅 {formatThaiDate(news.created_at)}</span>
          </div>
        </div>

        {/* รูปภาพหลัก */}
        {news.img && (
          <div className="overflow-hidden bg-slate-100 rounded-2xl max-h-[400px] border shadow-sm">
            <img 
              src={news.img} 
              className="w-full h-full object-cover" 
              alt={news.title} 
            />
          </div>
        )}

        {/* เนื้อหาข่าว */}
        <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm md:text-base whitespace-pre-line pt-4">
          {news.content}
        </article>
      </main>

      <Footer />
    </div>
  );
}
