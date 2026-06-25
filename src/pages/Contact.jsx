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

    {/* 保留原標題區高度 */}
    <div className="mb-8 h-[10px] md:mb-20 md:h-[30px]" />




{/* ===== CONTENT ===== */}
<section
  className={`

    relative z-10
    -mb-5
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

{/* Head Office */}
<div className="space-y-3">

  <p className="text-[11px] tracking-[0.32em] text-[#b7afa1]">
    辦公室
  </p>

  <p className="text-[14px] leading-[2] text-[#555] max-w-[280px]">
    Taipei Office, Taiwan
  </p>

</div>

{/* Factory */}
<div className="space-y-3">

  <p className="text-[11px] tracking-[0.32em] text-[#b7afa1]">
    總公司 
  </p>

  <p className="text-[14px] leading-[2] text-[#555] max-w-[280px]">
    Head Office, China
  </p>

</div>


  {/* 電話 */}
  <div className="space-y-3">

  <p className="text-[11px] tracking-[0.32em] text-[#b7afa1] uppercase">
    {lang === "en" ? "PHONE" : "電話"}
  </p>

  <a
    href="tel:+886285218383"
    className="
      text-[14px]
      tracking-[0.08em]
      text-[#555]
      hover:text-[#C8A46A]
      transition
    "
  >
    +886 2 8521 8383
  </a>

</div>


  {/* Email */}
  <div className="space-y-3">

    <p className="text-[11px] tracking-[0.32em] text-[#b7afa1] uppercase">
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

    min-w-[160px]
    md:min-w-[170px]

    h-[46px]
    md:h-[48px]

    rounded-full
    border border-[#d9c7a0]

    flex items-center justify-center

    text-[#C8A46A]
    font-light

    transition-all duration-500

    hover:text-white
    hover:border-[#C8A46A]
    hover:-translate-y-[2px]
    hover:shadow-[0_8px_24px_rgba(200,164,106,0.18)]
  "
>

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

  <span
    className={`
      relative z-[2]

      ${
        lang === "en"
          ? "text-[10px] md:text-[12px] tracking-[0.16em] md:tracking-[0.25em]"
          : "text-[13px] tracking-[0.3em]"
      }
    `}
  >
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
        歡迎透過以下平台，<br />
        瀏覽更多宇碩光的照明案例與空間分享。
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
        href="https://lin.ee/onasjh1n"
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
  href="https://m.me/athenetech"
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
  <path d="M12 2C6.48 2 2 6.15 2 11.27c0 2.92 1.46 5.53 3.75 7.24V22l3.22-1.77c.96.27 1.98.42 3.03.42 5.52 0 10-4.15 10-9.27S17.52 2 12 2Zm1.1 12.4-2.55-2.72-4.98 2.72 5.48-5.82 2.6 2.72 4.93-2.72-5.48 5.82Z"/>
</svg>
      </a>

    </div>

  </div>

</section>





{/* ===== THANK YOU ===== */}
<section className={` pt-24 border-t border-[#eee] text-center ${ani("page-delay-3")}`}>

<p className="text-[14px] text-[#C8A46A] leading-relaxed tracking-[0.1em] ">
  {lang === "en"
    ? "Thank you for reaching Athene Light. We will provide the most suitable lighting solution with professional expertise."
    : "感謝您洽詢宇碩光，我們將以專業的照明設計與工程經驗，為您打造最合適的光環境解決方案。"}
</p>

<p className="text-[12px] text-[#C8A46A] tracking-[0.2em] mt-4 ">
  THANK YOU FOR CONNECTING WITH ATHENE LIGHT
</p>

<div className="flex justify-center mt-10 ">
  <div className="light-line"></div>
</div>

</section>

</div>
</main>
)
}
