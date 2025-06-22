import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (!loading && user !== undefined && user !== null) {
    const roles = user.roles || [];
    if (allowedRoles.some((r) => roles.includes(r))) {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" replace={true} />;
    }
  }
};

export default ProtectedRoutes;
