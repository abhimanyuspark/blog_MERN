import { useEffect } from "react";
import BlogLoader from "../../../components/loaders/BlogLoader";
import StatsCard from "../../../components/cards/StatusCard";
import { useDispatch, useSelector } from "react-redux";
import { getDashBoard } from "../../../redux/features/dashSlice";
import TopInsights from "./TopInsights";
import TopPosts from "./TopPosts";
import TopComments from "./TopComments";

const Admin = () => {
  const { user } = useSelector((state) => state.auth);
  const { dash, loading } = useSelector((state) => state.dash);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashBoard());
  }, [dispatch]);

  if (loading) {
    return <BlogLoader />;
  }

  return (
    <div className="flex gap-8 flex-col">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user?.fullName} 👋
        </h1>
        <p className="text-xl text-gray-600">
          Here's what's happening with your blog today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.entries(dash?.stats || {}).map(([key, value]) => (
          <StatsCard key={key} name={key} value={value} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TopInsights tagUsage={dash?.totalUsage || []} />

        <TopPosts topBlogs={dash?.recentBlogs || []} />
      </div>

      <TopComments topComments={dash?.recentComments || []} />
    </div>
  );
};

export default Admin;
