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


const isMobile =
  window.innerWidth < 1024;



const [openLighting, setOpenLighting] =
  useState(!isMobile);

const [openIndoorMenu, setOpenIndoorMenu] =
  useState(false);

const [openOutdoorMenu, setOpenOutdoorMenu] =
  useState(false);

const [openLandscapeMenu, setOpenLandscapeMenu] =
 useState(false);

const [openFestivalMenu, setOpenFestivalMenu] =
  useState(false);

const [openFestivalLight, setOpenFestivalLight] =
  useState(!isMobile);


const itemsPerPage = 12;

const lang = useLang();
const navigate = useNavigate();

function handleCategoryClick(key){

  setActive(key);

  setSearchParams(prev => {
    prev.set("cat", key);
    prev.set("page", 1);
    return prev;
  });

}

useEffect(() => {

  async function loadProducts() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });

    if(data){

      console.log("=== PRODUCTS DATA ===");
      console.log(data);

      console.log("=== CATEGORY LIST ===");
      console.log(
        data.map(item => item.category)
      );

      setProductsData(data);
    }

  }

  loadProducts();

}, []);

  const titleText =
    lang === "en"
      ? "Products"
      : "產品介紹";

const outdoorTypes = [

  {
    key:"LANDSCAPE",
    zh:"景觀燈",
    en:"Landscape Lighting",

    children:[
      { key:"LANDSCAPE_POLE", zh:"高燈", en:"Pole Light" },
      { key:"LANDSCAPE_BOLLARD", zh:"矮燈", en:"Bollard Light" },
      { key:"POST_TOP", zh:"柱頭燈", en:"Post Top Light" },
      { key:"LANDSCAPE_INGROUND", zh:"地埋燈", en:"In-ground Light" },
      { key:"UNDERWATER", zh:"水底燈", en:"Underwater Light" }
    ]
  },

  {
    key:"FACADE",
    zh:"外牆燈",
    en:"Facade Lighting",

    children:[
      { key:"LINEAR_FACADE", zh:"線型燈", en:"Linear Light" },
      { key:"FLOOD", zh:"投光燈", en:"Flood Light" },
      { key:"WALL_LIGHT", zh:"壁燈", en:"Wall Light" },
      { key:"RECESSED_WALL", zh:"崁壁燈", en:"Recessed Wall Light" },
      { key:"STEP", zh:"階梯燈", en:"Step Light" },
      { key:"INGROUND", zh:"地埋燈", en:"In-ground Light" }
    ]
  },

{
  key:"CUSTOM",
  zh:"訂製燈",
  en:"Custom Lighting"
},

{
  key:"INSTALLATION",
  zh:"施工",
  en:"Installation"
},

{
  key:"LIGHTING_DESIGN",
  zh:"設計",
  en:"Lighting Design"
}

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

  subCat:item.sub_category?.toUpperCase(),

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

    subCat: p.subCat,

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

      if(active === "ALL"){
        return true;
      }

if(active === "INDOOR"){
  return item.cat === "INDOOR";
}

if(active === "OUTDOOR_WALL"){
  return item.cat === "OUTDOOR_WALL";
}

if(active === "FESTIVAL"){
  return item.cat === "FESTIVAL";
}

if(active === "PENDANT"){

  return (
    item.subCat === "LOBBY_PENDANT" ||
    item.subCat === "DINING_PENDANT" ||
    item.subCat === "CUSTOM_PENDANT"
  );

}

return (
  item.cat === active ||
  item.subCat === active
);
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

console.log(
  "CATEGORYS",
  [...new Set(
    productsData.map(
      item => item.category
    )
  )]
);

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


const indoorTypes = [

  {
    key:"PENDANT",
    zh:"吊燈",
    en:"Pendant Light",

    children:[
      {
        key:"LOBBY_PENDANT",
        zh:"大廳吊燈",
        en:"Lobby Chandelier"
      },

      {
        key:"DINING_PENDANT",
        zh:"餐廳吊燈",
        en:"Dining Pendant Light"
      },

      {
        key:"CUSTOM_PENDANT",
        zh:"訂製吊燈",
        en:"Custom Pendant Light"
      }
    ]
  },

  {
    key:"LIGHT_FILM",
    zh:"光膜",
    en:"Light Film"
  },

  {
    key:"CRYSTAL_FILM",
    zh:"晶膜屏",
    en:"Crystal Film Screen"
  },

  {
    key:"LINEAR",
    zh:"線條燈",
    en:"Linear Light"
  },

  {
    key:"WALL",
    zh:"壁燈",
    en:"Wall Light"
  }

];





const festivalTypes = [

  { key:"NET_LIGHT", zh:"網燈", en:"Net Light" },

  { key:"STRING", zh:"燈串", en:"String Light" },

  { key:"FENCE_LIGHT", zh:"柵欄燈", en:"Fence Light" },

  { key:"CURTAIN_LIGHT", zh:"窗簾燈", en:"Curtain Light" }

];


return(  

  <main className="bg-white min-h-screen pt-[120px] pb-32">

  <div className="max-w-[1200px] mx-auto px-6">

<section className="mb-16 mt-6 lg:mt-10">

<div className="
  flex
  flex-col

  lg:grid
  lg:grid-cols-[180px_1fr]
  lg:gap-12
">


{/* 左側分類 */}
<aside
  className="
    w-full
    lg:sticky
    lg:top-[120px]
    text-[12px]
    tracking-[0.08em]
  "
>


{/* 照明燈具 */}

<div className="mb-8">

  <button
    onClick={() =>
      setOpenLighting(!openLighting)
    }
className="
  flex items-center gap-2
  text-[13px]
  tracking-[0.12em]
  text-black
  mb-4
  hover:text-[#C8A46A]
  transition
"
  >
    <span>
      {openLighting ? "▾" : "▸"}
    </span>

    照明燈具
  </button>

  {openLighting && (

<div className="space-y-4 ml-4">

{/* 室內 */}

<button
onClick={() => {
  setOpenIndoorMenu(!openIndoorMenu);
  handleCategoryClick("INDOOR");
}}
  className="
    flex items-center gap-2
    text-[#666]
    hover:text-[#C8A46A]
    transition
  "
>
  <span>
    {openIndoorMenu ? "▾" : "▸"}
  </span>

  室內
</button>



{openIndoorMenu && (

  <div
    className="
      ml-6
      pl-3
      border-l border-[#f3f3f3]
      space-y-2
      text-[12px]
      text-[#666]
    "
  >

{indoorTypes.map(item => (

  <div key={item.key}>

    <div
      onClick={() => handleCategoryClick(item.key)}
      className="
        hover:text-[#C8A46A]
        cursor-pointer
        transition
      "
    >
      {item.zh}
    </div>

    {item.children && (
<div
  className="
    flex
    flex-wrap
    gap-2
    mt-2
    ml-3
  "
>
        {item.children.map(child => (

<div
  key={child.key}
  onClick={() =>
    handleCategoryClick(child.key)
  }
  className="
    px-3
    py-1

    text-[11px]

    border
    border-[#ddd]

    rounded-full

    hover:border-[#C8A46A]
    hover:text-[#C8A46A]

    cursor-pointer
    transition
  "
>
  {child.zh}
</div>

        ))}
      </div>
    )}

  </div>

))}

  </div>

)}





{/* 戶外 */}

<button
onClick={() => {
  setOpenOutdoorMenu(!openOutdoorMenu);
  handleCategoryClick("OUTDOOR_WALL");
}}
  className="
    flex items-center gap-2
    text-[#666]
    hover:text-[#C8A46A]
    transition
  "
>
  <span>
    {openOutdoorMenu ? "▾" : "▸"}
  </span>

  戶外
</button>

{openOutdoorMenu && (

  <div
    className="
      ml-6
      pl-3
      border-l border-[#f3f3f3]
      space-y-2
      text-[12px]
      text-[#666]
    "
  >

    {outdoorTypes
      .find(item => item.key === "FACADE")
      ?.children
      ?.map(light => (

        <div
          key={light.key}
          onClick={() => handleCategoryClick(light.key)}
          className="
            hover:text-[#C8A46A]
            cursor-pointer
            transition
          "
        >
          {light.zh}
        </div>

    ))}

  </div>

)}


{/* 景觀 */}

<button
onClick={() => {
  setOpenLandscapeMenu(!openLandscapeMenu);
  handleCategoryClick("LANDSCAPE");
}}
  className="
    flex items-center gap-2
    text-[#666]
    hover:text-[#C8A46A]
    transition
  "
>
  <span>
    {openLandscapeMenu ? "▾" : "▸"}
  </span>

  景觀
</button>

{openLandscapeMenu && (

  <div
    className="
      ml-6
      pl-3
      border-l border-[#f3f3f3]
      space-y-2
      text-[12px]
      text-[#666]
    "
  >

    {outdoorTypes
      .find(item => item.key === "LANDSCAPE")
      ?.children
      ?.map(light => (

        <div
  key={light.key}
  onClick={() => handleCategoryClick(light.key)}
          className="
            hover:text-[#C8A46A]
            cursor-pointer
            transition
          "
        >
          {light.zh}
        </div>

    ))}

  </div>

)}

<button
  onClick={() => handleCategoryClick("CUSTOM")}
  className="
    flex items-center gap-2
    text-[#666]
    hover:text-[#C8A46A]
    transition
  "
>

<span>
  {openLandscapeMenu ? "▾" : "▸"}
</span>

訂製燈具
</button>

<button
onClick={()=>{
  setActive("MIRROR");
  navigate(`/${lang}/products/mirror`);
}}
   className="
    flex items-center gap-2
    text-[#666]
    hover:text-[#C8A46A]
    transition
  "
>
<span>
  {openLandscapeMenu ? "▾" : "▸"}
</span>

鏡燈
</button>

<button
onClick={() => {
  setOpenFestivalMenu(!openFestivalMenu);
  handleCategoryClick("FESTIVAL");
}}
  className="
    flex items-center gap-2
    text-[#666]
    hover:text-[#C8A46A]
    transition
  "
>
  <span>
    {openFestivalMenu ? "▾" : "▸"}
  </span>

  節慶燈具
</button>

{openFestivalMenu && (

  <div
    className="
      ml-6
      pl-3
      border-l border-[#f3f3f3]
      space-y-2
      text-[12px]
      text-[#666]
    "
  >

    {festivalTypes.map(item => (
      

      <div

      onClick={() => handleCategoryClick(item.key)}
        key={item.key}
        className="
          hover:text-[#C8A46A]
          cursor-pointer
          transition
        "
      >
        {item.zh}
      </div>

    ))}

  </div>

)}


</div>
)}

</div>




{/* 照明設計 */}

<div className="mb-6">

  <button
    onClick={() => {

      setActive("LIGHTING_DESIGN");

      setSearchParams(prev => {
        prev.set(
          "cat",
          "LIGHTING_DESIGN"
        );
        prev.set("page",1);
        return prev;
      });

    }}
    className="
    flex items-center gap-2
    text-[#666]
    hover:text-[#C8A46A]
    transition
  "
  >

<span>
  {openLandscapeMenu ? "▾" : "▸"}
</span>

照明設計
  </button>

</div>

{/* 施工 */}

<div className="mb-6">

  <button
    onClick={() => {

      setActive("INSTALLATION");

      setSearchParams(prev => {
        prev.set(
          "cat",
          "INSTALLATION"
        );
        prev.set("page",1);
        return prev;
      });

    }}
     className="
    flex items-center gap-2
    text-[#666]
    hover:text-[#C8A46A]
    transition
  "
  >
<span>
  {openLandscapeMenu ? "▾" : "▸"}
</span>

施工
  </button>

</div>

</aside>

{/* 右側內容 */}
<div className="w-full">

{/* 搜尋框 */}
<div
  className="
    flex
    justify-center

    -mt-3

    lg:justify-end
    lg:mt-0

    mb-9
    lg:mb-12
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
        w-full
        bg-transparent
        border-b border-[#ccc]
        pb-2
        pr-8
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
      className="
        absolute
        right-0
        top-1/2
        -translate-y-1/2
        w-[14px]
        h-[14px]
        text-[#999]
      "
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
          : "border-[#ddd]  hover:border-black hover:text-black"}
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
