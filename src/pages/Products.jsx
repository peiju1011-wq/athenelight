import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/products.css";
import useLang from "../hooks/useLang";

export default function Products(){

  const lang = useLang();

const [searchParams, setSearchParams] = useSearchParams();

const currentPage = Number(searchParams.get("page")) || 1;
const activeParam = searchParams.get("cat") || "ALL";
const searchParam = searchParams.get("search") || "";

const [active, setActive] = useState(activeParam);
const [keyword, setKeyword] = useState(searchParam);

const itemsPerPage = 12;

  const titleText =
    lang === "en"
      ? "Products"
      : "產品介紹";

  /* ===== 分類 ===== */
  const categories = [
    { key:"ALL", zh:"全部", en:"ALL" },
    { key:"INDOOR", zh:"室內", en:"INDOOR" },
    { key:"OUTDOOR", zh:"戶外", en:"OUTDOOR" },
    { key:"SMART", zh:"智慧", en:"SMART" },
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
  const mirrorSeries = [
    { key:"RF", zh:"方框鏡", en:"Rectangular Frame", img:"/images/products/mirror/rf-62.png" },
    { key:"RL", zh:"圓角鏡", en:"Rounded Mirror", img:"/images/products/mirror/rl-106.png" },
    { key:"CF", zh:"圓形鏡", en:"Circle Mirror", img:"/images/products/mirror/cf-146.png" },
    { key:"CL", zh:"橢圓鏡", en:"Oval Mirror", img:"/images/products/mirror/cl-181.png" },
    { key:"IR", zh:"不規則鏡", en:"Irregular Mirror", img:"/images/products/mirror/ir-273.png" },
    { key:"FL", zh:"全身鏡", en:"Full Length Mirror", img:"/images/products/mirror/fl-295.png" },
    { key:"MC", zh:"多功能鏡", en:"Smart Mirror", img:"/images/products/mirror/mc-321.png" }
  ];

  /* ===== 篩選 ===== */
  const filtered = products.filter(p => {

    const title = p.title?.[lang] || "";
    const category = p.cat || "";

    const searchText = (title + " " + category).toLowerCase();

    return (
      (active === "ALL" || p.cat === active) &&
      searchText.includes(keyword.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

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

  useEffect(()=>{
    document.body.style.background = "#ffffff";
    return ()=>{ document.body.style.background = "" };
  },[]);

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

useEffect(() => {
  if (currentPage > totalPages && totalPages > 0) {
  setSearchParams(prev => {
  prev.set("page", totalPages);
  return prev;
});
  }
}, [currentPage, totalPages]);

  return(

  <main className="bg-white min-h-screen pt-[120px] pb-32">

  <div className="max-w-[1200px] mx-auto px-6">

  {/* ===== HEADER ===== */}
  <section className="text-center mb-20">

    <p className="text-[#C8A46A] tracking-[0.4em] text-[11px] mb-4">
      {titleText.toUpperCase()}
    </p>

    <h1 className="text-[30px] md:text-[40px] tracking-[0.12em] text-[#111]">
      {titleText}
    </h1>

    <div className="w-10 h-[1px] bg-[#C8A46A] mx-auto mt-6"/>

  </section>

  {/* ===== FILTER ===== */}
<section className="flex flex-col items-center md:flex-row md:justify-between md:items-end gap-10 mb-20">

    {/* 分類 */}
  <div className="flex justify-center flex-wrap gap-8 text-[11px] tracking-[0.28em] w-full">

      {categories.map(c => {

        if(c.key === "MIRROR"){
          return (
            <Link
              key={c.key}
              to={`/${lang}/products/mirror`}
              className={`relative pb-2 transition ${
                active===c.key ? "text-black" : "text-[#aaa] hover:text-black"
              }`}
            >
              {lang==="en" ? c.en : c.zh}
            </Link>
          );
        }

        return (
          <button
            key={c.key}
onClick={() => {
  setActive(c.key);

  setSearchParams(prev => {
    prev.set("cat", c.key);
    prev.set("page", 1);
    return prev;
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}}
 
            className={`relative pb-2 transition ${
              active===c.key ? "text-black" : "text-[#aaa] hover:text-black"
            }`}
          >
            {lang==="en" ? c.en : c.zh}
          </button>
        );
      })}

    </div>

    {/* 搜尋 */}
  <div className="relative w-full max-w-[260px] mx-auto">

 <input
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
  placeholder={lang==="en" ? "Search products" : "搜尋產品"}
  className="w-full bg-transparent border-b border-[#ddd] pb-2 pr-8 text-[12px] tracking-[0.18em] text-[#333] focus:outline-none"
/>

    </div>

  </section>

  {/* ===== GRID ===== */}
  <section>

  {active === "MIRROR" ? (

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

      {mirrorSeries.map((item,i)=>(

        <Link
          key={i}
          to={`/${lang}/products/mirror/${item.key}`}
          className="group block"
        >

          <img
            src={item.img}
            className="w-full h-[240px] object-cover transition duration-700 group-hover:scale-[1.05]"
          />

          <h3 className="mt-6 text-center tracking-[0.2em] text-[#222]">
            {lang==="en" ? item.en : item.zh}
          </h3>

        </Link>

      ))}

    </div>

  ) : (

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

     {paginatedProducts.map(p=>{

        let url = "#";

        if(p.type === "light" && p.link){
          url = `/${lang}/lights/${p.link}`;
        }

        return (

        <Link
  to={url}
  key={p.id}
  className="relative group overflow-hidden block w-full max-w-[360px]"
>

            <img
  src={p.img}
  className="w-full aspect-[4/3] object-cover object-center transition duration-700 group-hover:scale-105"
/>

            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"/>

            <div className="absolute bottom-5 left-5 text-white opacity-0 group-hover:opacity-100 transition">

              <h3 className="text-[14px] tracking-[0.15em]">
                {p.title?.[lang] || p.title?.zh}
              </h3>

            </div>

          </Link>

        );
      })}

    </div>

  )}

  </section>
{active !== "MIRROR" && totalPages > 1 && (
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
