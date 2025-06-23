import { Suspense, useEffect } from "react";
import {
  Loader,
  ProtectedRoutes,
  Layout,
  GoogleAuth,
  AdminLayout,
} from "./components";
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
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/features/authSlice";
import useTheme from "./hooks/useTheme";
import { themesData } from "./utils/constants";

function App() {
  const dispatch = useDispatch();
  const [theme] = useTheme(themesData[0]);
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    const prevTheme = html.getAttribute("data-theme");
    html.setAttribute("data-theme", theme);
    return () => {
      if (prevTheme) {
        html.setAttribute("data-theme", prevTheme);
      } else {
        html.removeAttribute("data-theme");
      }
    };
  }, [theme]);

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

          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
        {/* Layout */}

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Admin />} />
          </Route>
        </Route>
        {/* Admin Layout */}
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </Suspense>
  );
}

export default App;
