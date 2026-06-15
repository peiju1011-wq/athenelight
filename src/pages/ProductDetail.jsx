import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import manualSpecs from "../data/manualSpecs";


export default function ProductDetail(){
  
const { productId } = useParams();

  const slug = productId;

  const navigate = useNavigate();
  const location = useLocation();

  const lang =
    location.pathname.startsWith("/en")
      ? "en"
      : "zh";

  const id = slug?.toLowerCase();

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

const product = manualSpecs[fixedId];

if(!product){
  return(
    <div className="min-h-screen flex items-center justify-center">
      Product Not Found
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

const specs = normalizeSpecs(product?.specs || []);

  const [activeIndex, setActiveIndex] = useState(0);

  const current = specs[activeIndex] || {};

const prefix =
  fixedId?.split("-")?.[0] || "";

const mainImg = product?.main || "";
const detailImg = product?.detail || "";

  /* =========================
     🔥 Lightbox
  ========================= */
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gallery = [mainImg, detailImg].filter(Boolean);

  /* =========================
     🔥 related
  ========================= */
const seoTitle =
`${lang === "en"
    ? product?.title?.en
    : product?.title?.zh
} | ATHENE LIGHT`;

const mirrorDesc =
  lang === "en"
    ? product?.desc?.en
    : product?.desc?.zh;




const seoDesc =
  mirrorDesc ||
  "ATHENE LIGHT LED Bathroom Mirror";


const related = Object.values(manualSpecs)
  .filter(item =>
    item.series === product.series &&
    item.id !== product.id
  )
  .slice(0,4);






return(

  <>
<Helmet>

  <title>{seoTitle}</title>

  <meta
    name="description"
    content={seoDesc}
  />

  <meta
    name="robots"
    content="index,follow"
  />

  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDesc} />

  <meta
    property="og:image"
    content={mainImg}
  />

  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="ATHENE LIGHT" />

  <link
    rel="canonical"
    href={`https://athenelight.com/${lang}/products/mirror/${prefix}/${fixedId}`}
  />
<script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "Product",

  "name": "${seoTitle}",

"image": [
  "${mainImg}"
],

  "description": "${seoDesc}",

  "brand": {
    "@type": "Brand",
    "name": "ATHENE LIGHT"
  },

  "category": "LED Bathroom Mirror",

  "sku": "${current.sku || fixedId}"
}
`}
</script>

</Helmet>
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

  {/* 🔥 手機：2張並排 */}
  <div className="grid grid-cols-2 gap-3 md:hidden mb-6">

    <img
      src={mainImg}
      alt={`${current.sku} LED Bathroom Mirror`}
      onClick={()=>setLightboxIndex(0)}
      className="w-full h-auto object-contain bg-white cursor-zoom-in"
    />

    {detailImg && (
      <img
        src={detailImg}
        alt={`${current.sku} bathroom mirror detail`}
        onClick={()=>setLightboxIndex(1)}
        className="w-full h-auto object-contain bg-white cursor-zoom-in"
      />
    )}

  </div>

  {/* 🔥 桌機：維持大圖 */}
  <div className="hidden md:block">

    <div className="aspect-square bg-white mb-6 overflow-hidden">
      <img
        src={mainImg}
        alt={`${current.sku} LED Bathroom Mirror`}
        onClick={()=>setLightboxIndex(0)}
        className="w-full h-full object-cover cursor-zoom-in"
      />
    </div>

    {detailImg && (
      <div className="w-[320px]">
        <img
          src={detailImg}
          alt={`${current.sku} bathroom mirror detail`}
          onClick={()=>setLightboxIndex(1)}
          className="w-full object-cover cursor-zoom-in"
        />
      </div>
    )}

  </div>

</div>

        {/* 右資訊 */}
        <div>

          <p className="text-[10px] tracking-[0.4em] text-[#999] mb-3">
            MODEL
          </p>

<h1 className="text-[34px] tracking-[0.14em] font-light mb-6 text-black">
{lang === "en"
  ? product.title?.en
  : product.title?.zh}
</h1>

<p className="text-[13px] leading-[2] text-[#666] mb-10 max-w-[420px]">
  {mirrorDesc}
</p>

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

  <h2 className="text-[11px] tracking-[0.4em] mb-10">
    RELATED PRODUCTS
  </h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

    {related.map(item=>(

      <div
        key={item.id}
        onClick={()=>
          navigate(
            `/${lang}/products/mirror/${item.series.toLowerCase()}/${item.id}`
          )
        }
        className="cursor-pointer group"
      >

        <img
          src={item.main}
          alt={item.id}
          className="
            w-full
            transition
            duration-300
            group-hover:scale-105
          "
        />

        <p className="text-center text-[11px] mt-3 text-[#666]">
          {item.id.toUpperCase()}
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

</>
);
}
