const majorCategories = [
  {
    title: 'ประเภทวิชาบริหารธุรกิจ',
    icon: '💼',
    color: 'blue',
    description: 'สร้างนักธุรกิจและผู้เชี่ยวชาญด้านดิจิทัลแห่งอนาคต',
    courses: [
      { name: 'เทคโนโลยีธุรกิจดิจิทัล', levels: ['ปวช.', 'ปวส.'], icon: '🖥️' },
      { name: 'การบัญชี', levels: ['ปวช.', 'ปวส.'], icon: '📊' },
      { name: 'การตลาด', levels: ['ปวช.', 'ปวส.'], icon: '📣' },
    ],
  },
  {
    title: 'ประเภทวิชาอุตสาหกรรมท่องเที่ยว',
    icon: '✈️',
    color: 'amber',
    description: 'เปิดประตูสู่อุตสาหกรรมบริการระดับสากล',
    courses: [
      { name: 'การโรงแรม', levels: ['ปวช.', 'ปวส.'], icon: '🏨' },
    ],
  },
];

const colorMap = {
  blue:  {
    border: 'border-blue-500/30',
    accent: 'from-blue-500/20 to-slate-900/0',
    badge: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    iconBg: 'bg-blue-500/15 text-blue-400',
    badgePvch: 'bg-red-500/10 border-red-500/20 text-red-400',
    badgePvs:  'bg-blue-500/10 border-blue-500/20 text-blue-400',
  },
  amber: {
    border: 'border-amber-500/30',
    accent: 'from-amber-500/20 to-slate-900/0',
    badge: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    iconBg: 'bg-amber-500/15 text-amber-400',
    badgePvch: 'bg-red-500/10 border-red-500/20 text-red-400',
    badgePvs:  'bg-amber-500/10 border-amber-500/20 text-amber-400',
  },
};

export default function DepartmentsPage() {
  return (
    <section id="departments" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs font-black text-blue-400 tracking-widest uppercase mb-3">PROGRAMS</p>
        <h2 className="text-4xl font-black text-white mb-3">หลักสูตรและแผนกวิชา</h2>
        <div className="section-divider mx-auto" />
        <p className="text-slate-400 text-sm mt-5">วิทยาลัยพณิชยการธนบุรี เปิดสอนสาขาวิชาที่ตอบโจทย์ตลาดแรงงาน</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {majorCategories.map((cat) => {
          const c = colorMap[cat.color];
          return (
            <div
              key={cat.title}
              className={`relative rounded-2xl border ${c.border} bg-gradient-to-br ${c.accent} p-7 overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-black text-white text-base leading-tight">{cat.title}</h3>
                  <p className="text-slate-400 text-xs mt-1">{cat.description}</p>
                </div>
              </div>

              {/* Courses */}
              <div className="space-y-3">
                {cat.courses.map((course) => (
                  <div
                    key={course.name}
                    className="flex items-center justify-between bg-white/4 border border-white/8 rounded-xl px-4 py-3 hover:bg-white/7 hover:border-white/14 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{course.icon}</span>
                      <span className="text-sm font-semibold text-slate-200">สาขาวิชา{course.name}</span>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      {course.levels.map((lvl) => (
                        <span
                          key={lvl}
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${lvl === 'ปวช.' ? c.badgePvch : c.badgePvs}`}
                        >
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total badge */}
              <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-between">
                <span className="text-xs text-slate-500">{cat.courses.length} สาขาวิชา</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${c.badge}`}>
                  {cat.courses.reduce((a, c) => a + c.levels.length, 0)} หลักสูตร
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-10 p-7 rounded-2xl bg-gradient-to-r from-blue-600/10 to-amber-500/10 border border-white/8 text-center">
        <p className="text-white font-bold mb-1">สนใจสมัครเรียน?</p>
        <p className="text-slate-400 text-sm mb-4">เปิดรับสมัครนักศึกษาใหม่ ประจำปีการศึกษา 2569</p>
        <a href="#contact" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
          ติดต่อสอบถาม →
        </a>
      </div>
    </section>
  );
}