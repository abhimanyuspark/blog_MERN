import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // Show loading state while authentication is being checked
  if (loading) {
    return <div>Loading...</div>; // or your loading component
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  // If user is logged in, check roles
  const roles = user.roles || [];

  // If user has required roles, allow access
  if (
    allowedRoles.length === 0 ||
    allowedRoles.some((role) => roles.includes(role))
  ) {
    return <Outlet />;
  }

  // If user doesn't have required roles, redirect to unauthorized
  return <Navigate to="/unauthorized" replace={true} />;
};

export default ProtectedRoutes;
