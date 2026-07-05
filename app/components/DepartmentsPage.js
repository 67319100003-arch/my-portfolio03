const majorCategories = [
  {
    title: "ประเภทวิชาบริหารธุรกิจ",
    icon: "💼",
    borderColor: "border-blue-600",
    bgGradient: "from-blue-50/50",
    courses: [
      { name: "สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล", levels: ["ปวช.", "ปวส."] },
      { name: "สาขาวิชาการบัญชี", levels: ["ปวช.", "ปวส."] },
      { name: "สาขาวิชาการตลาด", levels: ["ปวช.", "ปวส."] },
    ],
  },
  {
    title: "ประเภทวิชาอุตสาหกรรมท่องเที่ยว",
    icon: "✈️",
    borderColor: "border-amber-500",
    bgGradient: "from-amber-50/50",
    courses: [
      { name: "สาขาวิชาการโรงแรม", levels: ["ปวช.", "ปวส."] },
    ],
  },
];

export default function DepartmentsPage() {
  return (
    <main className="max-w-5xl mx-auto my-12 px-4 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-slate-800 md:text-3xl">หลักสูตรและแผนกวิชา</h1>
        <p className="text-gray-400 text-xs mt-1">วิทยาลัยพณิชยการธนบุรี</p>
      </div>

      {/* Grid Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {majorCategories.map((cat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${cat.bgGradient} to-white p-6 rounded-2xl border-t-4 ${cat.borderColor} shadow-sm border border-slate-100 flex flex-col justify-between`}>
            <div>
              <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>{cat.icon}</span> {cat.title}
              </h2>
              
              <ul className="space-y-2">
                {cat.courses.map((course, cIdx) => (
                  <li key={cIdx} className="bg-white/80 p-3 rounded-xl border border-slate-100 flex justify-between items-center shadow-sm hover:shadow-md transition">
                    <span className="font-medium text-slate-700 text-xs md:text-sm">{course.name}</span>
                    <div className="flex gap-1">
                      {course.levels.map((lvl, lIdx) => (
                        <span key={lIdx} className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          lvl === "ปวช." ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}>
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}