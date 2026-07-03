import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";

import useLang from "../hooks/useLang";

export default function News() {

const lang = useLang();
const navigate = useNavigate();

const [news, setNews] = useState([]);

useEffect(() => {


async function loadNews() {

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("sort_order");

  console.log("DATA", data);
  console.log("ERROR", error);

  if (error) {
    console.log(error);
    return;
  }

  setNews(data || []);
}

  loadNews();

}, []);


const hero = news.find(item => item.hero === true);
const list = news.filter(item => item.hero !== true);

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

     {hero?.video ? (

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
   src={hero.cover}
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

<h2
  className="
    text-[16px]
    md:text-[26px]
    tracking-[0.12em]
    mb-2
    drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)]
  "
>
  {lang === "en"
    ? hero.title_en
    : hero.title_zh}
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
  __html:
    lang === "en"
      ? hero.desc_en
      : hero.desc_zh
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
 key={item.id}
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
    src={item.cover}
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
     {lang === "en"
  ? item.title_en
  : item.title_zh}
    </h3>

<p
  className="
    text-[#5E5E5E]
    text-[12px]
    leading-relaxed
    mb-3
  "
  dangerouslySetInnerHTML={{
    __html:
  lang === "en"
    ? item.desc_en
    : item.desc_zh
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
