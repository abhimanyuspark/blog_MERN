import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { GrayLogo, Logo, WhiteLogo } from "../../assets";
import { navData, themesData } from "../../utils/constants";
import useTheme from "../../hooks/useTheme";
import { useWindowScroll } from "@uidotdev/usehooks";
import Modal from "../modal/Modal";
import toast from "react-hot-toast";
import Drawer from "../drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth);

  const [{ y }] = useWindowScroll();
  const location = useLocation();
  const [theme, setTheme] = useTheme(themesData[1]);

  const image = theme === themesData[1] ? WhiteLogo : GrayLogo;

  const admin = location.pathname !== "/admin";

  const id = "model";
  const menu = "menu";

  return (
    <>
      <nav
        className={`px-4 sm:px-12 lg:px-24 sticky top-0 left-0 w-full z-10 border flex items-center justify-between border-base-300 h-16 ${
          y > 0
            ? "bg-base-100/20 backdrop-blur-lg shadow-lg"
            : "bg-base-100 backdrop-blur-sm"
        }`}
      >
        {/* Left Actions */}
        <div className="flex gap-4 items-center">
          {/* Menu */}
          <div className="sm:hidden block">
            <label htmlFor={menu} className="text-2xl">
              <FiMenu />
            </label>
          </div>

          {/* Logo */}
          <Link to="/" className="w-40 h-9 overflow-hidden">
            <img src={image} className="size-full" alt="logo" />
          </Link>
        </div>

        {/* Links */}
        {admin && (
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
          {admin && (
            <label htmlFor={id} className="btn btn-ghost btn-circle avatar">
              <FiSearch className="text-base" />
            </label>
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
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="profilePic"
                    src={user?.profilePic}
                    onError={(e) => (e.currentTarget.src = Logo)}
                    className="bg-white"
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
                <li
                  onClick={async () => {
                    await toast.promise(dispatch(logoutUser()).unwrap(), {
                      loading: "Loging out...",
                      success: "Logout SuccessFully",
                      error: (err) => err,
                    });
                    navigate("/login");
                  }}
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <Modal id={id}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="input input-primary w-full">
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

      <Drawer id={menu}>
        <div className="border-b border-base-300 h-16 flex items-center px-4 justify-between">
          <Link to="/" className="w-40 h-9 block overflow-hidden">
            <img src={image} className="size-full" alt="logo" />
          </Link>
          <label htmlFor={menu}>
            <FiX className="text-2xl" />
          </label>
        </div>

        <ul className="p-2 flex flex-col gap-4">
          {navData.map((n, i) => (
            <li key={i} className="text-lg">
              <NavLink to={n.path}>{n.name}</NavLink>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
};

export default Navbar;
