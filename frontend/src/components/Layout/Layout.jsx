import { Outlet } from "react-router";
import Navbar from "../nav/Navbar";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />

      <div className="px-4 sm:px-12 lg:px-24 py-5 sm:py-10">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
