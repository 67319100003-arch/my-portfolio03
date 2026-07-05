export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto my-12 px-4 space-y-8">
      {/* ส่วนหัวข้อหน้า */}
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight md:text-4xl">
          เกี่ยวกับวิทยาลัย
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          ข้อมูลทิศทางและความมุ่งมั่นของวิทยาลัยพณิชยการธนบุรี
        </p>
      </div>

      {/* 💡 ปรัชญา (เด่นสุดแบบ Full Width) */}
      <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-sm border border-amber-200/60 text-center relative overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 text-2xl mb-3">
          💡
        </div>
        <h2 className="text-xl font-bold text-slate-800">ปรัชญา</h2>
        <p className="text-lg italic font-medium text-amber-900/90 mt-3 tracking-wide">
          "ทักษะเยี่ยม เปี่ยมคุณธรรม เลิศล้ำปัญญา พัฒนาสังคม"
        </p>
      </div>

      {/* 🎯 วิสัยทัศน์ */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 text-2xl mb-3">
          🎯
        </div>
        <h2 className="text-xl font-bold text-slate-800">วิสัยทัศน์</h2>
        <p className="text-gray-600 mt-3 leading-relaxed">
          "เป็นสถาบันการอาชีวศึกษาชั้นนำในการผลิตและพัฒนากำลังคนสมรรถนะสูง รองรับความต้องการของอุตสาหกรรมและสังคมแห่งอนาคต"
        </p>
      </div>

      {/* 🌟 อัตลักษณ์ & เอกลักษณ์ (Grid 2 คอลัมน์) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* อัตลักษณ์ */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600" />
          <div className="text-3xl mb-2">🌟</div>
          <h3 className="text-lg font-bold text-slate-800">อัตลักษณ์</h3>
          <p className="text-gray-600 mt-2 font-medium">
            "บริการเด่น เน้นฝีมือ เลื่องลือวินัย"
          </p>
        </div>

        {/* เอกลักษณ์ (เพิ่มเข้ามาให้เข้าคู่กันตามมาตรฐานโรงเรียน/วิทยาลัย) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-600" />
          <div className="text-3xl mb-2">🏫</div>
          <h3 className="text-lg font-bold text-slate-800">เอกลักษณ์</h3>
          <p className="text-gray-600 mt-2 font-medium">
            "สถาบันแห่งการเรียนรู้เทคโนโลยีและธุรกิจดิจิทัล"
          </p>
        </div>
      </div>
    </main>
  );
}