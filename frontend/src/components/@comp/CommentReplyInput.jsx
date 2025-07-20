import { useState } from "react";
import { Input } from "./Inputs";
import { Button } from "./Buttons";
import { LuSparkles } from "react-icons/lu";
import axiosInstance from "../../lib/axios";
import { API_ROUTES } from "../../lib/routes";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/features/commentSlice";
import Avatar from "./Avatar";

const CommentReplyInput = ({
  postId,
  author,
  parentComment,
  onReply,
  parentId,
}) => {
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const [generating, setGenerating] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      setTextError("Text is Required");
      return null;
    }

    dispatch(
      addComment({
        postId,
        parentComment: parentId,
        content: text,
      })
    );

    setText("");
  };

  const onGenerate = async () => {
    setGenerating(true);

    try {
      const response = await axiosInstance.post(
        API_ROUTES.AI.GEN_COMMENTS_REPLY,
        { author, content: parentComment }
      );
      setText(response.data);
    } catch (error) {
      setTextError(error?.message || error?.error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex gap-2 items-start w-full">
      <Avatar author={user} />

      <div className="w-full flex justify-between gap-2 flex-col">
        <div className="flex justify-between gap-2 items-start sm:items-center sm:flex-row flex-col">
          <span className="text-xs block text-base-content/70">
            @{user?.fullName}
          </span>
          {parentComment && (
            <Button
              loading={generating}
              className="btn-xs btn-accent"
              onClick={onGenerate}
            >
              <LuSparkles />
              Generate Reply
            </Button>
          )}
        </div>

        <form onSubmit={onSubmit} className="">
          <Input
            value={text}
            error={textError}
            placeholder="Add a reply"
            className={"w-30"}
            onChange={(e) => {
              const value = e.target.value;
              setText(value);
            }}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={() => {
                setText("");
                onReply();
              }}
              className="btn-sm"
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-sm btn-primary">
              Reply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentReplyInput;
