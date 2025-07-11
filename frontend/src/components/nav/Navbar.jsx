import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { GrayLogo, WhiteLogo } from "../../assets";
import { adminSideData, navData, themesData } from "../../utils/constants";
import useTheme from "../../hooks/useTheme";
import { useWindowScroll } from "@uidotdev/usehooks";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Theme from "./Theme";
import Logout from "./Logout";
import Drawer from "../drawer/Drawer";
import { Button } from "../@comp/Buttons";
import Avatar from "../@comp/Avatar";
import MenuDrawer from "../drawer/MenuDrawer";

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { user, socket } = useSelector((state) => state.auth);
  const [openModel, setOpenModel] = useState(false);
  const [menu, setMenu] = useState(false);

  const [{ y }] = useWindowScroll();
  const location = useLocation();
  const [theme] = useTheme(themesData[1]);

  const image = theme === themesData[1] ? WhiteLogo : GrayLogo;

  const admin = location.pathname.split("/")[1] === "admin";
  const path = admin ? "/admin/dashboard" : "/";
  const Data = admin ? adminSideData : navData;

  return (
    <>
      <nav
        className={`px-4 sm:px-12 ${
          admin ? "lg:px-4" : "lg:px-24"
        } sticky top-0 left-0 w-full z-10 border flex items-center justify-between border-base-300 h-16 ${
          y > 0
            ? "bg-base-100/20 backdrop-blur-lg shadow-lg"
            : "bg-base-100 backdrop-blur-sm"
        }`}
      >
        {/* Left Actions */}
        <div className="flex gap-4 items-center">
          {/* Menu */}
          <div className="sm:hidden block">
            <button
              onClick={() => {
                setMenu(!menu);
              }}
              className="btn btn-ghost btn-circle avatar text-2xl"
            >
              <FiMenu />
            </button>
          </div>

          {/* Logo */}
          <Link to={path} className="w-40 h-9 overflow-hidden">
            <img src={image} className="size-full" alt="logo" />
          </Link>
        </div>

        {/* Links */}
        {!admin && (
          <ul role="tablist" className="sm:flex hidden tabs tabs-border">
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
        )}

        {/* Right Actions */}
        <div className="flex gap-4 items-center">
          {/* Search Bar */}
          {!admin && (
            <Button
              onClick={() => setOpenModel(!openModel)}
              className="btn btn-ghost btn-circle avatar"
            >
              <FiSearch className="text-base" />
            </Button>
          )}

          {!user && (
            <div className="flex sm:gap-2 gap-1 items-center">
              <Link className="link link-hover text-sm" to="/login">
                Login
              </Link>
              /
              <Link className="link link-hover text-sm" to="/sign-up">
                Sign Up
              </Link>
            </div>
          )}

          {/* Avatar */}
          {user && (
            <div className="dropdown dropdown-end">
              <div className="flex items-center gap-2">
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-ghost btn-circle avatar ${
                    socket?.connected ? "avatar-online" : ""
                  }`}
                >
                  <Avatar author={user} />
                </div>
                <span className="text-sm text-base-content/50 sm:block hidden">
                  {user?.fullName}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {user?.roles?.includes("admin") && (
                  <li>
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                  </li>
                )}
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <Theme />
                </li>
                <li>
                  <Logout />
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <Drawer
        open={openModel}
        setClose={() => {
          setOpenModel(!openModel);
        }}
        label="Search"
      >
        <form
          className="flex flex-col gap-4 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search/${query}`);
            toast.success("Successfully toasted!");
            setQuery("");
            setOpenModel(!openModel);
          }}
        >
          <label className="input input-primary w-full">
            <FiSearch />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="grow"
              placeholder="Search"
            />
          </label>

          <Button type="submit" className="btn btn-primary">
            <FiSearch className="text-lg" />
            Search
          </Button>
        </form>
      </Drawer>

      <MenuDrawer
        open={menu}
        setClose={() => {
          setMenu(!menu);
        }}
      >
        <div className="overflow-y-auto">
          <div className="sticky top-0 left-0 w-full border-b border-base-300 h-16 flex items-center px-4 justify-between">
            <Link
              to={path}
              className="w-40 h-9 block overflow-hidden"
              onClick={() => setMenu(!menu)}
            >
              <img src={image} className="size-full" alt="logo" />
            </Link>
            <Button className="btn-sm" onClick={() => setMenu(!menu)}>
              <FiX className="text-xl" />
            </Button>
          </div>
          <div className="txt-sm flex gap-2 flex-col p-4 items-center text-center">
            <Avatar size={80} author={user} />
            <p className="text-base-content/80 truncate">{user?.fullName}</p>
            <p className="truncate">{user?.email}</p>
          </div>
          <ul className="p-2 flex flex-col gap-4">
            {Data.map((n, i) => (
              <li key={i} className="text-lg">
                <NavLink
                  className={({ isActive }) =>
                    `p-2 w-full block rounded-lg ${
                      isActive ? "bg-accent" : "text-base-content/50"
                    } hover:text-base-content text-center`
                  }
                  to={n.path}
                  onClick={() => setMenu(!menu)}
                >
                  {n.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </MenuDrawer>
    </>
  );
};

export default Navbar;
