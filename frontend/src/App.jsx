import { Suspense } from "react";
import { Loader, ProtectedRoutes, Layout } from "./components";
import {
  Home,
  Admin,
  Login,
  SignUp,
  Details,
  NotFound,
  Unauthorized,
} from "./pages";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/features/authSlice";

const client_Id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={client_Id}>{children}</GoogleOAuthProvider>
  );
};

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      {loading && <Loader />}
      <Routes>
        {/* Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />

          <Route
            path="/login"
            element={
              <GoogleAuthProvider>
                <Login />
              </GoogleAuthProvider>
            }
          />
          <Route
            path="/sign-up"
            element={
              <GoogleAuthProvider>
                <SignUp />
              </GoogleAuthProvider>
            }
          />

          <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
        {/* Layout */}

        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </Suspense>
  );
}

export default App;
