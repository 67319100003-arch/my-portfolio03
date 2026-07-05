import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto my-12 px-4 grid md:grid-cols-2 gap-8 items-start">
      
      {/* ฝั่งซ้าย: ข้อมูลติดต่อ + แผนที่ / รูปภาพ */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">ติดต่อเรา</h2>
          <p className="text-xs text-gray-500 mt-1">วิทยาลัยพณิชยการธนบุรี</p>
        </div>
        
        {/* ข้อมูลการติดต่อ */}
        <div className="space-y-3 text-sm text-gray-600">
          <p className="flex items-start gap-2">
            <span className="text-base">📍</span> 
            <span>50 ซอยพาณิชยการธนบุรี แขวงวัดท่าพระ เขตบางกอกใหญ่ กรุงเทพฯ 10600</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-base">📞</span> 
            <span>02-412-3456</span>
          </p>
        </div>

        {/* ส่วนแสดงรูปภาพหรือแผนที่ */}
        <div className="w-full h-52 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-100">
          {/* สามารถเปลี่ยน src เป็นลิงก์ Google Maps iframe หรือรูปภาพตึกวิทยาลัยได้เลย */}
          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-sm text-gray-400">
            [ รูปภาพวิทยาลัย หรือ แผนที่ Google Maps ]
          </div>
        </div>
      </div>

      {/* ฝั่งขวา: ฟอร์มติดต่อ */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-5">ส่งข้อความถึงเรา</h2>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">ชื่อ-นามสกุล</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition" 
              placeholder="กรอกชื่อของคุณ" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">ข้อความ</label>
            <textarea 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition" 
              rows="4" 
              placeholder="พิมพ์ข้อความที่ต้องการติดต่อ..."
            ></textarea>
          </div>
          
          <button className="w-full bg-blue-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-800 shadow-sm shadow-blue-900/10 active:scale-[0.98] transition">
            ส่งข้อมูล
          </button>
        </form>
      </div>

    </main>
  );
}