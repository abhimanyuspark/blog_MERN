import { useState } from "react";
import { Button } from "../../../components/@comp/Buttons";
import { FiChevronDown, FiChevronUp, FiTrash } from "react-icons/fi";

const CommentCard = ({ comment, onDelete }) => {
  const [replies, setReplies] = useState(false);

  return (
    <div className="flex flex-col gap-2 hover:bg-base-300 py-2 px-3 rounded-lg">
      <div className="flex justify-between items-center">
        <div>{comment?.content}</div>
        <div>
          <Button onClick={onDelete} className="btn-error">
            <FiTrash />
          </Button>
        </div>
      </div>

      {comment?.replies?.length > 0 && (
        <div
          className="flex gap-2 items-center cursor-pointer text-sm text-primary"
          onClick={() => {
            setReplies(!replies);
          }}
        >
          Replies {replies ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      )}

      {replies && (
        <div className="flex flex-col gap-2 p-2 pl-10">
          {comment?.replies?.map((r) => (
            <div key={e?._id}>{r?.content}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
