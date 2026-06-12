import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useLang from "../hooks/useLang";
import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet-async";

export default function LightDetail(){

  const { slug } = useParams();
  const lang = useLang();
const [product,setProduct] = useState(null);

useEffect(() => {

  async function loadProduct(){


    
    const { data,error } = await supabase
      .from("products")
      .select("*")
      .eq("slug",slug)
      .single();



    if(data){
      setProduct(data);
    }

  }

  loadProduct();

},[slug]);

  /* ===== 🔥 Lightbox ===== */
  const [viewerOpen, setViewerOpen] = useState(false);
 const [currentIndex, setCurrentIndex] = useState(0);
const [imgLoading, setImgLoading] = useState(true);

if(product === null){
  return(
    <div className="pt-40 text-center">
      Loading...
    </div>
  );
}


  const getText = (val) => {
    if (!val) return "";
    if (typeof val === "object") return val[lang] || val.zh || val.en || "";
    return val;
  };

const tags =
  Array.isArray(product.tags)
    ? product.tags
    : typeof product.tags === "string"
    ? JSON.parse(product.tags)
    : [];

    console.log(product.tags);
console.log(typeof product.tags);

console.log("FEATURE 0");
console.log(product.features?.[0]);

  /* ===== 🔥 全部圖片 ===== */
const allImages = [
  product.cover,
  product.cover2,
  ...(product.gallery || []),
  ...(product.features?.map(f => f.img) || [])
].filter(Boolean);

const seoTitle =
product.seo_title ||
`${lang === "en"
  ? product.title_en
  : product.title_zh} | ATHENE LIGHT`;

const seoDesc =
product.seo_description ||
(lang === "en"
  ? product.desc_en
  : product.desc_zh);
  "Architectural lighting and modern pendant light collection.";

const currentUrl =
  `https://athenelight.com/${lang}/lights/${slug}`;

const ogImage =
  `https://athenelight.com${product.cover}`;




  return(

    <>
<Helmet>

  <title>{seoTitle}</title>

  <meta
    name="description"
    content={seoDesc}
  />

  <link
    rel="canonical"
    href={currentUrl}
  />

  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDesc} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:type" content="product" />
  <meta property="og:url" content={currentUrl} />

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",

      name: lang === "en"
  ? product.title_en
  : product.title_zh,

      image: [ogImage],

      description: seoDesc,

      brand: {
        "@type": "Brand",
        name: "ATHENE LIGHT"
      },

      category: "Pendant Light",

offers: {
  "@type": "Offer",
  url: product.line_link,
  availability: "https://schema.org/InStock"
}
    })}
  </script>

</Helmet>
    <main className="bg-white text-[#222]">

{/* ================= HERO ================= */}
<section className="pt-[160px] pb-32 bg-[#f6f6f6]">

<div className="
  max-w-[1280px]
  mx-auto
  px-6

  grid
  md:grid-cols-[420px_1fr]

  gap-24

  items-center
">

    {/* 左 */}
    <div className="max-w-[420px]">

      <p className="text-[10px] tracking-[0.45em] text-[#C8A46A] mb-10">
        {lang === "en" ? "LIGHTING COLLECTION" : "燈具系列"}
      </p>

      <h1 className="
        text-[32px]
        md:text-[42px]
        tracking-[0.14em]
        text-[#111]
        leading-[1.5]
      ">
        {lang === "en"
  ? product.title_en
  : product.title_zh}
      </h1>

      <p className="mt-6 text-[12px] tracking-[0.3em] text-black/40">
        {lang === "en"
  ? product.subtitle_en
  : product.subtitle_zh}
      </p>

      <div className="text-[10px] mt-6 mb-10">—</div>

<p className="
  text-[14px]
  text-black/60
  leading-[2]
  whitespace-pre-line
">
  {lang === "en"
    ? product.desc_en
    : product.desc_zh}
</p>


{tags.length > 0 && (
  <>
<p
  className="
    text-[10px]
    tracking-[0.32em]
    text-black/40
    mt-10
    mb-4
  "
>
  {lang === "en"
    ? "LIGHT OPTIONS"
    : "燈光選項"}
</p>

    <div className="flex flex-wrap gap-3 mb-6">

{tags.map((tag,i)=>(

  <div
    key={i}
    className="
      px-4
      h-[34px]
      flex
      items-center
      justify-center
      text-[11px]
      border
      border-[#d8d8d8]
      rounded-full
      whitespace-nowrap
      hover:border-[#C8A46A]
      transition-all
      duration-500
    "
  >
    {typeof tag === "object"
      ? (
          lang === "en"
            ? tag.en || tag.zh || ""
            : tag.zh || tag.en || ""
        )
      : tag}
  </div>

))}
    </div>
  </>
)}

{product.line_link && (
  <a
    href={product.line_link}
    target="_blank"
    rel="noopener noreferrer"
className="
  inline-flex
  items-center

  mt-8

  text-[11px]
  tracking-[0.28em]
  uppercase

  text-[#9d8358]/90

  hover:text-black
  hover:tracking-[0.34em]

  transition-all
  duration-500
"
  >
    GO LINE SHOP ↗
  </a>
)}



</div>

    {/* 右 */}
    {product.cover2 ? (

      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 w-full">

        <div className="w-full md:w-[360px]">
          <img
            src={product.cover}
            onClick={() => {
              setViewerOpen(true);
              setCurrentIndex(0);
              setImgLoading(true);
            }}
          className="
  cursor-zoom-in
  w-full
  h-[240px]
  md:h-[640px]
  object-cover
  rounded-[8px]
"
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
            className="
              cursor-zoom-in
              w-full
              h-[240px]
             md:h-[640px]
              object-cover
              rounded-[8px]
            "
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
          className="
            cursor-zoom-in
            w-full
           h-[320px]
md:h-[720px]
            object-cover
            rounded-[8px]
          "
        />

        <div className="
          absolute inset-0
          pointer-events-none
          shadow-[0_40px_80px_rgba(0,0,0,0.12)]
        " />

      </div>

    )}

  </div>
</section>
      {/* ================= DESC ================= */}
{(product.desc_long_zh || product.desc_long_en) && (
  <section className="py-24 px-6 text-center max-w-3xl mx-auto">

    <p className="text-sm text-black/60 leading-[2] whitespace-pre-line">

      {lang === "en"
        ? product.desc_long_en
        : product.desc_long_zh}

    </p>

  </section>
)}

{/* ================= 情境圖 ================= */}
{product.gallery?.length > 0 && (
 <section className="
  grid
  md:grid-cols-3
  gap-8
  px-6
  max-w-[1400px]
  mx-auto
  mb-32
">

    {product.gallery.slice(0,3).map((img,i)=>(
      <img
        key={i}
        src={img}
        onClick={()=>{
          setViewerOpen(true);
          setCurrentIndex(i + (product.cover2 ? 2 : 1));
          setImgLoading(true);
        }}
       className="
cursor-zoom-in
w-full
h-[520px]
object-cover
rounded-[8px]
"
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

   <div className="max-w-6xl mx-auto border-t border-b">

      {/* 標題列 */}
<div className="
  hidden md:flex
  justify-between
  py-4
  text-[12px]
  tracking-[0.15em]
  text-black/40
">

  <div className="flex-1">
    {lang==="en"?"SIZE":"尺寸"}
  </div>

  <div className="flex-1">
    {lang==="en"?"POWER":"瓦數"}
  </div>

  {product.specs.some(s => s.voltage) && (
    <div className="flex-1">
      {lang==="en"?"VOLTAGE":"電壓"}
    </div>
  )}

  <div className="flex-1">
    {lang==="en"?"SPACE":"適用空間"}
  </div>

</div>

{/* 內容 */}
{product.specs.map((s,i)=>(

  <div
    key={i}
className="
  flex flex-wrap
  justify-between
  gap-y-6
  py-8
  border-t
  text-sm
"
  >

{/* SIZE */}
<div className="w-1/2 md:flex-1">
  <div className="text-[11px] text-black/35 mb-2 md:hidden">
    {lang==="en"?"SIZE":"尺寸"}
  </div>

  <div className="font-medium tracking-[0.05em]">
    {getText(s.size)}
  </div>

{/* 材質 */}
{(s.materialZh || s.material?.zh) && (
  <div className="text-[12px] text-black/45 mt-2">
    {lang === "en"
      ? (s.materialEn || s.material?.en)
      : (s.materialZh || s.material?.zh)}
  </div>
)}

{/* 風格 */}
{(s.styleZh || s.style?.zh) && (
  <div className="text-[12px] text-black/45 mt-2">
    {lang === "en"
      ? (s.styleEn || s.style?.en)
      : (s.styleZh || s.style?.zh)}
  </div>
)}
</div>

          {/* POWER */}
          <div className="w-1/2 md:flex-1">
            <div className="text-[11px] text-black/35 mb-2 md:hidden">
              {lang==="en"?"POWER":"瓦數"}
            </div>

            <div className="font-medium">
              {s.power}
            </div>

            {s.cri && (
              <div className="text-[12px] text-black/45 mt-2">
                {s.cri}
              </div>
            )}
          </div>

{/* VOLTAGE */}
{s.voltage && (
  <div className="w-1/2 md:flex-1">

    <div className="text-[11px] text-black/35 mb-2 md:hidden">
      {lang==="en"?"VOLTAGE":"電壓"}
    </div>

    <div className="font-medium">
      {s.voltage}
    </div>

    {s.output && (
      <div className="text-[12px] text-black/45 mt-2">
        OUT {s.output}
      </div>
    )}

{/* 光色 */}
{(s.lightColorZh || s.lightColor?.zh) && (
  <div className="text-[12px] text-black/45 mt-2">
    {lang === "en"
      ? (s.lightColorEn || s.lightColor?.en)
      : (s.lightColorZh || s.lightColor?.zh)}
  </div>
)}

  </div>
)}
{/* SPACE */}
<div className="w-1/2 md:flex-1">
  <div className="text-[11px] text-black/35 mb-2 md:hidden">
    {lang==="en"?"SPACE":"適用空間"}
  </div>

  <div className="font-medium">
    {getText(s.space)}
  </div>

{/* 安裝方式 */}
{(s.installZh || s.install?.zh) && (
  <div className="text-[12px] text-black/45 mt-2">
    {lang === "en"
      ? (s.installEn || s.install?.en)
      : (s.installZh || s.install?.zh)}
  </div>
)}
</div>

        </div>
      ))}

    </div>
  </section>
)}

{/* ================= 細節說明圖 ================= */}
{product.features?.length > 0 && (
  <section className="space-y-24 mb-40">

   {product.features.map((feature,i)=>(

      <div
        key={i}
className="
  grid
  md:grid-cols-2
  items-center
  gap-20
  px-6
  max-w-7xl
  mx-auto
  
"
      >

 <img
  src={feature.img}
          onClick={()=>{
            setViewerOpen(true);
            setCurrentIndex(
              i + 3 + (product.cover2 ? 2 : 1)
            );
            setImgLoading(true);
          }}
          className="
            cursor-zoom-in
            w-full
            h-[520px]
            object-cover
            rounded-[8px]
          "
        />

        <div>

<h3
  className="
    text-[28px]
    mb-8
    tracking-[0.12em]
  "
>
  {lang === "en"
    ? (
        feature.titleEn ||
        feature.title?.en
      )
    : (
        feature.titleZh ||
        feature.title?.zh
      )}
</h3>

<p
  className="
    text-[15px]
    text-black/60
    leading-[2.1]
  "
>
  {lang === "en"
    ? (
        feature.descEn ||
        feature.desc?.en
      )
    : (
        feature.descZh ||
        feature.desc?.zh
      )}
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
</>
);
}
