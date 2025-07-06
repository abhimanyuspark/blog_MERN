import { MdOutlineDashboard, MdLayers } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";

export const themesData = ["light", "dark"];

export const navData = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "React Js",
    path: "/tag/reactjs",
  },
  {
    name: "Next Js",
    path: "/tag/nextjs",
  },
];

export const adminSideData = [
  { name: "Dashboard", path: "/admin/dashboard", icon: MdOutlineDashboard },
  { name: "Blog Posts", path: "/admin/blog-posts", icon: MdLayers },
  { name: "Comments", path: "/admin/comments", icon: BiCommentDetail },
];

export const categories = [
  "all",
  "technology",
  "react",
  "design",
  "writing",
  "accessibility",
  "mobile",
];
