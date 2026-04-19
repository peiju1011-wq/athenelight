import { useLocation } from "react-router-dom";

export default function useLang(){
  const location = useLocation();
  const path = location.pathname;

  // 🔥 ① URL 優先（最重要）
  if (path.startsWith("/en")) return "en";
  if (path.startsWith("/zh")) return "zh";

  // 🔥 ② localStorage（只接受合法值）
  const saved = localStorage.getItem("lang");
  if (saved === "en" || saved === "zh") return saved;

  // 🔥 ③ 瀏覽器語言（fallback）
  const browserLang = navigator.language.toLowerCase();

  return browserLang.includes("zh") ? "zh" : "en";
}