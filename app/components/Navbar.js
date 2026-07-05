'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center">
        
        {/* โลโก้ + ชื่อวิทยาลัย */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-white rounded-full overflow-hidden flex items-center justify-center p-0.5 border border-blue-800 shadow-sm">
            {/* 🖼️ เรียกใช้รูปภาพโลโก้จากโฟลเดอร์ public */}
            <img 
              src="/op.jpg" 
              alt="โลโก้ พณิชยการธนบุรี" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="leading-tight">
            <span className="text-sm font-black tracking-wide block group-hover:text-amber-400 transition">TCC</span>
            <span className="text-[10px] text-blue-200 block">พณิชยการธนบุรี</span>
          </div>
        </Link>

        {/* เมนูสำหรับ Desktop (กระชับและปรับช่องไฟให้สวยขึ้น) */}
        <div className="hidden md:flex space-x-6 text-xs font-bold tracking-wide items-center">
          <Link href="/" className="hover:text-amber-400 transition">หน้าแรก</Link>
          <Link href="#" className="hover:text-amber-400 transition">เกี่ยวกับวิทยาลัย</Link>
          <Link href="#" className="hover:text-amber-400 transition">หลักสูตร</Link>
          <Link href="#" className="hover:text-amber-400 transition">ติดต่อเรา</Link>
          <Link href="/admin" className="hover:text-amber-400 bg-blue-800 px-3 py-1 rounded-lg border border-blue-700/50 hover:bg-blue-700 transition">แอดมิน</Link>
        </div>

        {/* ปุ่ม Hamburger สำหรับ Mobile */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-1 text-blue-200 hover:text-white focus:outline-none transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* เมนูที่กางออกบน Mobile */}
      {isOpen && (
        <div className="md:hidden bg-blue-950 border-t border-blue-800 px-6 py-4 flex flex-col space-y-3 text-xs font-bold shadow-inner">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-amber-400 py-0.5">หน้าแรก</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-amber-400 py-0.5">เกี่ยวกับวิทยาลัย</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-amber-400 py-0.5">หลักสูตร</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-amber-400 py-0.5">ติดต่อเรา</Link>
          <Link href="/admin" onClick={() => setIsOpen(false)} className="text-amber-400 py-0.5">แอดมิน</Link>
        </div>
      )}
    </nav>
  );
}