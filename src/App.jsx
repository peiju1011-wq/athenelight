import { useState, useLayoutEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Intro from "./Intro";
import MainLayout from "./layouts/MainLayout";

import Portal from "./pages/Portal";
import Products from "./pages/Products";

import Series from "./pages/Series";
import Mirror from "./pages/Mirror"; 
import ProductDetail from "./pages/ProductDetail";
import AdminCategories from "./components/admin/AdminCategories";
import LightDetail from "./pages/LightDetail";       

import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

import About from "./pages/About";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";

import AdminProducts from "./pages/AdminProducts";

import AdminProductsEdit from "./pages/AdminProductsEdit";

import AdminProjects from "./pages/AdminProjects";
import AdminProjectsEdit from "./pages/AdminProjectsEdit";

import AdminNews from "./pages/AdminNews";
import AdminNewsEdit from "./pages/AdminNewsEdit";
import AdminHome from "./pages/AdminHome";
import TestProducts from "./pages/TestProducts";
import AdminProductsNew from "./pages/AdminProductsNew";
import AdminProjectsNew from "./pages/AdminProjectsNew";
import AdminTrash from "./pages/AdminTrash";
import AdminProjectsTrash from "./pages/AdminProjectsTrash";
import AdminStorageCleaner from "./pages/AdminStorageCleaner";
import AdminGuard from "./components/AdminGuard";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";


function App() {

  const [showIntro, setShowIntro] = useState(() => {
    const path = window.location.pathname;
    return path === "/" || path === "/en";
  });

  // 🔥 加在這裡（Intro 判斷下面）
useLayoutEffect(() => {
  const url = new URL(window.location.href);

  const removeParams = [
    "fbclid",
    "gclid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term"
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


        <Route path="/admin/products" element={ <AdminGuard> <AdminProducts/> </AdminGuard> } />
<Route
  path="admin/login"
  element={<Login />}
/>

<Route
  path="admin"
  element={
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  }
/>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Portal />} />

          <Route path="products" element={<Products />} />
          <Route
  path="test-products"
  element={<TestProducts />}
/>



<Route
  path="admin/products"
  element={<AdminProducts />}
/>

<Route
  path="admin/products/new"
  element={<AdminProductsNew />}
/>



<Route
  path="admin/products/:slug"
  element={<AdminProductsEdit />}
/>

<Route
  path="admin/categories"
  element={<AdminCategories />}
/>

<Route
  path="admin/projects/trash"
  element={<AdminProjectsTrash />}
/>

<Route
  path="admin/trash"
  element={<AdminTrash />}
/>

<Route
  path="admin/storage-cleaner"
  element={<AdminStorageCleaner />}
/>

<Route
  path="admin/projects"
  element={<AdminProjects />}
/>

<Route
  path="admin/projects/new"
  element={<AdminProjectsNew />}
/>

<Route
  path="admin/projects/:slug"
  element={<AdminProjectsEdit />}
/>

<Route
  path="admin/news"
  element={<AdminNews />}
/>

<Route
  path="admin/home"
  element={<AdminHome />}
/>


<Route
  path="admin/news/:slug"
  element={<AdminNewsEdit />}
/>

<Route
  path="lights/:slug"
  element={<LightDetail />}
/>     

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
          <Route
  path="news/:slug"
  element={<NewsDetail />}
/>
          <Route path="contact" element={<Contact />} />
        </Route>


        {/* ===== 中文 /zh ===== */}

        <Route path="/admin/products" element={ <AdminGuard> <AdminProducts/> </AdminGuard> } />
<Route
  path="admin/login"
  element={<Login />}
/>

<Route
  path="admin"
  element={
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  }
/>
        <Route path="/zh" element={<MainLayout />}>
          <Route index element={<Portal />} />

          <Route path="products" element={<Products />} />
          <Route
  path="test-products"
  element={<TestProducts />}
/>
<Route
  path="admin/products"
  element={<AdminProducts />}
/>

<Route
  path="admin/products/new"
  element={<AdminProductsNew />}
/>

<Route
  path="admin/categories"
  element={<AdminCategories />}
/>

<Route
  path="admin/home"
  element={<AdminHome />}
/>


<Route
  path="admin/products/:slug"
  element={<AdminProductsEdit />}
/>



<Route
  path="admin/projects/trash"
  element={<AdminProjectsTrash />}
/>

<Route
  path="admin/trash"
  element={<AdminTrash />}
/>

<Route
  path="admin/storage-cleaner"
  element={<AdminStorageCleaner />}
/>

<Route
  path="admin/projects"
  element={<AdminProjects />}
/>

<Route
  path="admin/projects/new"
  element={<AdminProjectsNew />}
/>

<Route
  path="admin/projects/:slug"
  element={<AdminProjectsEdit />}
/>

<Route
  path="admin/news"
  element={<AdminNews />}
/>

<Route
  path="admin/news/:slug"
  element={<AdminNewsEdit />}
/>



<Route
  path="lights/:slug"
  element={<LightDetail />}
/>
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
          <Route
  path="news/:slug"
  element={<NewsDetail />}
/>
          <Route path="contact" element={<Contact />} />
        </Route>


        {/* ===== 英文 /en ===== */}
        <Route path="/admin/products" element={ <AdminGuard> <AdminProducts/> </AdminGuard> } />
<Route
  path="admin/login"
  element={<Login />}
/>

<Route
  path="admin"
  element={
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  }
/>
        <Route path="/en" element={<MainLayout />}>
          <Route index element={<Portal />} />

          <Route path="products" element={<Products />} />
          <Route
  path="test-products"
  element={<TestProducts />}
/>
<Route
  path="admin/products"
  element={<AdminProducts />}
/>

<Route
  path="admin/products/new"
  element={<AdminProductsNew />}
/>

<Route
  path="admin/products/:slug"
  element={<AdminProductsEdit />}
/>

<Route
  path="admin/categories"
  element={<AdminCategories />}
/>

<Route
  path="admin/projects/trash"
  element={<AdminProjectsTrash />}
/>

<Route
  path="admin/trash"
  element={<AdminTrash />}
/>

<Route
  path="admin/storage-cleaner"
  element={<AdminStorageCleaner />}
/>

<Route
  path="admin/projects"
  element={<AdminProjects />}
/>

<Route
  path="admin/projects/new"
  element={<AdminProjectsNew />}
/>

<Route
  path="admin/projects/:slug"
  element={<AdminProjectsEdit />}
/>

<Route
  path="admin/news"
  element={<AdminNews />}
/>

<Route
  path="admin/home"
  element={<AdminHome />}
/>


<Route
  path="admin/news/:slug"
  element={<AdminNewsEdit />}
/>



<Route
  path="lights/:slug"
  element={<LightDetail />}
/>

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
          <Route
  path="news/:slug"
  element={<NewsDetail />}
/>
          <Route path="contact" element={<Contact />} />
        </Route>


        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </div>
  );
}

export default App;
