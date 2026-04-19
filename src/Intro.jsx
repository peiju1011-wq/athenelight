import { useEffect, useState } from "react";
import "./Intro.css";

export default function Intro({ onFinish }) {

  const [fade, setFade] = useState(false);

  useEffect(() => {

    const timer1 = setTimeout(() => {
      setFade(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };

  }, [onFinish]);

  return (

    <div className={`intro-screen ${fade ? "fade-out" : ""}`}>

      {/* 🎬 背景影片 */}
      <video
        className="intro-video"
        src="/videos/intro.mp4"
        autoPlay
        muted
        playsInline
      />

      {/* 遮罩 */}
      <div className="intro-overlay" />

      {/* LOGO */}
      <div className="intro-logo">
        <div className="intro-title">宇碩光</div>
        <div className="intro-subtitle">ATHENE LIGHT</div>
      </div>

    </div>
  );
}