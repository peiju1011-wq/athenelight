import useLang from "../hooks/useLang";
import { text } from "../data/text";
import { useState } from "react";
import newsData from "../data/newsData";
export default function News() {

  const lang = useLang();
const [viewer, setViewer] = useState(null);
  /* ===== 資料（雙語🔥） ===== */
const news = newsData;



  const hero = news.find(n => n.hero);
  const list = news.filter(n => !n.hero);

  return (
    <main className="bg-[#f7f7f7] pt-[140px] pb-32 min-h-screen">

      <div className="max-w-[1100px] mx-auto px-6">

        {/* ================= HEADER ================= */}
        <section className="mb-20 text-center">

          <p className="text-[#C8A46A] tracking-[0.45em] text-[24px] mb-3">
            {lang === "en" ? "LATEST NEWS" : "最新消息"}
          </p>

          <h1 className="text-[26px] md:text-[34px] tracking-[0.08em] text-[#222]">
            {text?.news?.title?.[lang]}
          </h1>

          <div className="w-12 h-[1px] mx-auto mt-6 bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent"></div>

        </section>


        {/* ================= HERO ================= */}
{hero && (
  <section className="mb-24">

    <div
      onClick={() => setViewer(hero)}
      className="block cursor-pointer"
    >

      <div className="relative overflow-hidden group">

        <img
          src={hero.img}
          alt=""
          className="w-full h-[260px] md:h-[420px] object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        <div className="absolute bottom-6 left-6 md:left-10 text-white max-w-[480px]">

          <h2 className="text-[16px] md:text-[26px] tracking-[0.12em] mb-2">
            {hero.title?.[lang]}
          </h2>

          <p className="text-white/70 text-[12px] mb-3">
            {hero.desc?.[lang]}
          </p>

          <span className="text-[#C8A46A] text-[11px] tracking-[0.25em]">
            {lang === "en" ? "VIEW MORE" : "查看更多"}
          </span>

        </div>

      </div>

    </div>

  </section>
)}



        {/* ================= GRID ================= */}
        <section>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {list.map((item, i) => (
<div
  key={i}
  onClick={() => setViewer(item)}
  className="group overflow-hidden block cursor-pointer"
>

  <div className="overflow-hidden">
    <img
      src={item.img}
      alt=""
      className="w-full h-[200px] object-cover transition duration-700 group-hover:scale-105"
    />
  </div>

  <div className="pt-4">

<h3 className="
  text-[15px]
  tracking-[0.08em]
  text-[#1A1A1A]
  mb-2
">
      {item.title?.[lang]}
    </h3>

   <p className="
  text-[#5E5E5E]
  text-[12px]
  leading-relaxed
  mb-3
">
      {item.desc?.[lang]}
    </p>

    <span className="text-[#C8A46A] text-[11px] tracking-[0.25em] group-hover:opacity-60">
      {lang === "en" ? "VIEW" : "查看"}
    </span>

  </div>

</div>

            ))}

          </div>

        </section>


        {/* ================= FOOTER ================= */}
        <section className="mt-28 text-center">

          <p className="text-[12px] text-[#999] tracking-[0.2em]">
            {lang === "en"
              ? "MORE STORIES COMING SOON"
              : "更多內容即將推出"}
          </p>

        </section>

      </div>

{viewer && (
  <div
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-6"
    onClick={() => setViewer(null)}
  >

    <div
      className="max-w-[900px] w-full"
      onClick={(e) => e.stopPropagation()}
    >

      {/* 關閉按鈕 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setViewer(null)}
          className="text-white text-2xl"
        >
          ×
        </button>
      </div>

{viewer.link && !viewer.blocked ? (

  <div
    className={
      viewer.type === "vertical"
        ? "w-full max-w-[400px] mx-auto mb-6"
        : "w-full mb-6"
    }
  >
    <iframe
      src={viewer.link}
      className={
        viewer.type === "vertical"
          ? "w-full aspect-[9/16] rounded-xl"
          : "w-full aspect-video rounded-xl"
      }
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  </div>

) : viewer.link ? (

  <a
    href={viewer.link}
    target="_blank"
    className="block text-center text-white/80 underline mb-6"
  >
    {lang === "en" ? "Watch on Facebook" : "前往 Facebook 觀看"}
  </a>

) : (

  <img
    src={viewer.img}
    className="w-full max-h-[70vh] object-contain rounded-xl mb-6"
  />

)}

      <h3 className="text-white text-center mb-2 text-[18px] tracking-[0.08em]">
        {viewer.title?.[lang]}
      </h3>

      <p className="text-white/70 text-center text-sm mb-6">
        {viewer.desc?.[lang]}
      </p>

      {viewer.link && (
        <a
          href={viewer.link}
          target="_blank"
          className="block text-center text-[#C8A46A] text-sm"
        >
          {lang === "en" ? "VIEW FULL VIDEO" : "觀看完整影片"}
        </a>
      )}

    </div>

  </div>
)}



    </main>
  );
}
