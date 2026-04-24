import { useParams, Link, useLocation } from "react-router-dom";
import useLang from "../hooks/useLang";
import manualSpecs from "../data/manualSpecs";

export default function Series(){

  const location = useLocation();
  const { series } = useParams();
  const lang = useLang();

  /* ===== 系列名稱 ===== */
  const seriesTitle = {
    RF: { zh:"方框鏡", en:"Rectangular Frame" },
    RL: { zh:"圓角鏡", en:"Rounded Mirror" },
    CF: { zh:"圓形鏡", en:"Circle Mirror" },
    CL: { zh:"橢圓鏡", en:"Oval Mirror" },
    IR: { zh:"不規則鏡", en:"Irregular Mirror" },
    FL: { zh:"全身鏡", en:"Full Length Mirror" },
    MC: { zh:"多功能鏡", en:"Smart Mirror" }
  };

  /* =========================
     🔥 核心：只用 manualSpecs（最乾淨）
  ========================= */
  const products = Object.entries(manualSpecs)
    .filter(([key,item]) =>
      item?.series?.toUpperCase() === series?.toUpperCase()
    )
    .sort((a,b)=>{
      const getNum = (id)=>{
        const n = parseInt(id.split("-")[1]);
        return isNaN(n) ? 9999 : n;
      };
      return getNum(a[0]) - getNum(b[0]);
    })
    .map(([key,item]) => ({
      id: key,
      main: item.main,     // ✅ 永遠主圖
      detail: item.detail  // hover用
    }));

  return(

  <main className="bg-white min-h-screen pt-[120px] pb-32">

    <div className="max-w-[1100px] mx-auto px-6">

      {/* BACK */}
      <div className="mb-10">
        <Link
          to={location.state?.from || `/${lang}/products`}
          className="text-[11px] tracking-[0.3em] text-black/40 hover:text-black"
        >
          ← BACK
        </Link>
      </div>

      {/* breadcrumb */}
      <div className="mb-10 text-[11px] tracking-[0.3em] text-black/40">
        <Link to={`/${lang}/products/mirror`} className="hover:text-black">
          MIRROR
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black">{series}</span>
      </div>

      {/* HEADER */}
      <section className="text-center mb-20">
        <p className="text-[#C8A46A] tracking-[0.4em] text-[11px] mb-4">
          {lang==="en" ? "SERIES" : "系列"}
        </p>

        <h1 className="text-[28px] md:text-[34px] tracking-[0.12em] text-[#111]">
          {seriesTitle[series]?.[lang] || series}
        </h1>

        <div className="w-10 h-[1px] bg-[#C8A46A] mx-auto mt-6"/>
      </section>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {products.map(item => (

          <Link
            key={item.id}
            to={`/${lang}/products/mirror/${series}/${item.id}`}
            state={{ from: `/${lang}/products/mirror/${series}` }}
            className="group block"
          >

            {/* 主圖 */}
<div className="relative w-full max-w-[270px] aspect-square mx-auto overflow-hidden">

<img
  src={item.main}
  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]"
/>

              {/* hover 細節（只有 hover 才出現） */}

              
{item.detail && (
  <img
    src={item.detail}
    className="
      absolute inset-0
      w-full h-full
      object-cover
      opacity-0 group-hover:opacity-100
      transition duration-500
    "
  />
)}

            </div>

            {/* 名稱 */}
            <div className="mt-6 text-center">

              <h3 className="text-[14px] tracking-[0.2em] text-[#222]">
                {item.id.toUpperCase()}
              </h3>

              <div className="w-6 h-[1px] mx-auto mt-3 bg-[#C8A46A] group-hover:w-12 transition-all"/>

            </div>

          </Link>

        ))}

      </div>

    </div>

  </main>
  );
}
