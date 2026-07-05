import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import useLang from "../hooks/useLang";
import { text } from "../data/text";
import { Link, useSearchParams } from "react-router-dom";



export default function Projects() {

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({});
  const mainCategories = categories.filter(
    c => !c.parent_key
  );

  const childCategories = categories.filter(
    c => c.parent_key
  );

  const grandChildCategories = categories.filter(c => {

    const parent = categories.find(
      p => p.category_key === c.parent_key
    );

    return parent?.parent_key;

  });

  useEffect(() => {

    async function loadProjects() {

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setProjects(data);
      }

    }

    loadProjects();

  }, []);
  const lang = useLang();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const typeParam = searchParams.get("type") || (lang === "en" ? "ALL" : "全部");
  const searchParam = searchParams.get("search") || "";

  const [active, setActive] = useState(typeParam);
  const [keyword, setKeyword] = useState(searchParam);

  const perPage = 12;
  async function loadCategories() {

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("type", "project")
      .eq("enabled", true)
      .order("level", { ascending: true })
      .order("parent_key", { ascending: true })
      .order("sort_order", { ascending: true })

    console.log("PROJECT CATEGORIES");
    console.log(data);

    if (error) {
      console.log(error);
      return;
    }

    setCategories([
      {
        category_key: "ALL",
        zh: "全部",
        en: "ALL"
      },
      ...(data || [])
    ]);
  }

  useEffect(() => {
    loadCategories();
  }, []);


  useEffect(() => {

    const current = categories.find(
      c => c.category_key === active
    );

    if (current?.parent_key) {

      setExpanded(prev => ({
        ...prev,
        [current.parent_key]: true
      }));

    }

  }, [active, categories]);


  /* ===== 對照 ===== */
  const filtered = projects.filter((p) => {



    const title =
      (lang === "en"
        ? p.title_en
        : p.title_zh) || "";

    const desc =
      (lang === "en"
        ? p.desc_en
        : p.desc_zh) || "";

    const categoryText =
      p.sub_category ||
      p.category ||
      "";

    const typeText =
      p.sub_category ||
      p.category ||
      "";

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
      .replace(/\s+/g, "");

    const keywordLower = keyword
      .toLowerCase()
      .replace(/\s+/g, "");

    const projectType =
      p.sub_category ||
      p.category ||
      "全部";


    const normalizedActive = active;

    const isAll =
      active === "ALL" ||
      active === "全部";

    const selected = categories.find(
      c => c.category_key === normalizedActive
    );

    const isMainCategory =
      selected && !selected.parent_key;

    const matchCategory = isAll
      ? true
      : isMainCategory
        ? (
          p.category === normalizedActive ||
          categories.find(
            c => c.category_key === p.sub_category
          )?.parent_key === normalizedActive
        )
        : projectType === normalizedActive;

    const matchKeyword =
      !keywordLower ||
      searchText.includes(keywordLower);

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
      <div className="max-w-[1800px] mx-auto px-8 md:px-6 pb-40 mt-20">


        {/* ===== FILTER（高級版🔥） */}
        <section className="mb-12">

          <div className="flex flex-col md:flex-row gap-12">

            {/* ===== 分類（恢復你之前高級版） */}
            <div
              className="
    hidden md:flex
    w-[220px]
    shrink-0
    flex-col
    gap-5
sticky
top-[120px]
mt-24
  "
            >

              {mainCategories.map(main => {

                const key = main.category_key;

                const label =
                  lang === "en"
                    ? main.en
                    : main.zh;

                const isActive =
                  active === key;

                const children =
                  childCategories.filter(
                    c => c.parent_key === key
                  );




                return (

                  <div
                    key={key}
                    className="space-y-2"
                  >

                    {/* ===== 主分類 ===== */}

                    <button
                      onClick={() => {

                        setExpanded(prev => ({
                          ...prev,
                          [key]: !prev[key]
                        }));

                        setActive(key);

                        setSearchParams(prev => {
                          prev.set("type", key);
                          prev.set("page", 1);
                          return prev;
                        });

                      }}
                      className={`
          flex
          items-center
          gap-2
          w-full
          text-left
          text-[13px]
          transition
          ${isActive
                          ? "text-[#C8A46A]"
                          : "text-[#666] hover:text-[#C8A46A]"
                        }
        `}
                    >

                      <span className="w-[14px]">
                        {children.length
                          ? expanded[key]
                            ? "▾"
                            : "▸"
                          : "▸"}
                      </span>

                      <span>
                        {label}
                      </span>

                    </button>

                    {/* ===== 子分類 ===== */}

                    {children.length > 0 &&
                      expanded[key] && (

                        <div className="ml-6 space-y-2">

                          {children.map(child => {

                            const grandChildren =
                              grandChildCategories.filter(
                                g => g.parent_key === child.category_key
                              );

                            return (

                              <div key={child.category_key}>

                                {/* 子分類 */}

                                <button
                                  onClick={() => {

                                    setActive(child.category_key);

                                    setSearchParams(prev => {
                                      prev.set("type", child.category_key);
                                      prev.set("page", 1);
                                      return prev;
                                    });

                                  }}
                                  className={`
                    block
                    w-full
                    text-left
                    text-[12px]
                    transition
                    ${active === child.category_key
                                      ? "text-[#C8A46A]"
                                      : "text-[#666] hover:text-[#C8A46A]"
                                    }
                  `}
                                >

                                  {lang === "en"
                                    ? child.en
                                    : child.zh}

                                </button>

                                {/* ===== 孫分類 ===== */}

                                {grandChildren.length > 0 && (

                                  <div className="ml-5 mt-2 space-y-2">

                                    {grandChildren.map(g => (

                                      <button
                                        key={g.category_key}
                                        onClick={() => {

                                          setActive(g.category_key);

                                          setSearchParams(prev => {
                                            prev.set("type", g.category_key);
                                            prev.set("page", 1);
                                            return prev;
                                          });

                                        }}
                                        className={`
                          block
                          w-full
                          text-left
                          text-[11px]
                          transition
                          ${active === g.category_key
                                            ? "text-[#C8A46A]"
                                            : "text-[#999] hover:text-[#C8A46A]"
                                          }
                        `}
                                      >

                                        {lang === "en"
                                          ? g.en
                                          : g.zh}

                                      </button>

                                    ))}

                                  </div>

                                )}

                              </div>

                            );

                          })}

                        </div>

                      )}

                  </div>

                );

              })}

              </div>


              <div className="flex-1">


                {/* ===== 手機版分類 ===== */}
                <div className="md:hidden space-y-4 mb-8">

                  {mainCategories.map(main => {

                    const key = main.category_key;

                    const label =
                      lang === "en"
                        ? main.en
                        : main.zh;

                    const isActive =
                      active === key;

                    const children =
                      childCategories.filter(
                        c => c.parent_key === key
                      );




                    return (

                      <div
                        key={key}
                        className="space-y-2"
                      >

                        {/* 主分類 */}

                        <button
                          onClick={() => {

                            setExpanded(prev => ({
                              ...prev,
                              [key]: !prev[key]
                            }));

                            setActive(key);

                            setSearchParams(prev => {
                              prev.set("type", key);
                              prev.set("page", 1);
                              return prev;
                            });

                          }}
                          className={`
          flex
          items-center
          gap-2
          w-full
          text-left
          text-[13px]
          transition
          ${isActive
                              ? "text-[#C8A46A]"
                              : "text-[#666] hover:text-[#C8A46A]"
                            }
        `}
                        >

                          <span className="w-[14px]">
                            {children.length
                              ? expanded[key]
                                ? "▾"
                                : "▸"
                              : "▸"}
                          </span>

                          <span>
                            {label}
                          </span>

                        </button>

                        {/* 子分類 */}

                        {children.length > 0 &&
                          expanded[key] && (

                            <div className="ml-6 space-y-2">

                              {children.map(child => {

                                const grandChildren =
                                  grandChildCategories.filter(
                                    g => g.parent_key === child.category_key
                                  );

                                return (

                                  <div key={child.category_key}>

                                    {/* 子分類 */}

                                    <button
                                      onClick={() => {

                                        setActive(child.category_key);

                                        setSearchParams(prev => {
                                          prev.set("type", child.category_key);
                                          prev.set("page", 1);
                                          return prev;
                                        });

                                      }}
                                      className={`
              block
              w-full
              text-left
              text-[12px]
              transition
              ${active === child.category_key
                                          ? "text-[#C8A46A]"
                                          : "text-[#666] hover:text-[#C8A46A]"
                                        }
            `}
                                    >

                                      {lang === "en"
                                        ? child.en
                                        : child.zh}

                                    </button>

                                    {/* ===== 孫分類 ===== */}

                                    {grandChildren.length > 0 && (

                                      <div className="ml-5 mt-2 space-y-2">

                                        {grandChildren.map(g => (

                                          <button
                                            key={g.category_key}
                                            onClick={() => {

                                              setActive(g.category_key);

                                              setSearchParams(prev => {
                                                prev.set("type", g.category_key);
                                                prev.set("page", 1);
                                                return prev;
                                              });

                                            }}
                                            className={`
                    block
                    w-full
                    text-left
                    text-[11px]
                    transition
                    ${active === g.category_key
                                                ? "text-[#C8A46A]"
                                                : "text-[#999] hover:text-[#C8A46A]"
                                              }
                  `}
                                          >

                                            {lang === "en"
                                              ? g.en
                                              : g.zh}

                                          </button>

                                        ))}

                                      </div>

                                    )}

                                  </div>

                                );

                              })}

                            </div>

                          )}

                      </div>

                    );

                  })}

                </div>

      


              {/* ===== 搜尋 ===== */}
              <div className="flex justify-center md:justify-end mb-12">

                <div className="relative w-full max-w-[240px]">

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
          text-[13px]
          text-[#111]
          placeholder:text-[#bbb]
          bg-transparent
          outline-none
          focus:border-black
          transition
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

              {/* ===== GRID ===== */}
              <section className="space-y-10">

                {currentData.length === 0 && (
                  <div className="text-center text-[#aaa] py-40 tracking-[0.2em]">
                    {lang === "en"
                      ? "NO RESULTS"
                      : "查無符合結果"}
                  </div>
                )}
                {/* ===== 手機版（🔥一格一格） ===== */}
                <div className="md:hidden space-y-3 sm:space-y-8">

                  {currentData.map((p) => {

                    const title = lang === "en" ? p.title_en : p.title_zh;




                    return (
                      <Link
                        key={p.id}
                        to={`/${lang}/projects/${p.slug}`}
                        className="block"
                      >

                        <div className="bg-white p-2 rounded-md shadow-sm">

                          <div className="relative aspect-[1/1] overflow-hidden group shadow-sm">

                            <img
                              src={
                                p.cover
                                  ? p.cover
                                  : p.images?.[0]?.src
                              }
                              className="
    w-full h-full
    object-cover

  object-center

  transition duration-700
  group-hover:scale-[1.03]
"
                            />

                            {/* 🔥 這段補回來 */}
                            <div
                              className="
    absolute inset-0

    bg-gradient-to-t
from-black/55
via-black/[0.18]
to-transparent

    opacity-90
  "
                            />

                            <div className="absolute bottom-6 left-6 text-white">

                              <p className="
  inline-block

  text-[11px]

  tracking-[0.35em]

  text-[#D6B278]

  mb-1

  drop-shadow-[0_2px_8px_rgba(0,0,0,1)]
">
                                {
                                  categories.find(
                                    c =>
                                      c.category_key ===
                                      (p.sub_category || p.category)
                                  )?.[
                                  lang === "en" ? "en" : "zh"
                                  ] || p.category
                                }
                              </p>

                              <h3 className="
  text-[15px]

  tracking-[0.08em]

  leading-[1.5]

  font-light

  text-white

  drop-shadow-[0_4px_18px_rgba(0,0,0,1)]

  max-w-[420px]
">
                                {title}
                              </h3>

                            </div>

                          </div>

                        </div>

                      </Link>
                    );
                  })}

                </div>
                <div className="hidden md:grid grid-cols-4 gap-x-5 gap-y-12">

                  {currentData.map((p) => {

                    const title =
                      lang === "en"
                        ? p.title_en
                        : p.title_zh;

                    return (

                      <Link
                        key={p.id}
                        to={`/${lang}/projects/${p.slug}`}
                        className="block"
                      >

                        <div className="relative aspect-[5/4] overflow-hidden group">

                          <img
                            src={
                              p.cover ||
                              (
                                typeof p.images?.[0] === "string"
                                  ? p.images[0]
                                  : p.images?.[0]?.src
                              )
                            }
                            className="
              w-full
              h-full
              object-cover
              object-center
              transition
              duration-700
              group-hover:scale-[1.03]
            "
                          />

                          <div
                            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/55
              via-black/[0.18]
              to-transparent
            "
                          />

                          <div className="absolute bottom-6 left-6 text-white">

                            <p className="
              text-[12px]
              tracking-[0.35em]
              text-[#D6B278]
              mb-1
              drop-shadow-[0_2px_8px_rgba(0,0,0,1)]
            ">
                              {
                                categories.find(
                                  c =>
                                    c.category_key ===
                                    (p.sub_category || p.category)
                                )?.[
                                lang === "en" ? "en" : "zh"
                                ] || p.category
                              }
                            </p>

                            <h3
                              className="
                text-[18px]
                leading-[1.5]
                tracking-[0.08em]
                font-light
                text-white
                drop-shadow-[0_4px_18px_rgba(0,0,0,1)]
              "
                            >
                              {title}
                            </h3>

                          </div>

                        </div>

                      </Link>

                    );

                  })}

                </div>

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
                      {lang === "en" ? "PREV" : "上一頁"}
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
                      {lang === "en" ? "NEXT" : "下一頁"}
                    </button>

                  </div>
                )}

              </section>   {/* GRID 結束 */}

            </div>       {/* flex-1 */}

          </div>       {/* flex-row */}

        </section>   {/* FILTER */}

      </div>       {/* CONTENT */}

    </div>

  );
}

