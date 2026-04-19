import SiteHeader from "../components/SiteHeader";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServiceCards from "../components/ServiceCards";
import ProductCategories from "../components/ProductCategories";
import ProjectCards from "../components/ProjectCards";
import Brands from "../components/Brands";
import SiteFooter from "../components/SiteFooter";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ===== HEADER ===== */}
      <SiteHeader />

      {/* ===== HERO（避免被 header 蓋住） ===== */}
      <div className="pt-[80px]">
        <HeroSection />
      </div>

      {/* ===== ABOUT ===== */}
      <AboutSection />

      {/* ===== BANNER ===== */}
      <section className="relative isolate h-[280px] flex items-center justify-center overflow-hidden">

        <img
          src="/images/banner/banner1.jpg"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

       <h1>
  {lang === "en" ? "LIGHT UP YOUR LIFE" : "點亮建築的價值"}
</h1>

      </section>

      {/* ===== SERVICES ===== */}
      <ServiceCards />

      {/* ===== PRODUCTS ===== */}
      <ProductCategories />

      {/* ===== PROJECTS ===== */}
      <ProjectCards />

      {/* ===== BRANDS ===== */}
      <Brands />

      {/* ===== FOOTER ===== */}
      <SiteFooter />

    </div>
  );
}