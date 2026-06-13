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

const darkPages = ["/products", "/projects", "/about", "/news", "/contact", "/lights", "/shop"];

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

<img
  src="/images/logo.svg"
  className="h-7 md:h-8 w-auto"
/>

<div className="flex flex-col leading-none">

  <span className="text-[16px] md:text-lg font-bold text-white">
    {isEnglish ? "Athene Light" : "宇碩光"}
  </span>

  <span
    className="
      hidden md:block
      text-[10px]
      tracking-[0.35em]
      uppercase
      text-white
      opacity-70
    "
  >
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
<div className="flex items-center gap-8 mr-20">

  {/* 語言切換 */}
{/* 語言切換 */}
<button
  onClick={toggleLang}
  className="
    text-[13px]
    md:text-[15px]

    tracking-[0.1em]

    text-white/80
    hover:text-[#C8A46A]

    transition-all
    duration-500
  "
>
  {isEnglish ? "中" : "EN"}
</button>

<Link
  to="/admin/login"
  aria-label="Login"
  className="
    relative
    group

    text-white/80
    hover:text-[#C8A46A]

    transition-all
    duration-500
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-[17px] h-[17px] md:w-[18px] md:h-[18px]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 20.118a7.5 7.5 0 0115 0"
    />
  </svg>

  <span
    className="
      absolute
      left-1/2
      top-[28px]

      -translate-x-1/2

      text-[10px]
      tracking-[0.18em]
      whitespace-nowrap

      text-[#C8A46A]

      opacity-0
      translate-y-1

      transition-all
      duration-300

      group-hover:opacity-100
      group-hover:translate-y-0
    "
  >
    {isEnglish ? "Login" : "登入"}
  </span>
</Link>





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
