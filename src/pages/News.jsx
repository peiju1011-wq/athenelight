import useLang from "../hooks/useLang";
import { text } from "../data/text";

import newsData from "../data/newsData";
import { useNavigate } from "react-router-dom";
export default function News() {

  const lang = useLang();

  /* ===== 資料（雙語🔥） ===== */
const news = newsData;
const navigate = useNavigate();


  const hero = news.find(n => n.hero);
  const list = news.filter(n => !n.hero);

  return (
    <main className="bg-[#f7f7f7] pt-[160px]  pb-32 min-h-screen">

      <div className="max-w-[1100px] mx-auto px-6">




        {/* ================= HERO ================= */}
{hero && (
  <section className="mb-24">

    <div
     onClick={() => {
  const prefix =
    lang === "en"
      ? "/en"
      : lang === "zh"
      ? "/zh"
      : "";

  navigate(`${prefix}/news/${hero.slug}`);
}}
      className="block cursor-pointer"
    >

      <div className="relative overflow-hidden group">

       {hero.video ? (

<video
  src={hero.video}
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  disablePictureInPicture
  className="w-full h-[260px] md:h-[420px] object-cover transition duration-700 group-hover:scale-105"
/>

) : (

  <img
    src={hero.img}
    alt=""
    className="w-full h-[260px] md:h-[420px] object-cover transition duration-700 group-hover:scale-105"
  />

)}

       <div
  className="
    absolute
    inset-0

    bg-gradient-to-r
    from-black/21
    via-black/35
    to-transparent
  "
></div>

<div
  className="
    absolute
    inset-0

    bg-gradient-to-t
    from-black/70
    via-black/10
    to-transparent
  "
></div>

        <div className="absolute bottom-6 left-6 md:left-10 text-white max-w-[480px]">

          <h2  className="
    text-[16px]
    md:text-[26px]
    tracking-[0.12em]
    mb-2
    drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)]
  ">
            {hero.title?.[lang]}
          </h2>

<p
  className="
    hidden
    md:block

    text-white/90
    text-[13px]
    leading-7
    mb-3

    drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]
  "
  dangerouslySetInnerHTML={{
    __html: hero.desc?.[lang]
  }}
/>

<span
  className="
    text-[#D8B678]
    text-[11px]
    tracking-[0.25em]
    transition-all
    duration-300
    group-hover:opacity-70
    drop-shadow-[0_2px_8px_rgba(0,0,0,1)]
  "
>
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
  onClick={() => {
    const prefix =
      lang === "en"
        ? "/en"
        : lang === "zh"
        ? "/zh"
        : "";

    navigate(`${prefix}/news/${item.slug}`);
  }}
  className="group overflow-hidden block cursor-pointer"
>

  <div className="overflow-hidden">
{item.video ? (

  <video
    src={item.video}
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-[200px] object-cover transition duration-700 group-hover:scale-105"
  />

) : (

  <img
    src={item.img}
    alt=""
    className="w-full h-[200px] object-cover transition duration-700 pointer-events-none group-hover:scale-105"
  />

)}
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

<p
  className="
    text-[#5E5E5E]
    text-[12px]
    leading-relaxed
    mb-3
  "
  dangerouslySetInnerHTML={{
    __html: item.desc?.[lang]
  }}
/>

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



  




    </main>
  );
}
