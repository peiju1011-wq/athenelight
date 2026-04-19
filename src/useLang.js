import { useState } from "react";

export default function useLang(){

  /* 🔥 直接初始化（關鍵） */
  const [lang] = useState(() => {
    return localStorage.getItem("lang") || "zh";
  });

  return lang;
}