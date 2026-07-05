const cards = [
  {
    icon: '💡',
    title: 'ปรัชญา',
    quote: '"ทักษะเยี่ยม เปี่ยมคุณธรรม เลิศล้ำปัญญา พัฒนาสังคม"',
    gradient: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/40',
    accent: 'bg-amber-500',
    iconBg: 'bg-amber-500/15 text-amber-400',
  },
  {
    icon: '🎯',
    title: 'วิสัยทัศน์',
    quote: '"เป็นสถาบันการอาชีวศึกษาชั้นนำในการผลิตและพัฒนากำลังคนสมรรถนะสูง รองรับความต้องการของอุตสาหกรรมและสังคมแห่งอนาคต"',
    gradient: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/40',
    accent: 'bg-blue-500',
    iconBg: 'bg-blue-500/15 text-blue-400',
  },
  {
    icon: '🌟',
    title: 'อัตลักษณ์',
    quote: '"บริการเด่น เน้นฝีมือ เลื่องลือวินัย"',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
    border: 'border-indigo-500/40',
    accent: 'bg-indigo-500',
    iconBg: 'bg-indigo-500/15 text-indigo-400',
  },
  {
    icon: '🏫',
    title: 'เอกลักษณ์',
    quote: '"สถาบันแห่งการเรียนรู้เทคโนโลยีและธุรกิจดิจิทัล"',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/40',
    accent: 'bg-emerald-500',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
  },
];

export default function AboutPage() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs font-black text-blue-400 tracking-widest uppercase mb-3">OUR IDENTITY</p>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">เกี่ยวกับวิทยาลัย</h2>
        <div className="section-divider mx-auto" />
        <p className="text-slate-400 text-sm mt-5 max-w-lg mx-auto">
          ข้อมูลทิศทางและความมุ่งมั่นของวิทยาลัยพณิชยการธนบุรี ที่ยืนหยัดผลิตบุคลากรคุณภาพสู่สังคมมากว่า 60 ปี
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={`relative rounded-2xl bg-gradient-to-br ${card.gradient} border ${card.border} p-7 overflow-hidden group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-black/30`}
          >
            {/* Accent top bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${card.accent} opacity-80`} />
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center text-2xl mb-5`}>
              {card.icon}
            </div>
            <h3 className="text-lg font-black text-white mb-3">{card.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic font-medium">{card.quote}</p>
          </div>
        ))}
      </div>

      {/* History blurb */}
      <div className="mt-10 p-7 rounded-2xl bg-white/3 border border-white/8 text-center">
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
          วิทยาลัยพณิชยการธนบุรีตั้งอยู่ใจกลางกรุงเทพมหานคร เขตบางกอกใหญ่ เปิดสอนหลักสูตรอาชีวศึกษาระดับ ปวช. และ ปวส. ในสาขาวิชาบริหารธุรกิจ การบัญชี เทคโนโลยีดิจิทัล และอุตสาหกรรมท่องเที่ยว มุ่งเน้นพัฒนาบุคลากรวิชาชีพที่มีสมรรถนะตรงความต้องการของตลาดแรงงาน
        </p>
      </div>
    </section>
  );
}