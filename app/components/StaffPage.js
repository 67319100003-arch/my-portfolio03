const executives = [
  { name: 'ดร.สมชาย ใจดี', role: 'ผู้อำนวยการวิทยาลัย', dept: 'ฝ่ายบริหาร', initial: 'ส' },
];

const departments = [
  {
    name: 'แผนกวิชาคอมพิวเตอร์ธุรกิจ',
    icon: '💻',
    color: 'blue',
    teachers: [
      { name: 'อ.มานพ แซ่ตั้ง', role: 'หัวหน้าแผนก', initial: 'ม' },
      { name: 'อ.วิภา นามดี', role: 'อาจารย์ประจำ', initial: 'ว' },
      { name: 'อ.สมศักดิ์ รักเรียน', role: 'อาจารย์ประจำ', initial: 'ส' },
    ],
  },
  {
    name: 'แผนกวิชาการบัญชี',
    icon: '📊',
    color: 'amber',
    teachers: [
      { name: 'อ.พรทิพย์ สมใจ', role: 'หัวหน้าแผนก', initial: 'พ' },
      { name: 'อ.กนกวรรณ ดีมาก', role: 'อาจารย์ประจำ', initial: 'ก' },
    ],
  },
];

const colorMap = {
  blue:  { badge: 'text-blue-400 bg-blue-500/10 border-blue-500/20', circle: 'bg-blue-500/15 text-blue-400' },
  amber: { badge: 'text-amber-400 bg-amber-500/10 border-amber-500/20', circle: 'bg-amber-500/15 text-amber-400' },
};

export default function StaffPage() {
  return (
    <section id="staff" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs font-black text-blue-400 tracking-widest uppercase mb-3">OUR TEAM</p>
        <h2 className="text-4xl font-black text-white mb-3">บุคลากรวิทยาลัย</h2>
        <div className="section-divider mx-auto" />
      </div>

      {/* Executives */}
      <div className="mb-14">
        <h3 className="text-xs font-black text-amber-400 tracking-widest uppercase mb-6 text-center">คณะผู้บริหาร</h3>
        <div className="flex justify-center">
          {executives.map((exec, i) => (
            <div key={i} className="glass-card border border-amber-500/20 p-8 text-center max-w-xs w-full group hover:border-amber-500/40">
              {/* Avatar circle */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/30 to-blue-500/20 border-2 border-amber-500/40 mx-auto mb-5 flex items-center justify-center text-3xl font-black text-amber-400 shadow-xl shadow-amber-500/10 group-hover:shadow-amber-500/20 transition-shadow">
                {exec.initial}
              </div>
              <h4 className="font-black text-white text-base">{exec.name}</h4>
              <p className="text-amber-400 text-xs font-bold mt-1">{exec.role}</p>
              <span className="inline-block mt-3 text-[10px] font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                {exec.dept}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Teachers by department */}
      <div className="space-y-10">
        {departments.map((dept) => {
          const c = colorMap[dept.color];
          return (
            <div key={dept.name}>
              {/* Dept header */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${c.circle}`}>{dept.icon}</span>
                <div>
                  <h3 className="font-black text-white text-base">{dept.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">คณาจารย์ผู้เชี่ยวชาญ</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {dept.teachers.map((t, j) => (
                  <div key={j} className="glass-card border border-white/8 p-5 text-center group hover:border-white/15">
                    <div className={`w-14 h-14 rounded-full ${c.circle} border border-white/10 mx-auto mb-3 flex items-center justify-center text-lg font-black`}>
                      {t.initial}
                    </div>
                    <p className="font-bold text-slate-200 text-xs line-clamp-1">{t.name}</p>
                    <p className="text-slate-500 text-[11px] mt-1">{t.role}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}