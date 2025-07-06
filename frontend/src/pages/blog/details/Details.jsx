import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router";
import { fetchBlogById, fetchBlogs } from "../../../redux/features/blogSlice";

import BlogLoader from "../../../components/loaders/BlogLoader";
import MarkDown from "../../../components/markdown/MarkDown";
import { Back, Logo } from "../../../assets";
import useTheme from "../../../hooks/useTheme";
import { Button } from "../../../components/@comp/Buttons";
import RecentsPosts from "./RecentsPosts";
import { LuSparkles } from "react-icons/lu";
import SharePost from "./SharePost";
import Comments from "./Comments";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [theme] = useTheme();
  const { blog, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogById(id));
    dispatch(fetchBlogs({ page: 1 }));
  }, [dispatch, id]);

  if (loading) {
    return <BlogLoader />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="flex sm:gap-6 gap-4 flex-col">
      <div className="flex sm:flex-row flex-col gap-8">
        <div className="flex gap-6 flex-col sm:w-[65%] w-full">
          <h1 className="text-3xl font-bold">{blog?.title}</h1>

          <div className="flex flex-wrap items-start gap-4 justify-between">
            <div className="flex items-center">
              <img
                src={blog?.author?.profilePic || Logo}
                alt={blog?.author?.fullName}
                onError={(e) => {
                  e.currentTarget.src = Logo;
                }}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-base-content/70 font-semibold">
                  @{blog?.author?.fullName}
                </p>
                <p className="text-base-content/50 text-sm">
                  {new Date(blog?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Button className="btn-accent btn-sm">
              <LuSparkles /> Summerize Post
            </Button>

            <div className="flex items-center gap-2 flex-wrap">
              {blog?.tags?.map((t, i) => (
                <Link to={`/tag/${t}`} className="badge badge-primary" key={i}>
                  #{t}
                </Link>
              ))}
            </div>
          </div>

          <img
            src={blog?.coverImgUrl || Back}
            alt={blog?.title}
            className="w-full h-90 object-cover rounded"
          />

          <div className="border border-base-300 bg-base-100 rounded-lg p-4">
            <MarkDown
              content={
                blog?.content?.replace(/^<p>/, "")?.replace(/<\/p>$/, "") || ""
              }
              theme={theme === "light" ? true : false}
            />
          </div>
        </div>

        <div className="sm:w-[35%] w-full">
          <RecentsPosts id={id} />
        </div>
      </div>
      <SharePost />
      <Comments postId={blog?._id} />
    </div>
  );
};

export default Details;
