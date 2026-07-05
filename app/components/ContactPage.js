'use client';

export default function ContactPage() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs font-black text-blue-400 tracking-widest uppercase mb-3">GET IN TOUCH</p>
        <h2 className="text-4xl font-black text-white mb-3">ติดต่อเรา</h2>
        <div className="section-divider mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left: Info */}
        <div className="space-y-6">
          <div className="glass-card border border-white/8 p-7 space-y-5">
            <h3 className="font-black text-white text-lg">วิทยาลัยพณิชยการธนบุรี</h3>
            <div className="space-y-4">
              {[
                { icon: '📍', label: 'ที่อยู่', value: '50 ซอยพาณิชยการธนบุรี แขวงวัดท่าพระ เขตบางกอกใหญ่ กรุงเทพฯ 10600' },
                { icon: '📞', label: 'โทรศัพท์', value: '02-412-3456' },
                { icon: '⏰', label: 'เวลาทำการ', value: 'จันทร์–ศุกร์ 08:00–17:00 น.' },
                { icon: '✉️', label: 'อีเมล', value: 'info@tcc.ac.th' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-base">{item.icon}</span>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm text-slate-300 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map embed placeholder */}
          <div className="rounded-2xl overflow-hidden border border-white/8 h-52">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0623!2d100.4762!3d13.7399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ0JzIzLjciTiAxMDDCsDI4JzM0LjMiRQ!5e0!3m2!1sth!2sth!4v1000000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="แผนที่วิทยาลัยพณิชยการธนบุรี"
            />
          </div>
        </div>

        {/* Right: Form */}
        <div className="glass-card border border-white/8 p-7">
          <h3 className="font-black text-white text-lg mb-6">ส่งข้อความถึงเรา</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">ชื่อ-นามสกุล</label>
              <input
                type="text"
                placeholder="กรอกชื่อของคุณ"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 focus:shadow-lg focus:shadow-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">อีเมล</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 focus:shadow-lg focus:shadow-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">ข้อความ</label>
              <textarea
                rows={5}
                placeholder="พิมพ์ข้อความที่ต้องการติดต่อ..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 focus:shadow-lg focus:shadow-blue-500/10 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              ส่งข้อความ ✉️
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}