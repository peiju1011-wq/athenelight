import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../styles/products.css";
import useLang from "../hooks/useLang";
import manualSpecs from "../data/manualSpecs";

import { supabase } from "../lib/supabase";

export default function Products(){

const [productsData, setProductsData] = useState([]);
const [searchParams, setSearchParams] = useSearchParams();

const currentPage = Number(searchParams.get("page")) || 1;
const activeParam = searchParams.get("cat") || "ALL";
const searchParam = searchParams.get("search") || "";

const [active, setActive] = useState(activeParam);
const [keyword, setKeyword] = useState(searchParam);
const [openIndoor, setOpenIndoor] = useState(true);
const [openOutdoor, setOpenOutdoor] = useState(true);

const itemsPerPage = 12;

const lang = useLang();
const navigate = useNavigate();
useEffect(() => {

  async function loadProducts() {

const { data, error } = await supabase
  .from("products")
  .select("*")
  .order("sort_order", { ascending: true });


    console.log("PRODUCTS:", data);
    console.log("ERROR:", error);

    if(data){
      setProductsData(data);
    }

  }

  loadProducts();

}, []);

  const titleText =
    lang === "en"
      ? "Products"
      : "產品介紹";

  /* ===== 分類 ===== */
const categories = [
  { key:"ALL", zh:"燈光系列All", en:"Lighting" },
  { key:"INDOOR", zh:"室內", en:"INDOOR" },
  { key:"OUTDOOR", zh:"戶外", en:"OUTDOOR" },
  { key:"LIGHTING_DESIGN", zh:"照明設計", en:"LIGHTING DESIGN" },
{ key:"INTERIOR_LIGHTING", zh:"室內燈具", en:"INTERIOR LIGHTING" },
{ key:"FESTIVAL", zh:"節慶燈具", en:"FESTIVAL" },
{ key:"INSTALLATION", zh:"施工安裝", en:"INSTALLATION" },
{ key:"CUSTOM", zh:"訂製燈具", en:"CUSTOM LIGHTING" },
  { key:"MIRROR", zh:"鏡燈產品All", en:"MIRROR" }
];

  /* ===== 燈具產品（🔥已修正） ===== */
const products = productsData
  .filter(item =>
    item.published !== false &&
    item.slug &&
    item.title_zh &&
    item.cover
  )
  .map(item => {

    console.log("ITEM =", item);

    return {
      id:item.id,
      slug:item.slug,

      title:{
        zh:item.title_zh,
        en:item.title_en
      },

      img:item.cover,

      type:"light",

      cat:item.category?.toUpperCase(),

      link:item.slug
    };

  });

  /* ===== 鏡系列 ===== */
const mirrorItems = Object.entries(manualSpecs).map(([key,item]) => {

  const specText = (item.specs || [])
    .map(s => `${s.sku || ""} ${s.w || ""} ${s.h || ""} ${s.d || ""}`)
    .join(" ");

  return {
    id: key,
    type: "mirror",
    img: item.main,
   link: `/${lang}/products/mirror/${item.series.toLowerCase()}/${key}`,

    text: (
      key + " " +
      (item.series || "") + " " +
      specText
    ).toLowerCase()
  };
});

/* =========================
   🔥 全站搜尋池（核心）
========================= */
const allItems = [

  ...products.map(p => ({

    title: p.title,

    id: p.id,

    slug: p.slug,

    type: "light",

    cat: p.cat,

    img: p.img,

    link: `/${lang}/lights/${p.slug}`,

    text: (
      `${p.title.zh} ${p.title.en} ${p.cat} ${p.slug} 60 80 100 120 150`
    ).toLowerCase()

  })),

  ...mirrorItems

];



/* =========================
   🔥 搜尋
========================= */
const keywordLower = keyword.toLowerCase();
const isSearching = keyword.trim() !== "";

const filteredAll = allItems.filter(item => {

  

  if(!isSearching){
    if(item.type === "light"){
      return active === "ALL" || item.cat === active;
    }
    return active === "MIRROR";
  }

  const text = item.text.replace(/[^a-z0-9]/gi, " ");

  const keywords = keywordLower
    .replace(/[^a-z0-9]/gi, " ")
    .split(/\s+/)
    .filter(Boolean);

  return keywords.every(k => text.includes(k));
});

console.log("ALL ITEMS", allItems.length);
console.log("FILTERED", filteredAll.length);

/* ===== 分頁 ===== */
const totalPages = Math.ceil(filteredAll.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;

const paginatedProducts = isSearching
  ? filteredAll
  : filteredAll.slice(startIndex, startIndex + itemsPerPage);

/* ===== effect ===== */
useEffect(() => {
  const timer = setTimeout(() => {
    setSearchParams(prev => {
      prev.set("search", keyword);
      prev.set("page", 1);
      return prev;
    });
  }, 300);
  return () => clearTimeout(timer);
}, [keyword]);

useEffect(() => {
  setActive(activeParam);
  setKeyword(searchParam);
}, [activeParam, searchParam]);

useEffect(() => {
  setSearchParams(prev => {
    prev.set("page", 1);
    return prev;
  });
}, [active, lang]);

/* =========================
   UI（完全不動🔥）
========================= */


  return(

  <main className="bg-white min-h-screen pt-[120px] pb-32">

  <div className="max-w-[1200px] mx-auto px-6">

<section className="mb-16 mt-20 lg:mt-10">

<div className="
  flex
  flex-col

  lg:grid
  lg:grid-cols-[180px_1fr]
  lg:gap-12
">

    {/* 左側分類 */}
<aside className="
  w-full
  lg:sticky
  lg:top-[120px]
      text-[11px]
      tracking-[0.18em]
    ">

      <button
        onClick={() => {
          setActive("ALL");

          setSearchParams(prev => {
            prev.set("cat", "ALL");
            prev.set("page", 1);
            return prev;
          });
        }}
        className="
          block
          text-[12px]
          tracking-[0.25em]
          text-black
          mb-8
        "
      >
        燈光系列 All
      </button>

      {/* 室內 */}
      <div className="mb-6">

        <button
          onClick={() => setOpenIndoor(!openIndoor)}
          className="
            flex items-center gap-2
            text-black
            mb-3
            hover:text-[#C8A46A]
            transition
          "
        >
          <span>{openIndoor ? "▾" : "▸"}</span>
          室內系列
        </button>

        {openIndoor && (
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:gap-3">

            <button
              onClick={() => {
                setActive("LIGHTING_DESIGN");
                setSearchParams(prev => {
                  prev.set("cat","LIGHTING_DESIGN");
                  prev.set("page",1);
                  return prev;
                });
              }}
              className={active==="LIGHTING_DESIGN"
                ? "text-black"
                : "text-[#999] hover:text-black"}
            >
              照明設計
            </button>

            <button
              onClick={() => {
                setActive("INTERIOR_LIGHTING");
                setSearchParams(prev => {
                  prev.set("cat","INTERIOR_LIGHTING");
                  prev.set("page",1);
                  return prev;
                });
              }}
              className={active==="INTERIOR_LIGHTING"
                ? "text-black"
                : "text-[#999] hover:text-black"}
            >
              室內燈具
            </button>

            <button
              onClick={() => {
                setActive("CUSTOM");
                setSearchParams(prev => {
                  prev.set("cat","CUSTOM");
                  prev.set("page",1);
                  return prev;
                });
              }}
              className={active==="CUSTOM"
                ? "text-black"
                : "text-[#999] hover:text-black"}
            >
              訂製燈具
            </button>

          </div>
        )}

      </div>

      {/* 戶外 */}
      <div className="mb-8">

        <button
          onClick={() => setOpenOutdoor(!openOutdoor)}
          className="
            flex items-center gap-2
            text-black
            mb-3
            hover:text-[#C8A46A]
            transition
          "
        >
          <span>{openOutdoor ? "▾" : "▸"}</span>
          戶外系列
        </button>

        {openOutdoor && (
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:gap-3">

            <button
              onClick={() => {
                setActive("LIGHTING_DESIGN");
                setSearchParams(prev => {
                  prev.set("cat","LIGHTING_DESIGN");
                  prev.set("page",1);
                  return prev;
                });
              }}
              className={active==="LIGHTING_DESIGN"
                ? "text-black"
                : "text-[#999] hover:text-black"}
            >
              照明設計
            </button>

            <button
              onClick={() => {
                setActive("INSTALLATION");
                setSearchParams(prev => {
                  prev.set("cat","INSTALLATION");
                  prev.set("page",1);
                  return prev;
                });
              }}
              className={active==="INSTALLATION"
                ? "text-black"
                : "text-[#999] hover:text-black"}
            >
              施工安裝
            </button>

            <button
              onClick={() => {
                setActive("FESTIVAL");
                setSearchParams(prev => {
                  prev.set("cat","FESTIVAL");
                  prev.set("page",1);
                  return prev;
                });
              }}
              className={active==="FESTIVAL"
                ? "text-black"
                : "text-[#999] hover:text-black"}
            >
              節慶燈具
            </button>

            <button
              onClick={() => {
                setActive("CUSTOM");
                setSearchParams(prev => {
                  prev.set("cat","CUSTOM");
                  prev.set("page",1);
                  return prev;
                });
              }}
              className={active==="CUSTOM"
                ? "text-black"
                : "text-[#999] hover:text-black"}
            >
              訂製燈具
            </button>

          </div>
        )}

      </div>

      <button
        onClick={() => {
          navigate(`/${lang}/products/mirror`);
        }}
        className="
          text-[12px]
          tracking-[0.25em]
          text-[#999]
          hover:text-black
          transition
        "
      >
        鏡燈產品 All
      </button>

</aside>

{/* 右側內容 */}
<div className="w-full">

  {/* 搜尋框 */}
<div
  className="
    flex

    justify-center
    mt-8

    lg:justify-end
    lg:mt-0

    mb-12
  "
>

<div
  className="
    relative
    w-full
    max-w-[260px]

    mx-auto
    lg:mx-0
  "
>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={
          lang === "en"
            ? "Search products / size / model"
            : "搜尋產品 / 尺寸 / 型號"
        }
        className="
          w-full bg-transparent
          border-b border-[#ccc]
          pb-2 pr-8
          text-[12px]
          tracking-[0.18em]
          text-[#333]
          focus:outline-none
          focus:border-black
          transition
          placeholder:text-[#aaa]
        "
      />

      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#999]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="20" y1="20" x2="16.5" y2="16.5" />
      </svg>

    </div>

  </div>

  {/* GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
    {paginatedProducts.map(item => {

      const url = item.link;

      return (

        <Link
          to={url}
          key={item.id}
          className="relative group overflow-hidden block w-full max-w-[360px]"
        >

          <div className="relative w-full aspect-[4/3] overflow-hidden">

            {item.img && (
              <img
                src={item.img}
                alt={`ATHENE LIGHT ${item.title?.[lang] || item.title?.zh}`}
                className="w-full h-full object-cover object-center transition duration-700 group-hover:scale-105"
              />
            )}

            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/40
                via-black/5
                to-transparent
              "
            />

          </div>

          <div
            className="
              absolute bottom-5 left-5
              text-white
              opacity-100
              md:opacity-0
              md:group-hover:opacity-100
              transition
            "
            style={{
              textShadow:"0 2px 12px rgba(0,0,0,0.4)"
            }}
          >

            <h3 className="text-[14px] tracking-[0.15em]">

              {item.type === "light"
                ? item.title?.[lang] || item.title?.zh
                : item.id.toUpperCase()
              }

            </h3>

          </div>

        </Link>

      );

    })}

  </div>

</div>

</div>

</section>



{/*  無結果 */}
{paginatedProducts.length === 0 && (
  <div className="text-center text-[#999] tracking-[0.2em] mt-20">
    {lang==="en" ? "NO RESULT" : "找不到符合項目"}
  </div>
)}



{/*  分頁 */}
{active !== "MIRROR" && !isSearching && totalPages > 1 && (
  <div className="flex justify-center items-center gap-3 mt-20">

    <button
onClick={() => {
setSearchParams(prev => {
  prev.set("page", Math.max(currentPage - 1, 1));
  return prev;
});
  window.scrollTo({ top: 0, behavior: "smooth" });
}}
      disabled={currentPage === 1}
      className={`
        px-3 py-2 text-[11px] tracking-[0.2em] border transition
        ${currentPage === 1
          ? "border-[#e5e5e5] text-[#ccc] cursor-not-allowed"
          : "border-[#ddd] text-[#666] hover:border-black hover:text-black"}
      `}
    >
    {lang==="en" ? "PREV" : "上一頁"}
    </button>

    {Array.from({ length: totalPages }).map((_, i) => {
      const page = i + 1;
      return (
        <button
          key={page}
         onClick={() => {
 setSearchParams(prev => {
  prev.set("page", page);
  return prev;
});
  window.scrollTo({ top: 0, behavior: "smooth" });
}}
          className={`
            w-9 h-9 text-[12px] border transition
            ${currentPage === page
              ? "bg-black text-white border-black"
              : "border-[#ddd] text-[#666] hover:border-black hover:text-black"}
          `}
        >
          {page}
        </button>
      );
    })}

<button
onClick={() => {
 setSearchParams(prev => {
  prev.set("page", Math.min(currentPage + 1, totalPages));
  return prev;
});
  window.scrollTo({ top: 0, behavior: "smooth" });
}}
  disabled={currentPage === totalPages}
  className={`
    px-3 py-2 text-[11px] tracking-[0.2em] border transition
    ${currentPage === totalPages
      ? "border-[#e5e5e5] text-[#ccc] cursor-not-allowed"
      : "border-[#ddd] text-[#666] hover:border-black hover:text-black"}
  `}
>
  {lang==="en" ? "NEXT" : "下一頁"}
</button>



  </div>
)}
  </div>

  </main>
  );
  
}
