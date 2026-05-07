import { useEffect, useState } from "react"
import "../styles/pageAnimation.css"
import "../styles/contact.css"
import useLang from "../hooks/useLang"
import { text } from "../data/text"

export default function Contact(){
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const [show,setShow] = useState(false)
const lang = useLang()
const t = text

useEffect(()=>{
  setTimeout(()=>setShow(true),50)
},[])

const ani = (delay="") =>
  `${show ? `page-enter-active ${delay}` : "page-enter"}`

return(

<main className="bg-[#f7f7f7] pt-24 pb-14 min-h-screen">

<div className="max-w-[1100px] mx-auto px-6">


{/* ===== HEADER ===== */}
<section className={`mb-20 text-center ${ani()}`}>

  <div className="flex justify-center mb-6">
    <div className="light-line"></div>
  </div>

  <h1 className="text-[30px] md:text-[38px] font-medium tracking-[0.1em] mt-4 text-[#111]">
    {t?.contact?.title?.[lang]}
  </h1>

  <p className="text-[#C8A46A] tracking-[0.3em] text-[24px] mt-12">
    {lang === "en" ? "CONTACT ATHENE LIGHT" : "聯絡宇碩光"}
  </p>

</section>


{/* ===== CONTENT ===== */}
<section
  className={`
    overflow-hidden
    rounded-[32px]
    border border-[#ebe7df]
    shadow-[0_20px_60px_rgba(0,0,0,0.05)]

    ${ani("page-delay-1")}
  `}
>

<div className="grid lg:grid-cols-[0.9fr_1.1fr]">


{/* ===== 左：資訊 ===== */}
<div
  className={`
    space-y-10
    bg-[#f7f5f1]
    px-10 md:px-12
    py-14 md:py-16
    border-r border-[#ebe7df]

    ${ani("page-delay-2")}
  `}
>

<div>

  {/* 小標 */}
  <p className="text-[10px] tracking-[0.42em] text-[#b8b1a4] mb-4 font-light">
    {lang === "en" ? "INFORMATION" : "CONTACT"}
  </p>

  {/* 主標 */}
  <h2 className="text-[24px] tracking-[0.12em] text-[#1d1d1d] font-light leading-[1.4]">
    {lang === "en" ? "Contact Info" : "聯絡資訊"}
  </h2>

  {/* 線 */}
  <div className="w-6 h-px bg-[#C8A46A] mt-5 opacity-70"></div>

</div>


<div className="space-y-10 text-[#666] mt-14">

  {/* 地址 */}
  <div className="space-y-3">

    <p className="text-[10px] tracking-[0.32em] text-[#b7afa1] uppercase">
      {lang === "en" ? "ADDRESS" : "地址"}
    </p>

    <p className="text-[14px] leading-[2] text-[#555] max-w-[280px]">
      {lang === "en"
        ? "2F., No.186, Huacheng Rd., Xinzhuang Dist., New Taipei City"
        : "新北市新莊區化成路186號2樓"}
    </p>

  </div>


  {/* 電話 */}
  <div className="space-y-3">

    <p className="text-[10px] tracking-[0.32em] text-[#b7afa1] uppercase">
      {lang === "en" ? "PHONE" : "電話"}
    </p>

    <p className="text-[14px] tracking-[0.08em] text-[#555]">
      02-8521-8383
    </p>

  </div>


  {/* Email */}
  <div className="space-y-3">

    <p className="text-[10px] tracking-[0.32em] text-[#b7afa1] uppercase">
      {lang === "en" ? "EMAIL" : "信箱"}
    </p>

    <p className="text-[14px] tracking-[0.03em] text-[#555]">
      atheneled@gmail.com
    </p>

  </div>

</div>


{/* 底部品牌句 */}
<div className="pt-14">

  <div className="w-10 h-px bg-[#d8c39a] opacity-60 mb-8"></div>

  <p className="text-[13px] leading-[2.1] text-[#8b857a] max-w-[300px]">
    {lang === "en"
      ? "Creating balanced lighting environments through design, engineering, and spatial integration."
      : "透過照明設計、工程實務與空間整合，建立更自然且平衡的光環境。"}
  </p>

</div>
</div>

{/* ===== 右：表單 ===== */}
<div
  className={`
    space-y-8
    bg-white
    px-10 md:px-12
    py-14 md:py-16

    ${ani("page-delay-3")}
  `}
>

  <div>
    <p className="text-[11px] tracking-[0.3em] text-[#aaa] mb-3">
      {lang === "en" ? "MESSAGE" : "留言"}
    </p>

    <h2 className="text-[22px] tracking-[0.1em] text-[#111]">
      {lang === "en" ? "Send Message" : "發送訊息"}
    </h2>

    <div className="w-4 h-px bg-[#C8A46A] mt-4"></div>
  </div>

<form
  onSubmit={async (e) => {
    e.preventDefault();

    if (loading) return; // 防止重複送出
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xqedapwz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      const data = await res.json(); // 🔥 抓回傳資料（debug用）

      if (res.ok) {
        console.log("✅ success:", data);

        setSuccess(true);
        form.reset();

      } else {
        console.error("❌ form error:", data);
        alert(data?.errors?.[0]?.message || "送出失敗，請稍後再試");
      }

    } catch (err) {
      console.error("❌ network error:", err);
      alert("發生錯誤，請檢查網路或稍後再試");
    }

    setLoading(false);
  }}
  className="space-y-6"
>

  <input
    name="name"
    placeholder={lang === "en" ? "NAME" : "姓名"}
    className="contact-input"
    required
  />

  <input
    name="phone"
    placeholder={lang === "en" ? "PHONE" : "電話"}
    className="contact-input"
  />

<input
  type="email"
  name="email"
  placeholder="Email"
  className="contact-input"
  required
/>

  <textarea
    name="message"
    rows="4"
    placeholder={lang === "en" ? "MESSAGE" : "訊息"}
    className="contact-input"
    required
  />

  {/* 防機器人 */}
  <input type="text" name="_gotcha" style={{ display: "none" }} />

<input
  type="hidden"
  name="_subject"
  value={`ATHENE 官網詢問 - ${lang === "en" ? "New Message" : "新訊息"}`}
/>

  {/* 信件標題 */}
 <input type="hidden" name="_template" value="table" />

<button
  type="submit"
  disabled={loading}
  className="
    group
    relative
    overflow-hidden

    min-w-[130px]
    h-[50px]

    rounded-full
    border border-[#d9c7a0]

    flex items-center justify-center

    text-[#C8A46A]
    text-[12px]
    tracking-[0.38em]
    font-light

    transition-all duration-500

    hover:text-white
    hover:border-[#C8A46A]
    hover:-translate-y-[2px]
    hover:shadow-[0_8px_24px_rgba(200,164,106,0.18)]
  "
>

  {/* 左→右滑入 */}
  <span
    className="
      absolute inset-0
      bg-[#C8A46A]

      -translate-x-full
      group-hover:translate-x-0

      transition-transform
      duration-500
      ease-[cubic-bezier(0.22,1,0.36,1)]
    "
  />

  <span className="relative z-[2]">
    {loading
      ? (lang === "en" ? "SENDING..." : "傳送中...")
      : (lang === "en" ? "SEND MESSAGE" : "送出訊息")}
  </span>

</button>

</form>

{success && (
  <div className="mt-6 text-center animate-fadeIn">
    <p className="text-[#C8A46A] text-[12px] tracking-[0.3em]">
      {lang === "en" ? "MESSAGE SENT SUCCESSFULLY" : "訊息已成功送出"}
    </p>
    <div className="w-10 h-px bg-[#C8A46A] mx-auto mt-3 opacity-60"></div>
  </div>
)}

  <p className="text-[12px] text-[#aaa] tracking-[0.1em]">
    {lang === "en"
      ? "Our team will respond within 24 hours"
      : "專業團隊將於 24 小時內回覆"}
  </p>

</div>

</div>
</section>


{/* ===== CONTACT SOCIAL ===== */}
<section className="py-20 bg-[#f3f0ec]">

  <div className="max-w-[900px] mx-auto px-6 text-center">

    {/* 小標 */}
    <p className="
      text-[#C8A46A]
      text-[11px]
      tracking-[0.38em]
      mb-5
    ">
      CONNECT WITH US
    </p>

    {/* 標題 */}
<h3
  className="
    text-[#222]
    text-[14px]
    md:text-[14px]
    tracking-[0.14em]
    font-light
    leading-[2.2]
  "
>
  {lang === "en"
    ? "Stay connected while waiting for our reply."
    : (
      <>
        等待回覆期間，<br />
        歡迎透過以下方式與我們聯繫。
      </>
    )}
</h3>

    {/* 線 */}
    <div className="
      w-4 h-[1px]
      bg-[#C8A46A]
      mx-auto
      mt-1 mb-5
      opacity-60
    "/>

    {/* ICONS */}
    <div className="flex justify-center gap-8">

      {/* FB */}
      <a
        href="https://www.facebook.com/athenetech/?locale=zh_TW"
        target="_blank"
        rel="noopener noreferrer"
        className="
w-[46px] h-[56px]
rounded-full
border border-[#d9c7a0]
flex items-center justify-center
text-[#C8A46A]

hover:bg-[#C8A46A]
hover:text-white
hover:border-[#C8A46A]

transition-all duration-500
hover:-translate-y-[2px]
hover:shadow-[0_8px_24px_rgba(200,164,106,0.28)]
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px]"
          fill="currentColor"
        >
          <path d="M14 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.9 0-4.9 1.8-4.9 5.15v2.9H5v3.7h3.15V24h3.9v-7.2h3.05l.5-3.7h-3.55v-2.55c0-1.05.3-2.05 1.95-2.05Z"/>
        </svg>
      </a>

      {/* LINE */}
      <a
        href="https://oashop.line.me/shops/706hatrq"
        target="_blank"
        rel="noopener noreferrer"
        className="
w-[46px] h-[56px]
rounded-full
border border-[#d9c7a0]
flex items-center justify-center
text-[#C8A46A]

hover:bg-[#C8A46A]
hover:text-white
hover:border-[#C8A46A]

transition-all duration-500
hover:-translate-y-[2px]
hover:shadow-[0_8px_24px_rgba(200,164,106,0.28)]
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px]"
          fill="none"
        >
          <path
            d="M12 4C7.6 4 4 6.85 4 10.35c0 3.15 2.85 5.8 6.7 6.3L12 20l2.15-3.25C17.5 16.1 20 13.55 20 10.35 20 6.85 16.4 4 12 4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      {/* MAIL */}
      <a
        href="mailto:service@athenelight.com"
        className="
     w-[46px] h-[56px]
rounded-full
border border-[#d9c7a0]
flex items-center justify-center
text-[#C8A46A]

hover:bg-[#C8A46A]
hover:text-white
hover:border-[#C8A46A]

transition-all duration-500
hover:-translate-y-[2px]
hover:shadow-[0_8px_24px_rgba(200,164,106,0.28)]
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px]"
          fill="none"
        >
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
      </a>

    </div>

  </div>

</section>





{/* ===== MAP ===== */}
<section className={`mt-20 ${ani("page-delay-2")}`}>

  <div className="relative w-full rounded-[8px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)]">

    {/* ===== 電腦版 ===== */}
    <div className="hidden md:block relative w-full h-[420px]">

      <iframe
        title={lang === "en" ? "Athene Light location map" : "宇碩光位置地圖"}
        src="https://www.google.com/maps?q=新北市新莊區化成路186號2樓&output=embed"
        className="w-full h-full border-0 brightness-90 contrast-105"
        loading="lazy"
      />

      {/* ⭐ 地圖中央定位點 */}
<div className="pointer-events-none absolute inset-0">

  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

    <div className="relative flex items-center justify-center">

      {/* 金色外圈 */}
      <div className="
        absolute w-6 h-6
        rounded-full
        border border-[#C8A46A]/60
      "></div>

      {/* 柔光擴散 */}
      <div className="
        absolute w-12 h-12
        rounded-full
        bg-[#C8A46A]/10
        blur-[12px]
      "></div>

      {/* 白色跳動點 */}
      <div className="
        w-3 h-3
        rounded-full
        bg-white
        shadow-[0_0_16px_rgba(200,164,106,0.8)]
        animate-bounce
      "></div>

    </div>

  </div>

</div>

      {/* 🔥 底部玻璃卡 */}
      <div className="
        absolute bottom-0 left-0 w-full
        px-10 py-6
        bg-black/40 backdrop-blur-lg
      ">

        <p className="text-[11px] tracking-[0.35em] text-[#C8A46A] mb-3">
          LOCATION
        </p>

        <div className="flex items-start gap-4">

          <div className="relative mt-1">
            <div className="absolute w-6 h-6 rounded-full bg-[#C8A46A]/20 blur-[8px]"></div>
            <svg viewBox="0 0 24 24" className="w-5 h-5 relative">
              <path fill="#C8A46A" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          </div>

          <div>
            <p className="text-[16px] tracking-[0.08em] text-white">
              {lang === "en"
                ? "No.186, Huacheng Rd., Xinzhuang Dist., New Taipei City"
                : "新北市新莊區化成路186號2樓"}
            </p>

            <p className="mt-2 text-[11px] tracking-[0.25em] text-white/60">
              {lang === "en"
                ? "OPEN IN GOOGLE MAPS"
                : "點擊開啟 Google 地圖"}
            </p>
          </div>

        </div>

      </div>

      {/* 點擊 */}
      <a
        href="https://www.google.com/maps?q=新北市新莊區化成路186號2樓"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
      />
    </div>

    {/* ===== 手機版 ===== */}
    <a
      href="https://www.google.com/maps?q=新北市新莊區化成路186號2樓"
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden relative block"
    >

<div className="w-full h-[330px] overflow-hidden">
  <img
    src="/images/map-bg.png"
    className="w-full h-full object-cover object-top"
  />
</div>

      {/* 🔥 底部玻璃卡 */}
      <div className="
        absolute bottom-0 left-0 w-full
        px-6 py-4
        bg-black/40 backdrop-blur-lg
      ">

        <p className="text-[11px] tracking-[0.35em] text-[#C8A46A] mb-3">
          LOCATION
        </p>

        <div className="flex items-start gap-4">

          <div className="relative mt-1">
            <div className="absolute w-6 h-6 rounded-full bg-[#C8A46A]/20 blur-[8px]"></div>
            <svg viewBox="0 0 24 24" className="w-5 h-5 relative">
              <path fill="#C8A46A" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          </div>

          <div>
            <p className="text-[15px] tracking-[0.08em] text-white">
              {lang === "en"
                ? "No.186, Huacheng Rd., Xinzhuang Dist., New Taipei City"
                : "新北市新莊區化成路186號2樓"}
            </p>

            <p className="mt-2 text-[11px] tracking-[0.25em] text-white/60">
              {lang === "en"
                ? "OPEN IN GOOGLE MAPS"
                : "點擊開啟 Google 地圖"}
            </p>
          </div>

        </div>

      </div>

    </a>

  </div>

</section>


{/* ===== THANK YOU ===== */}
<section className={`mt-20 pt-14 border-t border-[#eee] text-center ${ani("page-delay-3")}`}>

<p className="text-[14px] text-[#666] leading-relaxed tracking-[0.1em]">
  {lang === "en"
    ? "Thank you for reaching Athene Light. We will provide the most suitable lighting solution with professional expertise."
    : "感謝您洽詢宇碩光，我們將以專業的照明設計與工程經驗，為您打造最合適的光環境解決方案。"}
</p>

<p className="text-[12px] text-[#999] tracking-[0.2em] mt-4">
  THANK YOU FOR CONNECTING WITH ATHENE LIGHT
</p>

<div className="flex justify-center mt-6">
  <div className="light-line"></div>
</div>

</section>

</div>
</main>
)
}
