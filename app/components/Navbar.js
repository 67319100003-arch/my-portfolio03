'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'เกี่ยวกับวิทยาลัย', href: '#about' },
  { label: 'หลักสูตร', href: '#departments' },
  { label: 'ข่าวสาร', href: '#news' },
  { label: 'ติดต่อเรา', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40'
        : 'bg-slate-950/70 backdrop-blur-md'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-lg shadow-blue-500/20 flex-shrink-0">
              <img src="/op.jpg" alt="TCC Logo" className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight">
              <span className="text-sm font-black tracking-widest text-white block group-hover:text-blue-400 transition-colors">TCC</span>
              <span className="text-[10px] text-slate-400 font-medium">พณิชยการธนบุรี</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-3 px-4 py-1.5 rounded-lg text-xs font-bold border border-blue-500/50 text-blue-400 hover:bg-blue-500/15 hover:border-blue-400 hover:text-blue-300 transition-all duration-200"
            >
              ⚙ แอดมิน
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/8 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="mt-1 px-3 py-2.5 rounded-lg text-sm font-bold text-blue-400 hover:bg-blue-500/15 transition-all"
            >
              ⚙ แอดมิน
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}