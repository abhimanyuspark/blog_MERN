import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router";
import { GrayLogo, WhiteLogo } from "../../assets";
import { navData, themesData } from "../../utils/constants";
import useTheme from "../../hooks/useTheme";
import { useWindowScroll } from "@uidotdev/usehooks";
import Modal from "../modal/Modal";
import toast from "react-hot-toast";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [{ y }] = useWindowScroll();
  const location = useLocation();
  const [theme, setTheme] = useTheme(themesData[1]);

  const image = theme === themesData[1] ? WhiteLogo : GrayLogo;

  const admin = location.pathname !== "/admin";

  const id = "my";

  return (
    <header>
      <nav
        className={`px-4 sm:px-12 lg:px-24 sticky top-0 left-0 w-full z-10 border flex items-center justify-between border-base-300 h-16 ${
          y > 0
            ? "bg-base-200/80 backdrop-blur-lg shadow-lg"
            : "bg-base-200 backdrop-blur-sm"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="w-auto h-10 overflow-hidden">
          <img src={image} className="size-full" alt="logo" />
        </Link>

        <ul role="tablist" className="tabs tabs-border">
          {navData.map((n, i) => (
            <li key={i}>
              <NavLink
                to={n.path}
                role="tab"
                className={({ isActive }) =>
                  `tab ${isActive ? "tab-active" : ""}`
                }
              >
                {n.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Search Bar */}
        {admin && (
          <label htmlFor={id}>
            <FiSearch className="text-2xl" />
          </label>
        )}

        {/* Right Actions */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <label className="flex items-center justify-between capitalize">
                Theme - {theme}{" "}
                <input
                  checked={theme === themesData[1]}
                  type="checkbox"
                  onChange={(e) => {
                    const value = e.target.checked
                      ? themesData[1]
                      : themesData[0];
                    setTheme(value);
                  }}
                  className="toggle"
                />
              </label>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      {admin && (
        <Modal id={id}>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="input w-full">
              <FiSearch />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="grow"
                placeholder="Search"
              />
            </label>

            <label
              htmlFor={id}
              className="btn btn-primary"
              onClick={() => {
                toast.success("Successfully toasted!");
                setSearch("");
              }}
            >
              Search
            </label>
          </form>
        </Modal>
      )}
    </header>
  );
};

export default Navbar;
