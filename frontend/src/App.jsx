import { Suspense, useEffect } from "react";
import Loader from "./components/loaders/Loader";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import GoogleAuth from "./components/authz/GoogleOAuth";
import ProtectedRoutes from "./components/authz/ProtectedRoutes";
import {
  Home,
  Admin,
  Login,
  SignUp,
  Details,
  NotFound,
  Unauthorized,
  BlogPosts,
  Comments,
  Editor,
  Search,
  Tag,
} from "./pages";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuth,
  connectSocket,
  disconnectSocket,
} from "./redux/features/authSlice";
import useTheme from "./hooks/useTheme";
import { themesData } from "./utils/constants";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { onSocketAdd, onSocketDelete } from "./redux/features/commentSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const dispatch = useDispatch();
  const [theme] = useTheme(themesData[0]);
  const { loading, socket } = useSelector((state) => state.auth);

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

  useEffect(() => {
    dispatch(connectSocket());

    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!socket) return;

    const handleAdd = (comment) => {
      dispatch(onSocketAdd(comment));
    };
    const handleDelete = (comment) => {
      dispatch(onSocketDelete(comment));
    };

    socket.on("comment:add", handleAdd);
    socket.on("comment:delete", handleDelete);

    return () => {
      socket.off("comment:add", handleAdd);
      socket.off("comment:delete", handleDelete);
    };
  }, [dispatch, socket]);

  return (
    <Suspense fallback={<Loader />}>
      {loading && <Loader />}
      <Routes>
        {/* Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/tag/:tag" element={<Tag />} />
          <Route path="/search/:query" element={<Search />} />

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
            <Route path="/admin/blog-posts/create" element={<Editor />} />
            <Route path="/admin/blog-posts/edit/:id" element={<Editor />} />
            <Route path="/admin/blog-posts" element={<BlogPosts />} />
            <Route path="/admin/comments" element={<Comments />} />
          </Route>
        </Route>
        {/* Admin Layout */}
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </Suspense>
  );
}

export default App;
