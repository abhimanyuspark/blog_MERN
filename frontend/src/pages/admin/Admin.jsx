import { useEffect } from "react";
import { StatsCard, BlogCard, Chart } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getDashBoard } from "../../redux/features/dashSlice";

const Admin = () => {
  const { user } = useSelector((state) => state.auth);
  const { dash, loading } = useSelector((state) => state.dash);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashBoard());
  }, [dispatch]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton p-10"></div>
            ))
          : Object.entries(dash?.stats || {}).map(([key, value]) => (
              <StatsCard key={key} name={key} value={value} />
            ))}
      </div>

      <Chart />

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 *:first:col-span-2 *:first:row-span-1 *:first:h-120 *:nth-[2]:h-120">
        {dash?.recentBlogs?.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
