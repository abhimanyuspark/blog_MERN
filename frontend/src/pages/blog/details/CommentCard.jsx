import { FiChevronDown, FiChevronUp, FiTrash } from "react-icons/fi";
import CommentReplyInput from "../../admin/comments/CommentReplyInput";
import { LuReply } from "react-icons/lu";
import { Logo } from "../../../assets";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CommentCard = ({
  index,
  reply,
  onReply,
  comment,
  onDelete,
  replies,
  onReplies,
}) => {
  const { user } = useSelector((state) => state.auth);
  const naviagte = useNavigate();

  return (
    <div>
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
              onClick={() => {
                if (user) {
                  onReply();
                } else {
                  toast.error("Please log in to add a comment.");
                  naviagte(`/login`);
                }
              }}
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
            {user?._id === comment?.author?._id && (
              <button
                className="badge badge-sm badge-accent cursor-pointer rounded-md hover:badge-error"
                onClick={() => onDelete(comment?._id)}
              >
                <FiTrash />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {user && index === reply && (
        <div className="pl-12 pt-4">
          <CommentReplyInput
            postId={comment?.post?._id}
            onReply={onReply}
            parentComment={comment?.content}
            author={comment?.author}
            parentId={comment?._id}
          />
        </div>
      )}

      {index === replies && (
        <div className="flex flex-col gap-2 p-2 pl-10">
          {comment?.replies?.map((r) => (
            <div key={r?._id} className="flex gap-3 items-start">
              <img
                className="rounded-full size-10"
                src={r?.author?.profilePic || Logo}
                onError={(e) => (e.currentTarget.src = Logo)}
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

                {user?._id === r?.author?._id && (
                  <button
                    className="badge badge-sm badge-accent cursor-pointer rounded-md hover:badge-error"
                    onClick={() => onDelete(r?._id)}
                  >
                    <FiTrash />
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
