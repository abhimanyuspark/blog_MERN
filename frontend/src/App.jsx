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

const client_Id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={client_Id}>{children}</GoogleOAuthProvider>
  );
};

function App() {
  return (
    <Suspense fallback={<Loader />}>
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
