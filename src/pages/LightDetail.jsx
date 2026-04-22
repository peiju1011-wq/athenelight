import { useParams } from "react-router-dom";
import { useState } from "react";
import useLang from "../hooks/useLang";
import lightsData from "../data/lightsData";

export default function LightDetail(){

  const { slug } = useParams();
  const lang = useLang();

  const product = lightsData.find(p => p.slug === slug);

  /* ===== 🔥 Lightbox ===== */
  const [viewerOpen, setViewerOpen] = useState(false);
 const [currentIndex, setCurrentIndex] = useState(0);
const [imgLoading, setImgLoading] = useState(true);

  if(!product){
    return (
      <div className="pt-40 text-center text-gray-400">
        Product Not Found
      </div>
    );
  }

  const getText = (val) => {
    if (!val) return "";
    if (typeof val === "object") return val[lang] || val.zh || val.en || "";
    return val;
  };

  /* ===== 🔥 全部圖片 ===== */
  const allImages = [
    product.cover,
    product.cover2,
    ...(product.gallery || [])
  ].filter(Boolean);

  return(
    <main className="bg-white text-[#222]">

      {/* ================= HERO ================= */}
      <section className="pt-[160px] pb-32 bg-[#f6f6f6]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

          {/* 左 */}
          <div className="max-w-[420px]">
            <p className="text-[10px] tracking-[0.45em] text-[#C8A46A] mb-10">
              {lang === "en" ? "LIGHTING COLLECTION" : "燈具系列"}
            </p>

            <h1 className="text-[32px] md:text-[42px] tracking-[0.14em] text-[#111] leading-[1.5]">
              {getText(product.name)}
            </h1>

            <p className="mt-6 text-[12px] tracking-[0.3em] text-black/40">
              {getText(product.subtitle)}
            </p>

            <div className="text-[10px] mt-6 mb-10">—</div>

            <p className="text-[14px] text-black/60 leading-[2] whitespace-pre-line">
              {getText(product.desc)}
            </p>

            {product.variants && (
              <div className="mt-10">
                <p className="text-[11px] tracking-[0.3em] text-[#999] mb-4">
                  {lang === "en" ? "OPTIONS" : "燈光選項"}
                </p>

                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 text-[12px] border border-[#ddd] rounded-full hover:border-[#C8A46A] transition"
                    >
                      {getText(v.label)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

         
         {/* 右 */}
{product.cover2 ? (

  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 w-full">

    <div className="w-full md:w-[320px]">
      <img
        src={product.cover}
        onClick={() => {
          setViewerOpen(true);
          setCurrentIndex(0);
          setImgLoading(true);
        }}
        className="cursor-zoom-in w-full h-[240px] md:h-[520px] object-cover rounded-[8px]"
      />
    </div>

    <div className="w-full md:w-[320px] md:mt-[60px]">
      <img
        src={product.cover2}
        onClick={() => {
          setViewerOpen(true);
          setCurrentIndex(1);
          setImgLoading(true);
        }}
        className="cursor-zoom-in w-full h-[240px] md:h-[520px] object-cover rounded-[8px]"
      />
    </div>

  </div>

) : (

  <div className="relative w-full">
    <img
      src={product.cover}
      onClick={() => {
        setViewerOpen(true);
        setCurrentIndex(0);
        setImgLoading(true);
      }}
      className="cursor-zoom-in w-full h-[320px] md:h-[600px] object-cover rounded-[8px]"
    />
    <div className="absolute inset-0 pointer-events-none shadow-[0_40px_80px_rgba(0,0,0,0.12)]" />
  </div>

)}

        </div>
      </section>

      {/* ================= DESC ================= */}
      {product.descLong && (
        <section className="py-24 px-6 text-center max-w-3xl mx-auto">
          <p className="text-sm text-black/60 leading-7 whitespace-pre-line">
            {getText(product.descLong)}
          </p>
        </section>
      )}

      {/* ================= GALLERY ================= */}
      {product.gallery?.length > 0 && (
        <section className="grid md:grid-cols-3 gap-6 px-6 mb-32">
          {product.gallery.map((img,i)=>(
            <img
              key={i}
              src={img}
              onClick={()=>{
  setViewerOpen(true);
  setCurrentIndex(i + (product.cover2 ? 2 : 1));
  setImgLoading(true);
              }}
              className="cursor-zoom-in w-full h-[420px] object-cover"
            />
          ))}
        </section>
      )}

      {/* ================= SPECS ================= */}
      {product.specs?.length > 0 && (
        <section className="px-6 mb-32">
          <h3 className="text-center tracking-[0.3em] text-sm mb-12">
            {lang === "en" ? "SPECIFICATION" : "產品規格"}
          </h3>

          <div className="max-w-4xl mx-auto border-t border-b">

            <div className="grid grid-cols-3 py-4 text-sm text-gray-400">
              <div>{lang==="en"?"SIZE":"尺寸"}</div>
              <div>{lang==="en"?"POWER":"瓦數"}</div>
              <div>{lang==="en"?"SPACE":"適用空間"}</div>
            </div>

            {product.specs.map((s,i)=>(
              <div key={i} className="grid grid-cols-3 py-6 text-sm border-t">
                <div>{getText(s.size)}</div>
                <div>{s.power}</div>
                <div>{getText(s.space)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= FEATURES ================= */}
      {product.features?.length > 0 && (
        <section className="space-y-32 mb-40">
          {product.features.map((f,i)=>(
            <div key={i} className="grid md:grid-cols-2 items-center gap-12 px-6 max-w-6xl mx-auto">

              <img src={f.img} className="w-full h-[420px] object-cover"/>

              <div>
                <h3 className="text-xl mb-6 tracking-[0.15em]">
                  {getText(f.title)}
                </h3>
                <p className="text-black/60 leading-7">
                  {getText(f.desc)}
                </p>
              </div>

            </div>
          ))}
        </section>
      )}

       {/* ================= LIGHTBOX ================= */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center">

          {/* 關閉 */}
          <button
            onClick={() => setViewerOpen(false)}
            className="absolute top-6 right-8 text-white text-4xl leading-none cursor-pointer z-[10002]"
          >
            ×
          </button>

          {/* 左箭頭 */}
          {allImages.length > 1 && (
            <button
              onClick={() => {
                setImgLoading(true);
                setCurrentIndex(prev =>
                  prev === 0 ? allImages.length - 1 : prev - 1
                );
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-5xl leading-none cursor-pointer z-[10002]"
            >
              ‹
            </button>
          )}

          {/* 主圖區 */}
          <div className="relative w-full h-full flex items-center justify-center px-[80px] pb-[110px] overflow-hidden">

            {imgLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-[10001] pointer-events-none">
                <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            <img
              src={allImages[currentIndex]}
              alt=""
              onLoad={() => setImgLoading(false)}
              onError={() => setImgLoading(false)}
              className={`
                block max-w-full max-h-[82vh] object-contain rounded-[10px]
                transition-opacity duration-300
                ${imgLoading ? "opacity-0" : "opacity-100"}
              `}
            />
          </div>

          {/* 右箭頭 */}
          {allImages.length > 1 && (
            <button
              onClick={() => {
                setImgLoading(true);
                setCurrentIndex(prev =>
                  prev === allImages.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-5xl leading-none cursor-pointer z-[10002]"
            >
              ›
            </button>
          )}

          {/* 縮圖列 */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10002] flex gap-3 px-4 py-3 bg-black/45 backdrop-blur-md rounded-full overflow-x-auto max-w-[90vw]">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setImgLoading(true);
                    setCurrentIndex(i);
                  }}
                  className={`
                    shrink-0 w-14 h-14 rounded overflow-hidden border transition
                    ${i === currentIndex ? "border-white scale-105" : "border-transparent opacity-70 hover:opacity-100"}
                  `}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover block"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= END ================= */}
      <section className="text-center pb-40">
        <p className="tracking-[0.3em] text-[12px] text-black/40">
          {lang === "en" ? "ENJOY YOUR LIGHTING MOMENT" : "享受光影的每一刻"}
        </p>
      </section>

    </main>
  );
}
