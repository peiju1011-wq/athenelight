import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/products.css";
import useLang from "../hooks/useLang";
import manualSpecs from "../data/manualSpecs";

export default function Products(){


const [searchParams, setSearchParams] = useSearchParams();

const currentPage = Number(searchParams.get("page")) || 1;
const activeParam = searchParams.get("cat") || "ALL";
const searchParam = searchParams.get("search") || "";

const [active, setActive] = useState(activeParam);
const [keyword, setKeyword] = useState(searchParam);

const itemsPerPage = 12;

const lang = useLang();
  const titleText =
    lang === "en"
      ? "Products"
      : "產品介紹";

  /* ===== 分類 ===== */
const categories = [
  { key:"ALL", zh:"燈光系列", en:"Lighting" },
  { key:"INDOOR", zh:"室內", en:"INDOOR" },
  { key:"OUTDOOR", zh:"戶外", en:"OUTDOOR" },
  { key:"MIRROR", zh:"鏡類產品", en:"MIRROR" }
];

  /* ===== 燈具產品（🔥已修正） ===== */
  const products = [
    {
      id:1,
      title:{ zh:"吊燈", en:"Chandelier" },
      img:"/images/lights/pd1-1.png",
      type:"light",
      cat:"INDOOR",
      link:"linear-light"
    },

    {
      id:2,
      title:{ zh:"雙環吊燈", en:"Double Ring Chandelier" },
      img:"/images/lights/pd2-1.jpg",
      type:"light",
      cat:"INDOOR",
      link:"double-ring-light"
    },

    {
      id:3,
      title:{ zh:"石材壁燈", en:"Stone Wall Light"},
      img:"/images/lights/pd3-1.png",
      type:"light",
      cat:"OUTDOOR",
      link:"stone-wall-light"
    },

        {
      id:4,
      title:{ zh:"石材壁燈2", en:"Stone Wall Light2"},
      img:"/images/lights/pd4-1.jpg",
      type:"light",
      cat:"OUTDOOR",
      link:"stone-wall-light2"
    },

{
  id: 5,

  title: {
    zh: "石材床頭壁燈",
    en: "Stone Wall Bed Light"
  },
  img: "/images/lights/pd5-10.jpg",
  type: "light",
  cat: "INDOOR",
  link: "stone-wall-light-bed"
},

    {
      id:6,
      title:{ zh:"銀杏葉吊燈", en:"Ginkgo Leaf Chandelier"},
      img:"/images/lights/pd6-1.png",
      type:"light",
      cat:"INDOOR",
      link:"ginkgo-light"   // 🔥 修正（小寫）
    }
  ];

  /* ===== 鏡系列 ===== */
const mirrorItems = Object.entries(manualSpecs).map(([key,item]) => {

  const specText = (item.specs || [])
    .map(s => `${s.sku || ""} ${s.w || ""} ${s.h || ""} ${s.d || ""}`)
    .join(" ");

  return {
    id: key,
    type: "mirror",
    img: item.main,
    link: `/${lang}/products/mirror/${item.series}/${key}`,

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
    type: "light",
    cat: p.cat,
    img: p.img,
    link: `/${lang}/lights/${p.link}`,

    text: (
      `${p.title.zh} ${p.title.en} ${p.cat} ${p.link} 60 80 100 120 150`
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

  
<section className="flex flex-col items-center gap-10 mb-20 mt-10">

  {/* 🔥 版心（一定要有，對齊圖片用） */}
  <div className="w-full max-w-[1200px] flex flex-col items-center md:flex-row md:items-end md:justify-between">

    {/* 分類 */}
<div className="
  w-full
  grid grid-cols-4 gap-y-4 gap-x-4

  text-[12px] tracking-[0.25em]

  justify-items-center
  md:flex md:flex-wrap md:gap-10 md:justify-start
">

{categories.map(c => {

  return (
    <button
      key={c.key}
      onClick={() => {

        setActive(c.key);

        setSearchParams(prev => {
          prev.set("cat", c.key);
prev.set("search", keyword);
          prev.set("page", 1);
          return prev;
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      }}

      className={`
        group
        relative pb-2 transition

        ${active===c.key
          ? "text-black"
          : "text-[#aaa] hover:text-black"
        }

        after:content-['']
        after:absolute
        after:left-1/2
        after:-translate-x-1/2
        after:bottom-0
        after:h-[1px]
        after:bg-[#C8A46A]
        after:transition-all

        ${
          active===c.key && c.key !== "ALL"
            ? "after:w-6"
            : "after:w-0 group-hover:after:w-6"
        }
      `}
    >
      {lang==="en" ? c.en : c.zh}
    </button>
  );

})}


    </div>

    

{/* 搜尋 */}
<div className="
  relative w-full max-w-[260px]
  mt-6 md:mt-0
  mx-auto md:mx-0
">

  <input
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    placeholder={lang==="en" ? "Search products / size / model" : "搜尋產品 / 尺寸 / 型號"}
    className="
      w-full bg-transparent
      border-b border-[#ccc]
      pb-2 pr-8
      text-[12px] tracking-[0.18em]
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

</section>


{/* ===== GRID ===== */}
<section>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

    {paginatedProducts.map(item => {

      const url = item.link;

      return (

        <Link
          to={url}
          key={item.id}
          className="relative group overflow-hidden block w-full max-w-[360px]"
        >

          <img
            src={item.img}
            className="w-full aspect-[4/3] object-cover object-center transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"/>

          <div className="absolute bottom-5 left-5 text-white opacity-0 group-hover:opacity-100 transition">

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
