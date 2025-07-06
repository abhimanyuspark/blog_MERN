import { Back } from "../../assets/index";
import Avatar from "../@comp/Avatar";

const TopCommentsCard = ({ comment }) => {
  return (
    <div className="flex items-start gap-3 py-4" key={comment?._id}>
      <Avatar author={comment?.author} />

      <div className="flex flex-col">
        <div className="flex gap-2 items-center text-sm text-base-content/50">
          <span>@{comment?.author?.fullName}</span>
          <span className="">
            {new Date(comment?.createdAt).toLocaleDateString(undefined, {
              month: "short",
              year: "numeric",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="">{comment?.content}</div>

        <div className="flex items-start space-x-3 mt-3">
          <img
            src={comment?.post?.coverImgUrl || Back}
            alt={comment?.post?.title}
            className="w-8 h-8 rounded object-cover"
          />
          <span className="text-sm font-semibold">{comment?.post?.title}</span>
        </div>
      </div>
    </div>
  );
};

export default TopCommentsCard;
