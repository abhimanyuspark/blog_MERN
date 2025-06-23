import { Outlet } from "react-router";
import Navbar from "../nav/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />

      <div className="px-4 sm:px-12 lg:px-24 py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
