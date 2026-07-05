import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-8 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ข้อมูลติดต่อ */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">วิทยาลัยพณิชยการธนบุรี</h3>
          <p className="text-sm">เลขที่ 50 ซอยพาณิชยการธนบุรี แขวงวัดท่าพระ เขตบางกอกใหญ่ กรุงเทพฯ 10600</p>
          <p className="text-sm mt-2">โทร: 02-XXX-XXXX</p>
        </div>

        {/* ลิงก์สำคัญ */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">ลิงก์ภายใน</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">สมรรคเรียนออนไลน์</Link></li>
            <li><Link href="#" className="hover:underline">ปฏิทินการศึกษา</Link></li>
            <li><Link href="#" className="hover:underline">ดาวน์โหลดเอกสาร</Link></li>
          </ul>
        </div>

        {/* โซเชียลมีเดีย */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">Social Media</h3>
          <div className="space-y-2 text-sm">
            <p>Facebook: @ThonburiCommercialCollege</p>
            <p>Line Official: @tcc_line</p>
          </div>
        </div>
      </div>
      <div className="text-center text-xs mt-8 pt-4 border-t border-gray-700">
        © 2026 Thonburi Commercial College. All Rights Reserved.
      </div>
    </footer>
  );
}