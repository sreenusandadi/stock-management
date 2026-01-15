import { Outlet } from "react-router-dom";

import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";

function MainLayout() {
  return (
    <div className="d-flex flex-column justify-content-between min-vh-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
