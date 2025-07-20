import { FiEdit, FiEye, FiHeart, FiTrash } from "react-icons/fi";
import { Button } from "../../../components/@comp/Buttons";
import { Back } from "../../../assets";

const PostCard = ({ blog, onEdit, onDelete }) => {
  return (
    <div className="flex sm:gap-4 gap-3 group cursor-pointer hover:bg-base-100 p-0 sm:p-2 rounded-lg">
      <div className="overflow-hidden w-12 h-12 rounded-md bg-gray-100 flex-shrink-0">
        <img
          className="w-full h-full object-cover"
          src={blog?.coverImgUrl || Back}
          alt={blog?.title || "Blog Cover"}
        />
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex gap-1 flex-col">
          <h6 className="font-semibold text-base line-clamp-2">
            {blog?.title}
          </h6>

          <div className="flex gap-2 flex-wrap items-center">
            <span className="badge-sm badge bg-base-content/10">
              {new Date(blog?.createdAt).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            <span className="badge badge-sm bg-base-content/10">
              <FiEye />
              {blog?.views}
            </span>
            <span className="badge badge-sm bg-base-content/10">
              <FiHeart />
              {blog?.likes}
            </span>

            <div className="flex gap-2 flex-wrap">
              {blog?.tags?.map((t, i) => (
                <span
                  className="badge badge-sm bg-base-content/10 capitalize"
                  key={i}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap items-center group-hover:opacity-100 opacity-100 sm:opacity-0 transition-opacity duration-300">
          <Button
            className="btn-outline btn-info btn-xs sm:btn-sm"
            onClick={() => {
              onEdit(blog?._id);
            }}
          >
            <FiEdit />
            Edit
          </Button>
          <Button
            className="btn-outline btn-error btn-xs sm:btn-sm"
            onClick={() => {
              onDelete(blog?._id);
            }}
          >
            <FiTrash />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
