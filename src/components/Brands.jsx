import { useEffect } from "react";
import useLang from "../hooks/useLang";
import { text } from "../data/text";

export default function Brands({ type = "process" }){

  const lang = useLang();
  const t = text;

useEffect(() => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

      // 👉 只播一次（標題）
      if (entry.target.classList.contains("reveal-once")) {
        if (entry.isIntersecting && !entry.target.classList.contains("played")) {
          entry.target.classList.add("show", "played");
        }
        return;
      }

      // 👉 可重播（圓）
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }

    });
  }, { threshold: 0.15 });

  const sections = document.querySelectorAll(".circle-section");

  sections.forEach(section => {
    const elements = section.querySelectorAll(".reveal");
    elements.forEach(el => observer.observe(el));
  });

  return () => observer.disconnect();

}, []);

  return (
<section className="circle-section overflow-hidden bg-[#f3f0ec] pt-[10px] pb-[120px]">

  <div className="max-w-[1100px] mx-auto px-6">

    {/* ===== TITLE（不動🔥） */}
    <div className="text-center mb-32 reveal reveal-once">

      <p className="text-[#C8A46A] tracking-[0.45em] text-[11px] mb-4">
        {t?.[type]?.tag?.[lang]}
      </p>

      <h2 className="text-[26px] md:text-[34px] tracking-[0.08em] text-[#222]">
        {t?.[type]?.title?.[lang]}
      </h2>

      <div className="w-12 h-[1px] mx-auto mt-6 
        bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent"/>
    </div>


    {/* ===== FLOW（保留錯位🔥） */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-20 text-center -mt-[50px]">

      {t?.[type]?.items?.map((item,i)=>(

        <div
          key={i}
          className="group service-circle"
          style={{
            transform: i % 2 === 0
              ? "translateY(-20px)"
              : "translateY(20px)"
          }}
        >

          {/* 🔥 圓（唯一動畫） */}
          <div
            className="circle-wrap reveal"
            style={{
              transitionDelay:`${i * 0.1}s`
            }}
          >
            <div className="circle">
              <span className="circle-num">
                {String(i+1).padStart(2,"0")}
              </span>
            </div>
          </div>

          {/* 標題 */}
          <h3 className="mt-8 text-[#222] tracking-[0.15em] text-[14px] font-light">
            {type === "process"
              ? item?.title?.[lang]
              : item?.[lang]
            }
          </h3>

          {/* 線 */}
          <div className="w-10 h-[1px] mx-auto mt-5 mb-6 
            bg-gradient-to-r from-[#E0B97A] via-[#C8A46A] to-transparent 
            opacity-60 group-hover:opacity-100 transition duration-500"/>

          {/* 文字 */}
          <p className="text-[#666] text-[13px] leading-[1.9] px-2">
            {type === "process"
              ? item?.desc?.[lang]
              : t?.services?.desc?.[lang]
            }
          </p>

        </div>

      ))}

    </div>

  </div>

</section>
  );
}