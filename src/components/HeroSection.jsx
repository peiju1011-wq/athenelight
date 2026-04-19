import { useEffect, useState } from "react";
import "../styles/portal.css";

const slides = [
  "/images/hero/hero1.jpg",
  "/images/hero/hero2.jpg",
  "/images/hero/hero3.jpg"
];

export default function HeroSection(){

  const [index,setIndex] = useState(0);

  useEffect(()=>{
    const timer = setInterval(()=>{
      setIndex((i)=>(i+1)%slides.length);
    },5000);

    return ()=>clearInterval(timer);
  },[]);


  return(

<section className="relative h-screen w-full overflow-hidden bg-black">

{/* slides */}

{slides.map((img,i)=>(
<div
key={i}
className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
i===index ? "opacity-100":"opacity-0"
}`}
style={{backgroundImage:`url(${img})`}}
/>
))}

{/* overlay */}

<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"/>


{/* ===== CONTENT WRAPPER ===== */}

<div className="relative h-full max-w-[1400px] mx-auto">

  {/* TITLE */}

  <div className="hero-content">

    <div className="hero-title">

      <div className="hero-english">
        LIGHT OF<br/>
        SILENT<br/>
        PIONEERS
      </div>

      <div className="hero-chinese">
        光。無聲的先行者
      </div>

    </div>

  </div>



{/* ===== HERO BOTTOM ===== */}

<div className="hero-bottom">

  {/* SOCIAL */}

  <div className="hero-social">
    <span className="border-b border-white/30 pb-1">FB</span>
    <span className="border-b border-white/30 pb-1">LINE</span>
    <span className="border-b border-white/30 pb-1">MSG</span>
  </div>


  {/* PAGINATION */}

  <div className="hero-pagination">

    <div className="hero-dots">
      {slides.map((_,i)=>(
        <button
          key={i}
          onClick={()=>setIndex(i)}
          className={`w-[6px] h-[6px] rounded-full ${
          i===index ? "bg-white":"bg-white/30"
          }`}
        />
      ))}
    </div>

    <div className="hero-number">
      {String(index+1).padStart(2,"0")}
      <span className="text-lg opacity-40 ml-2">/03</span>
    </div>

  </div>

</div>


{/* ===== CENTER LINE ===== */}

<div className="hero-center-line">
  <div className="scroll-bar"></div>
</div>




</div> {/* 關 CONTENT WRAPPER */}

</section> 

);
}