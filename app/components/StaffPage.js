// ข้อมูลจำลองบุคลากร
const executives = [
  { name: 'ดร.สมชาย ใจดี', role: 'ผู้อำนวยการวิทยาลัย', emoji: '👨‍💼' }
];

const teachers = [
  { name: 'อ.มานพ แซ่ตั้ง', role: 'หัวหน้าแผนกวิชา', emoji: '🧑‍🏫' },
  { name: 'อ.วิภา นามดี', role: 'อาจารย์ประจำวิชา', emoji: '👩‍🏫' },
  { name: 'อ.สมศักดิ์ รักเรียน', role: 'อาจารย์ประจำวิชา', emoji: '👨‍🏫' },
];

export default function StaffPage() {
  return (
    <main className="max-w-4xl mx-auto my-12 px-4 space-y-12">
      
      {/* 1. คณะผู้บริหาร (เด่นตรงกลาง) */}
      <section className="text-center space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-amber-500 tracking-wide">คณะผู้บริหาร</h2>
          <p className="text-gray-400 text-xs">บริหารงานด้วยความมุ่งมั่นและโปร่งใส</p>
        </div>
        
        {executives.map((exec, idx) => (
          <div key={idx} className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-2xl border max-w-sm mx-auto shadow-sm hover:shadow-md transition">
            <div className="w-24 h-24 bg-blue-50 text-4xl rounded-full mx-auto mb-4 flex items-center justify-center border border-blue-100 shadow-inner">
              {exec.emoji}
            </div>
            <h3 className="font-bold text-slate-800 text-base">{exec.name}</h3>
            <p className="text-xs font-semibold text-amber-600 mt-1">{exec.role}</p>
          </div>
        ))}
      </section>

      {/* 2. คณะครู / แผนกวิชา */}
      <section className="space-y-6">
        <div className="border-l-4 border-blue-900 pl-3">
          <h3 className="text-lg font-extrabold text-blue-900 flex items-center gap-2">
  <span className="text-sky-500">💻</span> แผนกวิชาคอมพิวเตอร์ธุรกิจ
</h3>
          <p className="text-gray-400 text-xs mt-0.5">คณาจารย์ผู้เชี่ยวชาญด้านเทคโนโลยีและธุรกิจดิจิทัล</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {teachers.map((teacher, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border text-center shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-slate-50 text-2xl rounded-full mx-auto mb-3 flex items-center justify-center border">
                {teacher.emoji}
              </div>
              <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{teacher.name}</h4>
              <p className="text-gray-500 text-[11px] mt-1">{teacher.role}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}