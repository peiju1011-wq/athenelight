import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import useLang from "../hooks/useLang";

export default function MenuPortal({ menuOpen, setMenuOpen }){

  const lang = useLang();
  const location = useLocation();

  if (!menuOpen) return null;

  /* ===== 判斷是否英文路徑 ===== */
  const isEnglish = location.pathname.startsWith("/en");

  /* ===== 自動補路徑 ===== */
  const getPath = (path) => {
    return isEnglish ? `/en${path}` : path;
  };

  /* ===== 雙語選單🔥 ===== */
  const menuItems = [
    { to:"/projects", zh:"實績案例", en:"Projects" },
    { to:"/products", zh:"產品介紹", en:"Products" },
    { to:"/about", zh:"關於宇碩", en:"About" },
    { to:"/news", zh:"最新消息", en:"News" },
    { to:"/contact", zh:"聯絡我們", en:"Contact" }
  ];

  return createPortal(
    <>
      {/* ===== OVERLAY ===== */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-[9998]"
        onClick={() => setMenuOpen(false)}
      />

      {/* ===== MENU ===== */}
      <div className="
        fixed top-0 right-0 h-full w-72 bg-[#0a0a0a]/60 z-[9999]
        flex flex-col justify-center items-center
      ">

        <div className="flex flex-col space-y-10 text-center text-white tracking-widest uppercase text-sm">

          {menuItems.map((item, i)=>(

            <NavLink
              key={item.to}
              to={getPath(item.to)}
              onClick={()=>setMenuOpen(false)}
              className="
                opacity-0 translate-y-6
                animate-[fadeUp_0.6s_ease_forwards]
                hover:text-[#c9a25b]
                transition
              "
              style={{
                animationDelay: `${i * 0.08 + 0.2}s`
              }}
            >
              {lang === "en" ? item.en : item.zh}
            </NavLink>

          ))}

        </div>

      </div>
    </>,
    document.getElementById("menu-root")
  );
}