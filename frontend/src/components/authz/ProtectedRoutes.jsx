import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../../components/loaders/Loader";

const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // 🚨 While we don't know if user is logged in, don't render anything
  if (loading || user === undefined || user === null) {
    return <Loader />; // Show a spinner or skeleton
  }

  if (!user || !user.roles || user.roles.length === 0) {
    return <Navigate to="/login" replace />;
  }

  const roles = user.roles || [];
  if (allowedRoles.some((r) => roles.includes(r))) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoutes;
