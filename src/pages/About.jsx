import { useRef, useState } from "react"
import useLang from "../hooks/useLang"

export default function About() {

  const lang = useLang()

  /* 🎬 影片1 */
  const videoRef1 = useRef(null)
  const [playing1, setPlaying1] = useState(false)

  const toggleVideo1 = () => {
    if (!videoRef1.current) return
    if (playing1) {
      videoRef1.current.pause()
      setPlaying1(false)
    } else {
      videoRef1.current.play()
      setPlaying1(true)
    }
  }

  /* 🎬 影片2 */
  const videoRef2 = useRef(null)
  const [playing2, setPlaying2] = useState(false)

  const toggleVideo2 = () => {
    if (!videoRef2.current) return
    if (playing2) {
      videoRef2.current.pause()
      setPlaying2(false)
    } else {
      videoRef2.current.play()
      setPlaying2(true)
    }
  }

  return (
    <div className="bg-[#f2f2f2] text-[#1a1a1a]">

      {/* ===== SECTION 1 ===== */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-20 pt-40">

        {/* ===== BRAND FILM ===== */}
<div className="space-y-14">

  {/* 標題 */}
<div className="flex items-center gap-5 mb-2">

  <span className="h-px w-10 bg-[#c8a46a] opacity-80"></span>

<h2 className="text-[15px] md:text-[17px] tracking-[0.45em] uppercase text-[#333] font-light">
    {lang === "en" ? "BRAND FILM" : "品牌影片"}
  </h2>

  <span className="flex-1 h-px bg-gradient-to-r from-[#c8a46a]/40 to-transparent"></span>

</div>

  {/* 影片 */}
  <div className="max-w-3xl mx-auto">

    <div 
      className="group relative aspect-video w-full overflow-hidden cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
      onClick={toggleVideo1}
    >

      {/*  封面圖（關鍵） */}
      {!playing1 && (
        <img
          src="/images/about/video-cover2.png" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/*  底部黑漸層（讓字清楚） */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />

      {/* 影片 */}
      <video
        ref={videoRef1}
        src="/images/about/about2.mp4"
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition duration-700 ${
          playing1 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 播放鍵 */}
      {!playing1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition">

            <div className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/40" />

            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#c8a47a] flex items-center justify-center shadow-[0_0_25px_rgba(200,164,106,0.6)]">
              <div className="border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-[2px]" />
            </div>

          </div>
        </div>
      )}

      {/*  文字（RWD 重點） */}
   <div className={`absolute bottom-6 md:bottom-8 left-5 md:left-8 text-white max-w-[85%] ${playing2 ? "hidden" : ""}`}>

        <h3 className="text-[16px] md:text-xl tracking-[0.08em] leading-[1.4]">
          {lang === "en"
            ? "Brand Film 2024: Poetry of Light"
            : "2024 年度品牌形象：光之詩"}
        </h3>

        <p className="text-white/80 mt-1 text-[12px] md:text-sm leading-[1.6]">
          {lang === "en"
            ? "Exploring how we blend architecture with light"
            : "探索我們如何將建築與自然光影融合"}
        </p>

      </div>

    </div>

  </div>

</div>

        {/* ===== PROJECT ===== */}
<div className="space-y-14">

  {/* 標題 */}
<div className="flex items-center gap-5 mb-2">

  {/* 左金線 */}
  <span className="h-px w-10 bg-[#c8a46a] opacity-80"></span>

  {/* 標題 */}
<h2 className="text-[15px] md:text-[17px] tracking-[0.45em] uppercase text-[#333] font-light">
    {lang === "en" ? "PROJECT SHOWCASE" : "實績展示"}
  </h2>

  {/* 右延伸線（這是關鍵✨） */}
 <span className="flex-1 h-px bg-gradient-to-r from-[#c8a46a]/40 to-transparent"></span>

</div>

  {/* 影片 */}
<div className="max-w-3xl mx-auto">

  <div 
    className="group relative aspect-video w-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
  >

    {/* 未播放：黑底 + 漸層 */}
    {!playing2 && (
      <>
        <img
  src="/images/about/video-cover.png"
  className="absolute inset-0 w-full h-full object-cover z-10"
/>
    {/* 🔥 底部加深（重點） */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 z-20" />
        </>
      )}


    {/* 播放後：YouTube */}
    {playing2 && (
      <iframe
        className="absolute inset-0 w-full h-full z-30"
        src="https://www.youtube.com/embed/SJa_bat1Qxw?autoplay=1&controls=1&rel=0"
        title="Athene Light Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )}

    {/* 播放按鈕 */}
    {!playing2 && (
      <div 
        className="absolute inset-0 flex items-center justify-center z-30 cursor-pointer"
        onClick={() => setPlaying2(true)}
      >
        <div className="relative w-20 h-20 flex items-center justify-center group-hover:scale-110 transition">

          <div className="absolute w-14 h-14 rounded-full border-2 border-white/40" />

          <div className="w-10 h-10 rounded-full bg-[#c8a47a] flex items-center justify-center shadow-[0_0_20px_rgba(200,164,106,0.5)]">
            <div className="border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-[2px]" />
          </div>

        </div>
      </div>
    )}

    {/* 文字 */}
     <div className={`absolute bottom-6 md:bottom-8 left-5 md:left-8 text-white z-30 max-w-[85%] ${playing2 ? "hidden" : ""}`}>

        <h3 className="text-[16px] md:text-xl tracking-[0.08em] leading-[1.4]">
          {lang === "en"
            ? "Featured Project: Private Residence"
            : "亮點工程案例：私人豪邸景觀"}
        </h3>

      <p className="text-white/70 mt-1 text-sm">
        {lang === "en"
          ? "From concept to completion"
          : "從設計規劃到完美落成的完整紀錄"}
      </p>

    </div>

  </div>

</div>


        </div>

      </section>
<section className="py-32 bg-[#f2f2f2]">

  <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

    {/* ===== 左側文字 ===== */}
    <div className="space-y-10">

      {/* 標題 */}
      <div>
        <h2 className="text-[38px] md:text-[46px] font-light tracking-[0.12em] text-[#111]">
          {lang === "en" ? "Our Story" : "宇碩光故事"}
        </h2>

        <p className="text-[#c8a46a] tracking-[0.3em] text-[12px] mt-3">
          THE STORY OF ATHENE LIGHT
        </p>

        <div className="w-12 h-px bg-[#c8a46a] mt-5"></div>
      </div>

      {/* 內文 */}
      <div className="space-y-6 text-[#666] leading-[1.9] text-[14px] max-w-[480px]">

<p>
  {lang === "en"
    ? "Over the past decade, we have focused on high-end architectural and landscape lighting projects. Every luminaire we develop and every design we refine reflects our pursuit of light and shadow at its finest. We do not merely provide equipment — we bring soul to spaces."
    : "在過去的十多年間，我們專注於高端建築與景觀亮化工程。每一盞燈具的研發、每一份設計圖的推敲，都秉持著對光影極致追求的初心。我們不只是提供設備，而是為空間賦予靈魂。"}
</p>

<p>
  {lang === "en"
    ? "Our team consists of experienced optical engineers, spatial designers, and professional construction specialists. By integrating IoT-based smart control systems with energy-efficient LED technology, we create lighting works that balance sustainability with architectural aesthetics."
    : "宇碩光的團隊由資深光學工程師、空間設計師與專業工程團隊組成。我們結合最新的物聯網智慧控制技術與節能 LED 科技，致力於創造出既兼顧環境永續，又能展現建築美學的「光之傑作」。"}
</p>

      </div>

    </div>


    {/* ===== 右側圖片（含卡片🔥） ===== */}
    <div className="relative">

      <img
        src="/images/about/story.png"
        className="
        w-full h-[520px]
        object-cover
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        "
      />

      {/* 白色遮罩 */}
      <div className="absolute inset-0 bg-white/20"></div>


      {/* ⭐ 金色卡片 */}
      <div className="
        absolute top-[75%] -left-12
        bg-gradient-to-br from-[#d6b99a] to-[#b8967f]
        text-white
        px-12 py-7
        w-[300px]
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        transition-all duration-500
        hover:-translate-y-2
      ">

        {/* icon */}
        <div className="mb-5">
          <div className="w-10 h-[2px] bg-gradient-to-r from-white to-transparent"></div>
        </div>

        {/* 文案 */}
        <p className="
          text-[#ffffff]
          text-[19px]
          leading-[1.8]
          tracking-[0.14em]
        ">
          {lang === "en" ? (
            <>
              <span className="block">Drawing with light,</span>
              <span className="block">shaping space.</span>
            </>
          ) : (
            <>
              <span className="block">以光為筆，</span>
              <span className="block">勾勒空間之美。</span>
            </>
          )}
        </p>

      </div>

    </div>

  </div>

</section>


<section className="py-32 bg-[#f2f2f2]">

  <div className="max-w-4xl mx-auto px-6 text-center">

    {/* TITLE */}
    <h3 className="text-[14px] tracking-[0.3em] text-black/60 mb-6">
      {lang === "en" ? "DOME CUSTOM SERVICE" : "DOME 訂製服務"}
    </h3>

    {/* DESC（優化過🔥） */}
    <p className="text-sm text-black/60 leading-7 max-w-2xl mx-auto mb-16">
      {lang === "en"
        ? "We begin with understanding your needs, shaping light through materials and form to create a unique spatial experience."
        : "讓燈光從需求開始被定義，透過材料與光的組合，打造專屬的光環境體驗。"}
    </p>

    {/* 主圖 */}
    <div className="mb-20">
      <img
        src="/images/about/emotion-main.jpg"
        className="w-full object-cover"
      />
    </div>

    {/* 三圖 */}
    <div className="grid grid-cols-3 gap-6">

      {/* MATERIAL */}
      <div>
        <img src="/images/about/emotion2.jpg" className="w-full object-cover" />
        <p className="mt-3 text-xs text-black/50 tracking-[0.2em]">
          {lang === "en" ? "▲ MATERIAL" : "▲ 材質"}
        </p>
      </div>

      {/* DETAIL */}
      <div>
        <img src="/images/about/emotion1.jpg" className="w-full object-cover" />
        <p className="mt-3 text-xs text-black/50 tracking-[0.2em]">
          {lang === "en" ? "▲ DETAIL" : "▲ 細節"}
        </p>
      </div>

      {/* LIGHT */}
      <div>
        <img src="/images/about/emotion3.jpg" className="w-full object-cover" />
        <p className="mt-3 text-xs text-black/50 tracking-[0.2em]">
          {lang === "en" ? "▲ LIGHT" : "▲ 光影"}
        </p>
      </div>

    </div>

  </div>

</section>

    </div>
  )
}
