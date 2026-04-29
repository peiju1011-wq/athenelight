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

<main className="bg-[#f7f7f7] pt-[110px] pb-28 min-h-screen">

<div className="max-w-[1100px] mx-auto px-6">


{/* ===== HEADER ===== */}
<section className={`mb-20 text-center ${ani()}`}>

  <div className="flex justify-center mb-6">
    <div className="light-line"></div>
  </div>

  <h1 className="text-[30px] md:text-[38px] font-medium tracking-[0.1em] mt-4 text-[#111]">
    {t?.contact?.title?.[lang]}
  </h1>

  <p className="text-[#C8A46A] tracking-[0.3em] text-[24px] mt-4">
    {lang === "en" ? "CONTACT ATHENE LIGHT" : "聯絡宇碩光"}
  </p>

</section>


{/* ===== CONTENT ===== */}
<section className={`bg-white p-10 md:p-14 shadow-[0_15px_50px_rgba(0,0,0,0.06)] ${ani("page-delay-1")}`}>

<div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">


{/* ===== 左：資訊 ===== */}
<div className={`space-y-10 ${ani("page-delay-2")}`}>

  <div>
    <p className="text-[11px] tracking-[0.3em] text-[#aaa] mb-3">
      {lang === "en" ? "INFORMATION" : "聯絡資訊"}
    </p>

    <h2 className="text-[22px] tracking-[0.1em] text-[#111]">
      {lang === "en" ? "Contact Info" : "聯絡資訊"}
    </h2>

    <div className="w-8 h-px bg-[#C8A46A] mt-4"></div>
  </div>

  <div className="space-y-8 text-[#666] text-[14px]">

    <div>
      <p className="contact-label">
        {lang === "en" ? "ADDRESS" : "地址"}
      </p>
      <p>
        {lang === "en"
          ? "2F., No.186, Huacheng Rd., Xinzhuang Dist., New Taipei City"
          : "新北市新莊區化成路186號2樓"}
      </p>
    </div>

    <div>
      <p className="contact-label">
        {lang === "en" ? "PHONE" : "電話"}
      </p>
      <p>02-8521-8383</p>
    </div>

    <div>
      <p className="contact-label">
        {lang === "en" ? "EMAIL" : "信箱"}
      </p>
      <p>atheneled@gmail.com</p>
    </div>

  </div>

  <div className="pt-6">
    <div className="light-line"></div>
  </div>

</div>


{/* ===== 右：表單 ===== */}
<div className={`space-y-8 ${ani("page-delay-3")}`}>

  <div>
    <p className="text-[11px] tracking-[0.3em] text-[#aaa] mb-3">
      {lang === "en" ? "MESSAGE" : "留言"}
    </p>

    <h2 className="text-[22px] tracking-[0.1em] text-[#111]">
      {lang === "en" ? "Send Message" : "發送訊息"}
    </h2>

    <div className="w-8 h-px bg-[#C8A46A] mt-4"></div>
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

<button type="submit" className="contact-btn-light" disabled={loading}>
  {loading
    ? (lang === "en" ? "SENDING..." : "傳送中...")
    : (lang === "en" ? "SEND MESSAGE" : "送出訊息")}
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

<div className="w-full h-[300px] overflow-hidden">
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
