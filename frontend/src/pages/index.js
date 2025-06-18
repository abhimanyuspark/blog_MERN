import { lazy } from "react";

const Home = lazy(() => import("./blog/home/Home.jsx"));
const Details = lazy(() => import("./blog/details/Details.jsx"));
const NotFound = lazy(() => import("./blog/not-found/NotFound.jsx"));

const Admin = lazy(() => import("./admin/Admin.jsx"));
const Unauthorized = lazy(() =>
  import("./admin/unauthorized/Unauthorized.jsx")
);

const Login = lazy(() => import("./auth/Login.jsx"));
const SignUp = lazy(() => import("./auth/SignUp.jsx"));

export { Home, Details, NotFound, Admin, Unauthorized, Login, SignUp };
