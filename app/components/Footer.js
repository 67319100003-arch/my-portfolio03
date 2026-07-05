import Link from 'next/link';

const quickLinks = [
  { label: 'ข่าวประชาสัมพันธ์', href: '#news' },
  { label: 'หลักสูตรที่เปิดสอน', href: '#departments' },
  { label: 'เกี่ยวกับวิทยาลัย', href: '#about' },
  { label: 'ติดต่อเรา', href: '#contact' },
];

const systemLinks = [
  { label: 'ระบบทะเบียน (RMS)', href: '#' },
  { label: 'ห้องเรียนออนไลน์', href: '#' },
  { label: 'ดาวน์โหลดเอกสาร', href: '#' },
  { label: 'ปฏิทินการศึกษา', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-slate-950 border-t border-white/10">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-white tracking-wide">วิทยาลัยพณิชยการธนบุรี</h3>
              <p className="text-xs text-blue-400 font-semibold tracking-widest mt-0.5">THONBURI COMMERCIAL COLLEGE</p>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              เลขที่ 50 ซอยพาณิชยการธนบุรี แขวงวัดท่าพระ<br />
              เขตบางกอกใหญ่ กรุงเทพฯ 10600
            </p>
            <div className="space-y-1 text-sm text-slate-400">
              <p>📞 02-412-3456</p>
              <p>✉️ info@tcc.ac.th</p>
            </div>
            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-sm font-bold">f</a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10 transition-all text-xs font-black">LINE</a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all text-xs">▶</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">เมนูหลัก</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* System Links */}
          <div>
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">ระบบสารสนเทศ</h4>
            <ul className="space-y-2.5">
              {systemLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">
            © 2569 วิทยาลัยพณิชยการธนบุรี — สงวนลิขสิทธิ์
          </p>
          <p className="text-xs text-slate-600">
            Powered by Next.js + Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}