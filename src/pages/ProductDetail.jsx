import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import manualSpecs from "../data/manualSpecs";

export default function ProductDetail(){

  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = location.pathname.startsWith("/en") ? "en" : "zh";

  const id = productId?.toLowerCase();

  /* 🔥 修正 id */
  let fixedId = id;

  if (!manualSpecs?.[fixedId]) {
    const parts = fixedId?.split("-");
    const num = parseInt(parts?.[1]);

    if (!isNaN(num)) {
      const prev = `${parts[0]}-${num - 1}`;
      const next = `${parts[0]}-${num + 1}`;

      if (manualSpecs[prev]) fixedId = prev;
      else if (manualSpecs[next]) fixedId = next;
    }
  }

  const product = manualSpecs?.[fixedId];

  if(!product){
    return (
      <div className="min-h-screen flex items-center justify-center text-[#999]">
        Product not found
      </div>
    );
  }

  /* =========================
     🔥 修復核心：規格統一
  ========================= */
  const normalizeSpecs = (specs = [])=>{
    return specs.map(item=>{

      const w = item.w ?? "—";
      const h = item.h ?? "—";
      const d = item.d ?? item.depth ?? "—";

      return {
        sku: item.sku || "—",
        w,
        h,
        d
      };
    });
  };

  const specs = normalizeSpecs(product.specs);

  const [activeIndex, setActiveIndex] = useState(0);

  const current = specs[activeIndex] || {};
  const prefix = fixedId.split("-")[0];

  const mainImg = product.main || product.detail;
  const detailImg = product.detail || null;

  /* =========================
     🔥 Lightbox
  ========================= */
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gallery = [mainImg, detailImg].filter(Boolean);

  /* =========================
     🔥 related
  ========================= */
  const related = Object.entries(manualSpecs)
    .filter(([key]) => key !== fixedId && key.startsWith(prefix))
    .slice(0,5);

  return(

    <main className="pt-[120px] pb-32 bg-[#f7f7f7] min-h-screen">

      {/* TOP */}
      <div className="max-w-[1100px] mx-auto px-6 mb-20">

        <div className="mb-10">
          <button
            onClick={()=>navigate(-1)}
            className="text-[11px] tracking-[0.35em] text-black/40 hover:text-black"
          >
            ← BACK
          </button>
        </div>

        <div className="text-[11px] tracking-[0.35em] text-black/40 flex items-center">
          <span
            onClick={()=>navigate(`/${lang}/products/mirror`)}
            className="hover:text-black cursor-pointer"
          >
            MIRROR
          </span>
          <span className="mx-3">/</span>
          <span className="text-black">{prefix.toUpperCase()}</span>
        </div>

      </div>

      {/* MAIN */}
      <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-20">

        {/* 左圖 */}
        <div>

<div className="
  bg-white 
  mb-6 
  overflow-hidden 
  aspect-auto 
  md:aspect-square
">
<img
  src={mainImg}
  onClick={()=>setLightboxIndex(0)}
  className="
    w-full 
    h-full 
    object-contain 
    md:object-cover
    bg-white      /* 🔥 防黑邊 */
    cursor-zoom-in
  "
/>
</div>

          {detailImg && (
           <div className="w-full md:w-[320px] mt-2">
              <img
                src={detailImg}
                onClick={()=>setLightboxIndex(1)}
                className="w-full object-cover cursor-zoom-in"
              />
            </div>
          )}

        </div>

        {/* 右資訊 */}
        <div>

          <p className="text-[10px] tracking-[0.4em] text-[#999] mb-3">
            MODEL
          </p>

          <h1 className="text-[34px] tracking-[0.14em] font-light mb-14 text-black">
            {current.sku || fixedId.toUpperCase()}
          </h1>

          <p className="text-[10px] tracking-[0.4em] text-[#999] mb-6 ">
            SIZE
          </p>

          <div className="mb-10 text-black">
            {specs.map((item,i)=>(
              <div
                key={i}
                onClick={()=>setActiveIndex(i)}
                className="flex justify-between py-3 border-b cursor-pointer hover:bg-black/5 transition"
              >
                <span>{item.sku}</span>

                {/* 🔥 不再爆版 */}
                <span className="text-[12px] text-[#666]">
                  {[item.w, item.h, item.d].join(" × ")} mm
                </span>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* RELATED */}
      <div className="max-w-[1100px] mx-auto px-6 mt-32">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {related.map(([key,item])=>(
            <div
              key={key}
              onClick={()=>navigate(`/${lang}/products/mirror/${prefix}/${key}`)}
              className="cursor-pointer group"
            >
              <img
                src={item.main}
                className="w-full transition group-hover:scale-105"
              />

              <p className="text-center text-[11px] mt-2 text-[#555]">
                {key.toUpperCase()}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={()=>setLightboxIndex(null)}
        >

          <button
            onClick={(e)=>{
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
            }}
            className="absolute left-6 text-white text-3xl"
          >
            ‹
          </button>

          <img
            src={gallery[lightboxIndex]}
            className="w-[70vw] h-[70vh] object-contain"
          />

          <button
            onClick={(e)=>{
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % gallery.length);
            }}
            className="absolute right-6 text-white text-3xl"
          >
            ›
          </button>

        </div>
      )}

    </main>
  );
}
