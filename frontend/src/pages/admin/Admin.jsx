import { useState } from "react";
import { blogs, categories, stats } from "../../utils/constants";
import { StatsCard, BlogCard } from "../../components";
import { useSelector } from "react-redux";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useSelector((state) => state.auth);

  const filteredBlogs =
    activeTab === "all"
      ? blogs
      : blogs.filter((blog) => blog.category.toLowerCase() === activeTab);

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
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-2 py-1 text-sm rounded-md font-medium transition-all duration-300 capitalize ${
              activeTab === category
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "text-gray-600 hover:text-base-content hover:bg-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog, index) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            featured={index === 0 && activeTab === "all"}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button className="text-purple-600 px-8 py-3 rounded-xl font-semibold border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default Admin;
