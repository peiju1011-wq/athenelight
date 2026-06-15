import { useEffect, useState } from "react";
import "../styles/portal.css";
import Brands from "../components/Brands";
import "../styles/animations.css";
import { Link } from "react-router-dom";
import useLang from "../hooks/useLang"
import { text } from "../data/text"
import products from "../data/products";


export default function Portal() {

  const lang = useLang();



  const [index, setIndex] = useState(0); // 🔥 slider

  const t = text;



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
<section className="hero relative h-screen overflow-hidden bg-black">

  {/* 🎬 VIDEO */}
<video
  autoPlay
  muted
  loop
  playsInline

  poster="/images/hero-poster.png"

  preload="metadata"

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
  via-black/10
  to-black/35
"/>

{/* ✨ CONTENT */}
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

    translate-y-[19vh]
    md:translate-y-[25vh]
  ">

    {/* EN */}
    <div className="
     text-[20px]
sm:text-[30px]
md:text-[40px]

      font-[250]

      tracking-[0.72em]
      md:tracking-[0.48em]

      uppercase
      leading-[1.15]

      text-white/90

      whitespace-nowrap

      drop-shadow-[0_2px_18px_rgba(0,0,0,0.42)]
    ">
      ATHENE LIGHT
    </div>

    {/* 金線 */}
    <div className="
      w-[23px]
      md:w-[23px]

      h-[2px]

      bg-[#C8A46A]

      mt-5
      md:mt-8

      mb-4
      md:mb-7

      opacity-45
    "/>

    {/* ZH */}
    <div className="
      text-[12px]
      md:text-[12px]

      tracking-[0.7em]
      md:tracking-[0.6em]

      text-white/76

      font-light

      drop-shadow-[0_2px_10px_rgba(0,0,0,0.32)]
    ">
      {lang === "en"
        ? "Light, leaving warmth in space."
        : "光。為空間留下溫度"}
    </div>

  </div>

{/* SOCIAL */}
<div className="
  absolute

  bottom-[138px]
  md:bottom-20

  left-1/2
  -translate-x-1/2

  flex gap-8
  items-center
">

  {/* FB */}
  <a
    href="https://www.facebook.com/athenetech/?locale=zh_TW"
    target="_blank"
    rel="noopener noreferrer"
    className="
      text-white/22
      hover:text-white/58

      hover:scale-105

      transition-all
      duration-500
      ease-out
    "
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.9 0-4.9 1.8-4.9 5.15v2.9H5v3.7h3.15V24h3.9v-7.2h3.05l.5-3.7h-3.55v-2.55c0-1.05.3-2.05 1.95-2.05Z" />
    </svg>
  </a>

{/* LINE */}
<a
  href="https://lin.ee/onasjh1n"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="ATHENE LIGHT Official LINE"
  className="
    text-white/22
    hover:text-white/58

    hover:scale-105

    transition-all
    duration-500
    ease-out
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
      text-white/22
      hover:text-white/58

      hover:scale-105

      transition-all
      duration-500
      ease-out
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
  ? "ATHENE LIGHT specializes in architectural lighting, landscape illumination, commercial spaces, and integrated lighting environments, providing custom lighting fixtures, stretch ceiling lighting, linear lighting systems, and lighting festival installations."
  : "宇碩光電專注於建築照明、景觀照明、商業空間與光環境設計，提供客製燈具、光膜、條燈和燈會工程整合服務。"}
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

  <div className="w-full max-w-[440px]">

    <div className="
      relative
      overflow-hidden
      bg-[#e9e6e1]
    ">

      {/* IMAGE */}
      <img
        src="/images/about/about.png"
        className="
          w-full
          h-full
          object-cover

          scale-[1.06]
          object-[42%_50%]

          transition duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:scale-[1.09]
        "
      />

      {/* 深度遮罩 */}
      <div
        className="
          absolute inset-0

          bg-gradient-to-t
         from-black/48
via-black/[0.16]
to-transparent

          opacity-90
          pointer-events-none
        "
      />

      {/* 微暖光 */}
      <div
        className="
          absolute inset-0

          bg-[radial-gradient(circle_at_50%_38%,rgba(200,164,106,0.08),transparent_62%)]

          opacity-70
          pointer-events-none
        "
      />

    </div>

  </div>

</div>

    {/* ===== TEXT ===== */}
    <div className="reveal delay-2 flex">

      <div className="max-w-[460px]">

        {/* TAG */}
<div className="reveal delay-2 flex">

  <div className="
    w-full
    max-w-[720px]
    md:max-w-[620px]
  ">

    {/* TAG */}
    <p className="about-tag mb-7">
      {t?.about?.tag?.[lang]}
    </p>

    {/* CONTENT */}
    <div
      className="
        about-desc
    about-desc
whitespace-normal

        text-[15px]
        md:text-[16px]

        leading-[2.05]
        tracking-[0.01em]

        text-[#555]
        font-[300]

        break-words
      "
    >
      {t?.about?.content?.[lang]}
    </div>

  </div>

</div>

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

        <img
  src="/images/projects/p1-3.png"
  className="
    w-full h-full
    object-cover

    scale-[]
object-[50%_50%]
    transition duration-700
    ease-[cubic-bezier(0.22,1,0.36,1)]

    group-hover:scale-110
  "
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

           <img
  src={`/images/projects/project${i+1}.png`}
  className={`
    w-full h-full object-cover
    transition duration-700
    ease-[cubic-bezier(0.22,1,0.36,1)]
    group-hover:scale-105

    ${i === 2 ? "object-[50%_35%]" : ""}
    ${i === 3 ? "object-[50%_62%]" : ""}
    ${i === 4 ? "object-[50%_10%]" : ""}
  `}
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

  {/* 小（左） PRODUCT 01 */}
  <div className="group relative overflow-hidden bg-white reveal h-[260px] md:mt-[40px]">

    <img
      src={products[1]?.img}
      className="
        w-full h-full
        object-cover
        object-[50%_42%]
        scale-[1.03]
        brightness-[0.9]
        contrast-[1.06]
        saturate-[0.92]
        transition duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:scale-[1.08]
      "
    />

    <div
      className="
        absolute inset-0
        bg-gradient-to-t
        from-black/36
        via-black/[0.10]
        to-black/[0.02]
        opacity-95
      "
    />

    <div
      className="
        absolute inset-0
        bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.05),transparent_58%)]
        opacity-60
        mix-blend-mode:screen
      "
    />

    <div className="absolute bottom-6 left-6 z-10">

      <p
        className="
          text-[10px]
          tracking-[0.35em]
          text-[#C8A46A]
          mb-1
          drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]
        "
      >
        PRODUCT 01
      </p>

      <h3
        className="
          text-[13px]
          tracking-[0.25em]
          text-white
          font-light
          drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]
        "
      >
        {products[1]?.title?.[lang]}
      </h3>

    </div>

  </div>

  {/* 大（右） PRODUCT 02 */}
  <div className="md:col-span-2 group relative overflow-hidden bg-white reveal h-[340px]">

    <img
      src={products[0]?.img}
      className="
        w-full h-full
        object-cover
        object-[38%_19%]
        transition duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:scale-105
      "
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>

    <div className="absolute bottom-6 left-6 z-10">

      <p
        className="
          text-[10px]
          tracking-[0.35em]
          text-[#C8A46A]
          mb-1
          drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]
        "
      >
        PRODUCT 02
      </p>

      <h3
        className="
          text-[13px]
          tracking-[0.25em]
          text-white
          font-light
          drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]
        "
      >
        {products[0]?.title?.[lang]}
      </h3>

    </div>

  </div>

</div>

{/* ROW 2（上坡版🔥） */}
<div className="grid md:grid-cols-3 gap-8 items-start">

  {[2,3,4].map((i,idx)=>{

    const offset = [
      "md:mt-[40px]",
      "",
      "md:mt-[-60px]"
    ];

    const imageStyle = [

      `
      object-[50%_42%]
      scale-[1.03]
      brightness-[0.9]
      contrast-[1.06]
      saturate-[0.92]
      group-hover:scale-[1.08]
      `,

      `
      object-[50%_38%]
      scale-[1.04]
      brightness-[0.9]
      contrast-[1.08]
      saturate-[0.92]
      group-hover:scale-[1.08]
      `,

      `
      object-[50%_95%]
      scale-[1.03]
      brightness-[0.92]
      contrast-[1.04]
      saturate-[0.95]
      group-hover:scale-[1.05]
      `
    ];

    const overlayStyle = [

      `
      from-black/22
      via-black/[0.05]
      to-transparent
      opacity-85
      `,

      `
      from-black/26
      via-black/[0.04]
      to-transparent
      opacity-85
      `,

      `
      from-black/22
      via-black/[0.03]
      to-transparent
      opacity-85
      `
    ];

    return(

      <div
        key={i}
        className={`
          group
          relative
          overflow-hidden
          bg-white
          reveal
          h-[260px]
          ${offset[idx]}
        `}
      >

        {/* IMAGE */}
        <img
          src={products[i]?.img}
          className={`
            w-full
            h-full
            object-cover
            transition
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${imageStyle[idx]}
          `}
        />

        {/* OVERLAY */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-t
            ${overlayStyle[idx]}
          `}
        />

        {/* TEXT */}
        <div className="absolute bottom-6 left-6 z-10">

          <p
            className="
              text-[10px]
              tracking-[0.35em]
              text-[#C8A46A]
              mb-1
              drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]
            "
          >
            PRODUCT {String(i + 1).padStart(2,"0")}
          </p>

          <h3
            className="
              text-[13px]
              tracking-[0.25em]
              text-white
              font-light
              drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]
            "
          >
            {products[i]?.title?.[lang]}
          </h3>

        </div>

      </div>

    );

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
