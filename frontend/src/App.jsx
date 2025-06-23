import { Suspense } from "react";
import { Loader, ProtectedRoutes, Layout, GoogleAuth } from "./components";
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/features/authSlice";

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

          <Route element={<GoogleAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
        {/* Layout */}
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </Suspense>
  );
}

export default App;
