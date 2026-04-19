import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import MenuPortal from "./MenuPortal";

export default function SiteHeader(){

  const [scrolled,setScrolled] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* ===== 語言判斷 ===== */
  const isEnglish = location.pathname.startsWith("/en");

  /* ===== 語言切換 ===== */
const toggleLang = () => {
const cleanPath = location.pathname.replace(/^\/(en|zh)/, "");

  if (isEnglish) {
    navigate(cleanPath || "/");
  } else {
    navigate("/en" + cleanPath);
  }
};

  /* ===== NAV path ===== */
  const getPath = (path) => {
    return isEnglish ? `/en${path}` : path;
  };

  /* ===== 深色頁 ===== */
const cleanPath = location.pathname.replace(/^\/(en|zh)/, "");

const darkPages = ["/products", "/projects", "/about", "/news", "/contact", "/lights"];

const isDarkPage = darkPages.some(path =>
  cleanPath.startsWith(path)
);

  /* ===== scroll ===== */
  useEffect(()=>{
    const handleScroll = ()=> setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  /* ===== 鎖 body ===== */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ===== 換頁關閉 menu ===== */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return(
    <>
<header
  className={`
  fixed top-0 left-0 w-full z-[999]
  transition-all duration-500

  ${
  menuOpen
    ? "h-[80px] bg-[#3f3f3f]/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
    : isDarkPage
      ? "h-[80px] bg-[#3f3f3f]/90 backdrop-blur-md"
      : scrolled
        ? "h-[80px] bg-[#3f3f3f]/75 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
        : "h-[80px] bg-transparent"
  }
  `}
>

<div className="relative w-full h-full flex items-center justify-between">

  {/* LOGO */}
  <Link to={isEnglish ? "/en" : "/"} className="flex items-center gap-3 z-10 ml-6 md:ml-[70px]">

    <img src="/images/logo.svg" className="h-8 w-auto"/>

    <div className="flex flex-col leading-none">

      <span className="text-lg font-bold text-white">
        {isEnglish ? "Athene Light" : "宇碩光"}
      </span>

      <span className="text-[10px] tracking-[0.35em] uppercase text-white opacity-70">
        {isEnglish ? "LIGHTING DESIGN" : "ATHENE LIGHT"}
      </span>

    </div>

  </Link>

  {/* NAV */}
  <nav className="hidden md:flex items-center space-x-10 text-sm tracking-[1.4px] uppercase text-white absolute left-1/2 -translate-x-1/2">

    {[

      {to:"/projects", zh:"實績案例", en:"Projects"},
      {to:"/products", zh:"產品介紹", en:"Products"},
      {to:"/about", zh:"關於宇碩", en:"About"},
      {to:"/news", zh:"最新消息", en:"News"},
      {to:"/contact", zh:"聯絡我們", en:"Contact"}
    ].map((item)=>(

      <NavLink
        key={item.to}
        to={getPath(item.to)}
        className={({ isActive }) => `
        group relative transition-colors duration-300 hover:text-[#e3c198]

        after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[0.5px]
        after:bg-[#e3c198]/40 after:w-0 after:transition-all

        group-hover:after:w-full
        ${isActive ? "text-[#e3c198] after:w-full" : ""}
        `}
      >
        {isEnglish ? item.en : item.zh}
      </NavLink>

    ))}

  </nav>

  {/* 右側 */}
<div className="flex items-center gap-6 mr-20">

  {/* 語言切換 */}
  <button
    onClick={toggleLang}
    className="
      relative text-[13px]
      tracking-[0.25em]
      text-white/70
      hover:text-white
      transition-all duration-300
      group
    "
  >
    {isEnglish ? "中" : "EN"}

    {/* 底線（主效果🔥） */}
    <span className="
      absolute left-0 bottom-[-4px]
      w-0 h-[1px]
      bg-[#e3c198]
      transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
      group-hover:w-full
    "/>

    {/* 微光（高級感🔥） */}
<span className="
  absolute inset-0
  opacity-0
  group-hover:opacity-100
  transition duration-500

  text-[#C8A46A]
  tracking-[0.3em]

  after:content-['']
  after:absolute
  after:left-0
  after:bottom-[-6px]
  after:w-0
  after:h-[2px]
  after:bg-[#C8A46A]
  after:transition-all
  after:duration-500
  after:ease-[cubic-bezier(0.22,1,0.36,1)]

  group-hover:after:w-full
">
  {isEnglish ? "中" : "EN"}
</span>

  </button>



    {/* 手機 menu */}
    <button
      onClick={()=>setMenuOpen(prev => !prev)}
className={`
  md:hidden
  z-[9999]
  shrink-0
  transition
  -mr-10
  ${scrolled || isDarkPage || menuOpen ? "text-white" : "text-white/80"}
`}
    >
      <svg width="26" height="20" viewBox="0 0 24 24">

        <line x1="3" y1="6" x2="21" y2="6"
          stroke="currentColor" strokeWidth="1.8"
          className={`transition-all duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
        />

        <line x1="3" y1="12" x2="21" y2="12"
          stroke="currentColor" strokeWidth="1.8"
          className={`transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
        />

        <line x1="3" y1="18" x2="21" y2="18"
          stroke="currentColor" strokeWidth="1.8"
          className={`transition-all duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
        />

      </svg>
    </button>

  </div>

</div>
</header>

<MenuPortal menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

    </>
  );
}