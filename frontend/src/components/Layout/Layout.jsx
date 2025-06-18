import { Outlet } from "react-router";
import Navbar from "../nav/Navbar";
import useTheme from "../../hooks/useTheme";
import { themesData } from "../../utils/constants";
import { useEffect } from "react";

const Layout = () => {
  const [theme] = useTheme(themesData[0]);

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    const prevTheme = html.getAttribute("data-theme");
    html.setAttribute("data-theme", theme);
    return () => {
      if (prevTheme) {
        html.setAttribute("data-theme", prevTheme);
      } else {
        html.removeAttribute("data-theme");
      }
    };
  }, [theme]);

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
