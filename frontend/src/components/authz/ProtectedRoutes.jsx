import { Outlet } from "react-router";

const ProtectedRoutes = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role");

  // if (!allowedRoles.includes(userRole)) {
  //   window.location.href = "/unauthorized";
  //   return null;
  // }

  return <Outlet />;
};

export default ProtectedRoutes;
