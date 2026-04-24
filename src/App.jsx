import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Intro from "./Intro";
import MainLayout from "./layouts/MainLayout";

import Portal from "./pages/Portal";
import Products from "./pages/Products";

import Series from "./pages/Series";
import Mirror from "./pages/Mirror"; 
import ProductDetail from "./pages/ProductDetail";

import LightDetail from "./pages/LightDetail";       

import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";


function App() {

  const [showIntro, setShowIntro] = useState(() => {
    const path = window.location.pathname;
    return path === "/" || path === "/en";
  });

  // 🔥 加在這裡（Intro 判斷下面）
 useEffect(() => {
    const url = new URL(window.location.href);

    const removeParams = [
      "fbclid",
      "gclid",
      "utm_source",
      "utm_medium",
      "utm_campaign"
    ];

    let changed = false;

    removeParams.forEach(p => {
      if (url.searchParams.has(p)) {
        url.searchParams.delete(p);
        changed = true;
      }
    });

    if (changed) {
const newUrl =
  url.pathname +
  (url.searchParams.toString()
    ? "?" + url.searchParams.toString()
    : "") +
  url.hash;

window.history.replaceState({}, "", newUrl);
    }
  }, []);


  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return (

    <div className="w-full ">


      <ScrollToTop />

      <Routes>

        {/* ===== 中文預設 "/" ===== */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Portal />} />

          <Route path="products" element={<Products />} />

  {/* 🔥 燈具（統一入口） */}
  <Route path="lights/:slug" element={<LightDetail />} />
          

          {/* 🔥 mirror */}
          <Route path="products/mirror">
            <Route index element={<Mirror />} />
            <Route path=":series">
              <Route index element={<Series />} />
              <Route path=":productId" element={<ProductDetail />} />
            </Route>
          </Route>

          <Route path="products/:series" element={<Series />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />

          <Route path="about" element={<About />} />
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contact />} />
        </Route>


        {/* ===== 中文 /zh ===== */}
        <Route path="/zh" element={<MainLayout />}>
          <Route index element={<Portal />} />

          <Route path="products" element={<Products />} />

 
  {/* 🔥 燈具（統一入口） */}
  <Route path="lights/:slug" element={<LightDetail />} />
          <Route path="products/mirror">
            <Route index element={<Mirror />} />
            <Route path=":series">
              <Route index element={<Series />} />
              <Route path=":productId" element={<ProductDetail />} />
            </Route>
          </Route>

          <Route path="products/:series" element={<Series />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />

          <Route path="about" element={<About />} />
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contact />} />
        </Route>


        {/* ===== 英文 /en ===== */}
        <Route path="/en" element={<MainLayout />}>
          <Route index element={<Portal />} />

          <Route path="products" element={<Products />} />


  {/* 🔥 燈具（統一入口） */}
  <Route path="lights/:slug" element={<LightDetail />} />

          <Route path="products/mirror">
            <Route index element={<Mirror />} />
            <Route path=":series">
              <Route index element={<Series />} />
              <Route path=":productId" element={<ProductDetail />} />
            </Route>
          </Route>

          <Route path="products/:series" element={<Series />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />

          <Route path="about" element={<About />} />
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contact />} />
        </Route>


        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </div>
  );
}

export default App;
