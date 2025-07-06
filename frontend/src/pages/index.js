import { lazy } from "react";

const Home = lazy(() => import("./blog/home/Home.jsx"));
const Details = lazy(() => import("./blog/details/Details.jsx"));
const Search = lazy(() => import("./blog/search/Search.jsx"));
const Tag = lazy(() => import("./blog/tag/Tag.jsx"));

const Admin = lazy(() => import("./admin/dashboard/Admin.jsx"));
const Editor = lazy(() => import("./admin/blogs/PostForm.jsx"));
const BlogPosts = lazy(() => import("./admin/blogs/BlogPosts.jsx"));
const Comments = lazy(() => import("./admin/comments/Comments.jsx"));

const NotFound = lazy(() => import("./others/NotFound.jsx"));
const Unauthorized = lazy(() => import("./others/Unauthorized.jsx"));

const Login = lazy(() => import("./auth/Login.jsx"));
const SignUp = lazy(() => import("./auth/SignUp.jsx"));

export {
  Home,
  Details,
  NotFound,
  Admin,
  BlogPosts,
  Editor,
  Comments,
  Unauthorized,
  Login,
  SignUp,
  Tag,
  Search,
};
