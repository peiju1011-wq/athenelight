import { useState, useEffect } from "react";
import projects from "../data/projects";
import useLang from "../hooks/useLang";
import { text } from "../data/text";
import { Link, useSearchParams } from "react-router-dom";

export default function Projects() {
  const lang = useLang();

const [searchParams, setSearchParams] = useSearchParams();

const currentPage = Number(searchParams.get("page")) || 1;
const typeParam = searchParams.get("type") || (lang === "en" ? "ALL" : "全部");
const searchParam = searchParams.get("search") || "";

const [active, setActive] = useState(typeParam);
const [keyword, setKeyword] = useState(searchParam);

  const perPage = 9;

  /* ===== 類別 ===== */
  const categories =
    lang === "en"
      ? ["ALL", "COMMERCIAL", "RESIDENTIAL", "PUBLIC"]
      : ["全部", "商業", "住宅", "公共"];

  /* ===== 對照 ===== */
  const typeMap = {
    ALL: "全部",
    COMMERCIAL: "商業",
    RESIDENTIAL: "住宅",
    PUBLIC: "公共"
  };

  /* ===== 🔥 強化搜尋 ===== */
  const filtered = projects.filter((p) => {
    const title = (lang === "en" ? p.title_en : p.title) || "";
    const desc = (lang === "en" ? p.desc_en : p.desc) || "";
    const categoryText =
      (lang === "en" ? p.category_en : p.category) || "";
    const typeText = p.type || "";

    /* 🔥 關鍵：全部合併成一條字串 */
    const searchText = (
      title +
      " " +
      desc +
      " " +
      categoryText +
      " " +
      typeText
    )
      .toLowerCase()
      .replace(/\s+/g, ""); // 🔥 去空白

    const keywordLower = keyword
      .toLowerCase()
      .replace(/\s+/g, ""); // 🔥 使用者輸入也去空白

    /* ===== 分類 ===== */
    const projectType = p.type || "全部";
    const normalizedActive = typeMap[active] || active;

const isAll =
  active === "ALL" || active === "全部";

const matchCategory = isAll
  ? true
  : projectType === normalizedActive;

    /* ===== 搜尋（容錯版🔥） */
    const matchKeyword =
      !keywordLower || searchText.includes(keywordLower);

    return matchCategory && matchKeyword;
  });

  /* ===== 分頁 ===== */
  const start = (currentPage - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);
const totalPages = Math.ceil(filtered.length / perPage);
useEffect(() => {
  setSearchParams(prev => {
    prev.set("page", 1);
    return prev;
  });
}, [active, keyword, lang]);

useEffect(() => {
  setActive(typeParam);
  setKeyword(searchParam);
}, [typeParam, searchParam]);

useEffect(() => {
  if (currentPage > totalPages && totalPages > 0) {
    setSearchParams(prev => {
      prev.set("page", totalPages);
      return prev;
    });
  }
}, [currentPage, totalPages]);

  /* ===== UI ===== */
  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2070&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center text-white">
          <p className="text-[10px] tracking-[0.5em] opacity-70 mb-4">
            {text.projects.tag[lang]}
          </p>

          <h1 className="text-[34px] md:text-[44px] tracking-[0.22em] font-light">
            {text.projects.title[lang]}
          </h1>

          <div className="w-[40px] h-[1px] bg-[#C8A46A] mx-auto mt-6" />
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-40 mt-20">


{/* ===== FILTER（高級版🔥） */}
<section className="mb-20">

  <div className="flex flex-col md:flex-row justify-between items-center gap-8">

    {/* ===== 分類（恢復你之前高級版） */}
<div className="
  w-full
  grid grid-cols-4 gap-y-6 gap-x-8

  text-[12px] tracking-[0.25em]

  justify-items-center
  md:flex md:flex-wrap md:gap-10 md:justify-start
">


      {categories.map((c) => {
        const isActive = active === c;

        return (
          <button
            key={c}
onClick={() => {
  setActive(c);

  setSearchParams(prev => {
    prev.set("type", c);
    prev.set("page", 1);
    return prev;
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}}
            className={`
              relative transition pb-2

              ${isActive
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

              ${isActive ? "after:w-6" : "after:w-0"}
            `}
          >
            {c}
          </button>
        );
      })}

    </div>

    {/* ===== 搜尋（精修版🔥） */}
    <div className="relative w-[240px]">

      {/* input */}
      <input
        placeholder={lang === "en" ? "Search project" : "搜尋專案"}
        value={keyword}
       onChange={(e) => {
  const value = e.target.value;

  setKeyword(value);

  setSearchParams(prev => {
    prev.set("search", value);
    prev.set("page", 1);
    return prev;
  });
}}
        className="
          w-full
          border-b border-[#ddd]
          py-2 pr-8
          text-[13px] text-[#111]   /* 🔥 修復透明 */
          placeholder:text-[#bbb]

          bg-transparent
          outline-none

          focus:border-black
          transition
        "
      />

      {/* 🔥 高級放大鏡（SVG） */}
      <svg
        className="absolute right-0 top-[50%] translate-y-[-50%] w-[14px] h-[14px] text-[#999]"
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
{/* ===== GRID ===== */}
<section className="space-y-8">

  {currentData.length === 0 && (
    <div className="text-center text-[#aaa] py-40 tracking-[0.2em]">
      NO RESULTS
    </div>
  )}

  {Array.from({ length: Math.ceil(currentData.length / 3) }).map(
    (_, groupIndex) => {

      const group = currentData.slice(groupIndex * 3, groupIndex * 3 + 3);

      return (
        <div key={groupIndex} className="space-y-6">

          {/* ===== 長圖 ===== */}
    {group[0] && (
  <Link to={`/${lang}/projects/${group[0].id}`}>
              <div className="relative h-[300px] overflow-hidden group">

                <img
                  src={group[0].img}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-6 left-6 text-white">

                  <p className="text-[10px] tracking-[0.35em] text-[#C8A46A] mb-2">
                    {lang === "en"
                      ? group[0].category_en
                      : group[0].category}
                  </p>

                  <h3 className="text-[18px] tracking-[0.12em] leading-[1.5] max-w-[420px]">
                    {lang === "en"
                      ? group[0].title_en
                      : group[0].title}
                  </h3>

                </div>

              </div>
            </Link>
          )}

          {/* ===== 短圖（🔥 統一 overlay） ===== */}
          <div className="grid grid-cols-2 gap-6">

            {group.slice(1).map((p) => {

              const title = lang === "en" ? p.title_en : p.title;
              const category = lang === "en" ? p.category_en : p.category;

              return (
            <Link key={p.id} to={`/${lang}/projects/${p.id}`}>

                  <div className="relative h-[240px] overflow-hidden group">

                    <img
                      src={p.img}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-5 left-5 text-white">

                      <p className="text-[10px] tracking-[0.35em] text-[#C8A46A] mb-2">
                        {category}
                      </p>

                      <h3 className="
                        text-[14px]
                        tracking-[0.12em]
                        leading-[1.5]
                        max-w-[260px]
                      ">
                        {title}
                      </h3>

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>
      );
    }
  )}
</section>

{totalPages > 1 && (
  <div className="flex justify-center items-center gap-3 mt-20">

    {/* PREV */}
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
          ? "border-[#e5e5e5] text-[#ccc]"
          : "border-[#ddd] text-[#666] hover:border-black hover:text-black"}
      `}
    >
      {lang==="en" ? "PREV" : "上一頁"}
    </button>

    {/* 頁碼 */}
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
              : "border-[#ddd] text-[#666] hover:border-black"}
          `}
        >
          {page}
        </button>
      );
    })}

    {/* NEXT */}
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
          ? "border-[#e5e5e5] text-[#ccc]"
          : "border-[#ddd] text-[#666] hover:border-black"}
      `}
    >
      {lang==="en" ? "NEXT" : "下一頁"}
    </button>

  </div>
)}
      </div>
    </div>
  );
}
