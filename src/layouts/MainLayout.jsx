import { Outlet } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import "./MainLayout.css";

export default function MainLayout() {

  return (

    <div className="layout-wrapper w-full ">

      {/* Header */}
      <SiteHeader />

      {/* Page Content */}
      <main className="layout-main">
        <Outlet />
      </main>

      {/* Footer */}
      <SiteFooter />

    </div>

  );

}
