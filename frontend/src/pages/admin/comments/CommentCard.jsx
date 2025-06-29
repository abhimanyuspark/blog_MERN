import { FiChevronDown, FiChevronUp, FiTrash } from "react-icons/fi";
import { LuReply } from "react-icons/lu";
import { Back, Logo } from "../../../assets";
import CommentReplyInput from "./CommentReplyInput";

const CommentCard = ({
  comment,
  onDelete,
  index,
  onReply,
  reply,
  onReplies,
  replies,
}) => {
  return (
    <div className="flex sm:flex-row-reverse gap-4 sm:gap-0 flex-col justify-between hover:bg-base-300 py-2 px-3 rounded-lg w-full">
      <div className="flex gap-4 w-full sm:w-[35%]">
        <img
          className="rounded-lg w-14 h-10"
          src={comment?.post?.coverImgUrl || Back}
        />
        <div className="line-clamp-none sm:line-clamp-2 leading-4 text-sm text-base-content/80">
          {comment?.post?.title || "Title"}
        </div>
      </div>

      <div className="w-full sm:w-[65%]">
        <div className="flex gap-3 items-start">
          <img
            className="rounded-full size-10 object-contain"
            alt="profile"
            src={comment.author.profilePic || Logo}
            onError={(e) => {
              e.currentTarget.src = Logo;
            }}
          />

          <div className="flex flex-col gap-1">
            <div className="text-xs text-base-content/50 flex items-center gap-2">
              <span className="text-base-content/70">
                @{comment?.author?.fullName}
              </span>
              <span>.</span>
              <span>
                {new Date(comment?.createdAt).toLocaleDateString(undefined, {
                  month: "numeric",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm first-letter:uppercase">{comment?.content}</p>
            <div className="flex items-center gap-2">
              <span
                onClick={onReply}
                className="badge badge-sm badge-accent cursor-pointer rounded-md"
              >
                <LuReply />
                Reply
              </span>
              <span
                onClick={onReplies}
                className="badge badge-sm badge-accent cursor-pointer rounded-md"
              >
                {comment?.replies?.length} replies{" "}
                {replies === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
              <span
                className="badge badge-sm badge-accent cursor-pointer rounded-md"
                onClick={() => onDelete(comment?._id)}
              >
                <FiTrash />
                Delete
              </span>
            </div>
          </div>
        </div>

        {index === reply && (
          <CommentReplyInput
            postId={comment?.post?._id}
            onReply={onReply}
            parentComment={comment?.content}
            author={comment?.author}
            parentId={comment?._id}
          />
        )}

        {index === replies && (
          <div className="flex flex-col gap-2 p-2 pl-10">
            {comment?.replies?.map((r) => (
              <div key={r?._id} className="flex gap-3 items-start">
                <img
                  className="rounded-full size-10"
                  src={r?.author?.profilePic}
                />

                <div className="flex flex-col gap-1">
                  <div className="text-xs text-base-content/50 flex items-center gap-2">
                    <span className="text-base-content/70">
                      @{r?.author?.fullName}
                    </span>
                    <span>.</span>
                    <span>
                      {new Date(r?.createdAt).toLocaleDateString(undefined, {
                        month: "numeric",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm first-letter:uppercase">{r?.content}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className="badge badge-sm badge-accent cursor-pointer rounded-md"
                      onClick={() => onDelete(r?._id)}
                    >
                      <FiTrash />
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
