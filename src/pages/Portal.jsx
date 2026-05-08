import { useEffect, useState } from "react";
import "../styles/portal.css";
import Brands from "../components/Brands";
import "../styles/animations.css";
import { Link } from "react-router-dom";
import useLang from "../hooks/useLang"
import { text } from "../data/text"
import products from "../data/products";

const slides = [
  "/images/hero/hero4.jpg",
  "/images/hero/hero6.jpg",
  "/images/hero/hero5.jpg"
];
export default function Portal() {

  const lang = useLang();

  const [playing2, setPlaying2] = useState(false); // 🔥 影片控制

  const [index, setIndex] = useState(0); // 🔥 slider

  const t = text;


  /* HERO SLIDER */


/*  背景控制 */
useEffect(() => {
  document.body.classList.add("home-bg");

  return () => {
    document.body.classList.remove("home-bg");
  };
}, []);

/* 🔥 輪播 */
useEffect(() => {
  const timer = setInterval(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, 5000);

  return () => clearInterval(timer);
}, []);

  /* REVEAL ANIMATION */

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();

  }, []);

  return (

    <div className="portal">

      {/* HERO */}
{/* HERO */}
<section className="hero relative h-screen overflow-hidden bg-black">

  {/* 🎬 VIDEO */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="
      absolute inset-0
      w-full h-full
      object-cover
      scale-[1.02]
    "
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

{/* 🔥 OVERLAY */}
<div className="
  absolute inset-0 z-[1]

  bg-gradient-to-b
  from-black/5
  via-black/15
  to-black/35
"/>

{/* ✨ CONTENT */}
<div className="
  relative z-10

  h-full

  flex flex-col
  justify-center
  items-center

  text-center
  text-white

  px-6
"/>
{/* HERO CONTENT */}
<div className="
  absolute inset-0 z-[5]

  flex flex-col
  items-center
  justify-center

  text-center
">

  {/* TITLE */}
  <div className="
    flex flex-col
    items-center
translate-y-[-11vh]
md:translate-y-[-3vh]
  ">

    {/* EN */}
    <div className="
      text-[22px]
      sm:text-[28px]
      md:text-[58px]

      font-[250]

      tracking-[0.26em]
      md:tracking-[0.48em]

      uppercase
      leading-[1.2]

      text-white/90

      whitespace-nowrap

      drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]
    ">
      ATHENE LIGHT
    </div>

    {/* 金線 */}
    <div className="
      w-[56px]
      md:w-[72px]

      h-[1px]

      bg-[#C8A46A]

      mt-6
      md:mt-8

      mb-5
      md:mb-7

      opacity-70
    "/>

    {/* ZH */}
    <div className="
      text-[11px]
      md:text-[12px]

      tracking-[0.32em]
      md:tracking-[0.42em]

      text-white/78

      font-light

      drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]
    ">
      {lang === "en"
        ? "Light, leaving warmth in space."
        : "光。為空間留下溫度"}
    </div>

  </div>

  {/* SOCIAL */}
  <div className="
    absolute
    bottom-[78px]
    md:bottom-10

    left-1/2
    -translate-x-1/2

    flex gap-7
    items-center
  ">

    {/* FB */}
    <a
      href="https://www.facebook.com/athenetech/?locale=zh_TW"
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-white/46
        hover:text-white

        transition
        duration-300
      "
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.9 0-4.9 1.8-4.9 5.15v2.9H5v3.7h3.15V24h3.9v-7.2h3.05l.5-3.7h-3.55v-2.55c0-1.05.3-2.05 1.95-2.05Z" />
      </svg>
    </a>

    {/* LINE */}
    <a
      href="https://oashop.line.me/shops/706hatrq"
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-white/46
        hover:text-white

        transition
        duration-300
      "
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4C7.6 4 4 6.85 4 10.35c0 3.15 2.85 5.8 6.7 6.3L12 20l2.15-3.25C17.5 16.1 20 13.55 20 10.35 20 6.85 16.4 4 12 4Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    </a>

    {/* MAIL */}
    <Link
      to="/contact"
      className="
        text-white/46
        hover:text-white

        transition
        duration-300
      "
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6.5h16v11H4v-11Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 7l7.5 6 7.5-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>

  </div>

</div>

</section>

<div className="max-w-[900px] mx-auto px-6 mt-10">

  {/* SEO（雙語隱藏標題🔥） */}
  <h1 className="sr-only">
    {lang === "en"
      ? "ATHENE LIGHT | Architectural Lighting Design"
      : "宇碩光 ATHENE LIGHT 建築照明設計"}
  </h1>

  {/* 內文 */}
  <p className="
    text-[13px]
    leading-[1.9]
    text-[#8f8a84]
    text-center
    tracking-[0.08em]
    opacity-70
  ">
    {lang === "en"
  ? "ATHENE LIGHT specializes in architectural lighting, landscape lighting, commercial space lighting, and lighting environment design, providing integrated solutions for facade lighting, linear lighting, wall washer lighting, stretch ceiling lighting, and lighting festival projects."
  : "宇碩光 ATHENE LIGHT 專注於建築照明、景觀照明、商業空間照明與光環境設計，提供外牆照明、條燈、線燈、洗牆燈、光膜與燈會工程整合服務。"}
  </p>

</div>


<section className="relative bg-[#f3f0ec] py-40">

  <div className="
    max-w-[1200px] mx-auto px-6
    grid md:grid-cols-[1.1fr_0.9fr] 
    gap-16 items-center
  ">

    {/* ===== IMAGE ===== */}
    <div className="reveal delay-1 flex justify-end">

      <div className="w-full max-w-[420px]">
        <div className="relative overflow-hidden">

          <img
            src="/images/about/about.png"
            className="w-full object-cover scale-[1.0]"
          />

          {/* 柔光 */}
          <div className="
            absolute inset-0
            bg-gradient-to-t 
            from-white/20 
            via-white/10 
            to-transparent
          "/>

        </div>
      </div>

    </div>


    {/* ===== TEXT ===== */}
    <div className="reveal delay-2 flex">

      <div className="max-w-[460px]">

        {/* TAG */}
        <p className="about-tag mb-6">
          {t?.about?.tag?.[lang]}
        </p>

        {/* CONTENT */}
        <p className="
          about-desc 
          whitespace-pre-line 
          leading-[2.1] 
          text-[#555] 
          mb-14
        ">
          {t?.about?.content?.[lang]}
        </p>

        {/* CTA */}
        <Link
          to="/about"
          className="
            inline-block
            text-[11px]
            tracking-[0.35em]
            text-[#222]
            relative
            pb-2
            group
          "
        >
          {lang === "en" ? "EXPLORE MORE" : "探索更多"}

          <span className="
            absolute left-0 bottom-0
            w-[20px] h-[1px]
            bg-[#C8A46A]
            transition-all duration-500
            group-hover:w-full
          "/>
        </Link>

      </div>

    </div>

  </div>

</section>


{/* BANNER */}

<section className="banner banner-animate relative overflow-hidden mb-[120px]">



  {/* ⭐ 影片 */}
  <video
    autoPlay
    loop
    muted
    playsInline
    onLoadedData={(e)=>{
      e.target.classList.add("video-ready");
    }}
    className="banner-video"
  >
    <source src="/images/banner/banner3.mp4" type="video/mp4" />
  </video>

  {/* ⭐ 遮罩 */}
  <div className="banner-overlay"></div>

  {/* ⭐ 內容 */}
<div className="banner-content">

  <h2>
    {lang === "en"
      ? "Architectural Lighting"
      : "建築照明"}
  </h2>

  <p className="banner-keywords">
    {lang === "en"
      ? "Lighting Environment · Commercial Lighting · Landscape Lighting"
      : "光環境設計｜商業照明｜景觀照明"}
  </p>

</div>

</section>




<Brands type="services" />



<section className="py-5 bg-[#f3f0ec]">

  <div className="max-w-[1200px] mx-auto px-6">

    {/* TITLE */}
    <div className="text-center mb-12 reveal">

      <p className="text-[#C8A46A] tracking-[0.45em] text-[11px] mb-4">
        {t?.projects?.tag?.[lang]}
      </p>

      <h2 className="text-[26px] md:text-[34px] tracking-[0.08em] text-[#222]">
        {t?.projects?.title?.[lang]}
      </h2>

      <div className="w-12 h-[1px] mx-auto mt-6 
        bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent"/>
    </div>


    {/* GRID */}
    <div className="grid md:grid-cols-3 gap-8 items-end mb-20">

      {/* BIG */}
      <div className="md:col-span-2 group relative overflow-hidden bg-white reveal h-[340px]">

        <img src="/images/projects/project1.png"
          className="w-full h-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />

        {/* 遮罩 */}
       <div className="
  absolute inset-0
  bg-gradient-to-t
  from-black/40
  via-black/10
  to-transparent
  transition duration-500
"/>

        {/* 文字 */}
        <div className="absolute bottom-6 left-6 z-10">
          <p className="text-[10px] tracking-[0.35em] text-[#C8A46A] mb-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            PROJECT 01
          </p>
          <h3 className="text-[14px] tracking-[0.2em] font-light text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            {t?.projects?.items?.[0]?.[lang]}
          </h3>
        </div>

      </div>


      {/* SMALL */}
      <div className="group relative overflow-hidden bg-white reveal h-[260px] md:mb-[-60px]">

        <img src="/images/projects/project2.png"
          className="w-full h-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />

        <div className="
  absolute inset-0
  bg-gradient-to-t
  from-black/40
  via-black/10
  to-transparent
  transition duration-500
"/>

        <div className="absolute bottom-6 left-6 z-10">
          <p className="text-[10px] tracking-[0.35em] text-[#C8A46A] mb-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            PROJECT 02
          </p>
          <h3 className="text-[14px] tracking-[0.2em] font-light text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            {t?.projects?.items?.[1]?.[lang]}
          </h3>
        </div>

      </div>

    </div>


    {/* ROW 2 */}
    <div className="grid md:grid-cols-3 gap-8 items-start">

      {[2,3,4].map((i,idx)=>{

        const offset = [
          "md:mt-[-60px]",
          "",
          "md:mt-[40px]"
        ]

        return(
          <div
            key={i}
            className={`group relative overflow-hidden bg-white reveal h-[260px] ${offset[idx]}`}
          >

            <img src={`/images/projects/project${i+1}.png`}
              className="w-full h-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />

            <div className="
  absolute inset-0
  bg-gradient-to-t
  from-black/40
  via-black/10
  to-transparent
  transition duration-500
"/>

            <div className="absolute bottom-6 left-6 z-10">
              <p className="text-[10px] tracking-[0.35em] text-[#C8A46A] mb-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                PROJECT {String(i+1).padStart(2,"0")}
              </p>
              <h3 className="text-[14px] tracking-[0.2em] font-light text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                {t?.projects?.items?.[i]?.[lang]}
              </h3>
            </div>

          </div>
        )

      })}

    </div>


    {/* VIEW ALL */}
<div className="text-right mt-16">
  <Link
    to="/projects"
    className="text-[11px] tracking-[0.35em] text-[#222] border-b border-[#C8A46A] pb-1 hover:opacity-60 transition"
  >
    {lang === "zh" ? "查看全部案例" : "VIEW ALL PROJECTS"}
  </Link>
</div>

  </div>

</section>



<section className="py-20 bg-[#f3f0ec]">

  <div className="max-w-[1200px] mx-auto px-6">

    {/* TITLE */}
    <div className="text-center mb-14 reveal">

      <p className="
        text-[#C8A46A]
        tracking-[0.45em]
        text-[10px]
        mb-5
        opacity-80
      ">
        {t?.productsHome?.tag?.[lang]}
      </p>

      <h2 className="
        text-[28px] md:text-[36px]
        tracking-[0.08em]
        text-[#222]
        font-light
      ">
        {t?.productsHome?.title?.[lang]}
      </h2>

      <div className="
        w-14 h-[1px]
        mx-auto mt-7
        bg-gradient-to-r
        from-transparent
        via-[#C8A46A]
        to-transparent
        opacity-70
      "/>

    </div>


{/* GRID（倒排版🔥） */}

{/* ROW 1 */}
<div className="grid md:grid-cols-3 gap-8 items-end mb-20">

  {/* 小（左） */}
  <div className="group relative overflow-hidden bg-white reveal h-[260px] md:mt-[40px]">

<img
  src={products[1]?.img}
  className="w-full h-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
/>


    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>

 <h3 className="absolute bottom-6 left-6 text-[13px] tracking-[0.25em] text-white font-light z-10">
  {products[1]?.title?.[lang]}
</h3>

  </div>


  {/* 大（右） */}
  <div className="md:col-span-2 group relative overflow-hidden bg-white reveal h-[340px]">

<img
  src={products[0]?.img}
  className="w-full h-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
/>

    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>

<h3 className="absolute bottom-6 left-6 text-[13px] tracking-[0.25em] text-white font-light z-10">
  {products[0]?.title?.[lang]}
</h3>

  </div>

</div>

{/* ROW 2（上坡版🔥） */}
<div className="grid md:grid-cols-3 gap-8 items-start">

{[2,3,4].map((i,idx)=>{

  const offset = [
    "md:mt-[40px]",
    "",
    "md:mt-[-60px]"
  ]

  return(
    <div
      key={i}
      className={`group relative overflow-hidden bg-white reveal h-[260px] ${offset[idx]}`}
    >

      <img
        src={products[i]?.img}
        className="w-full h-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>

      <h3 className="absolute bottom-6 left-6 text-[13px] tracking-[0.25em] text-white font-light z-10">
        {products[i]?.title?.[lang]}
      </h3>

    </div>
  )

})}

</div>

    {/* VIEW ALL */}
<div className="text-right mt-16">
  <Link
    to="/products"
    className="
      text-[11px]
      tracking-[0.35em]
      text-[#222]
      border-b border-[#C8A46A]
      pb-1
      hover:opacity-60
      transition
    "
  >
    {t?.productsHome?.viewAll?.[lang]}
  </Link>
</div>

  </div>

</section>


<Brands type="process" />


    </div>

  );

}
