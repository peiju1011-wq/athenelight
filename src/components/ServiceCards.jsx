export default function ServiceCards() {

  const services = [
    "照明設計規劃",
    "施工安裝維修",
    "客製化照明設備",
    "節能與智慧照明"
  ];

  return (
    <section className="py-24 lg:py-40 bg-black text-white">

      <div className="text-center mb-24">
        <h2 className="text-4xl">服務項目</h2>
      </div>

      <div className="grid lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-6">

        {services.map((s, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] p-10 text-center border border-white/10"
          >
            <h3 className="text-xl">{s}</h3>
          </div>
        ))}

      </div>

    </section>
  );
}