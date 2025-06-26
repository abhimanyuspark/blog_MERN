import { useEffect, useState } from "react";
import { validateForm } from "../../../utils/validations";
import { Button } from "../../../components/@comp/Buttons";
import { Input } from "../../../components/@comp/Inputs";
import {
  BlogLoader,
  Editor,
  FileInput,
  GenreateIdeasCard,
  PostFormDrawer,
  TagInput,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  fetchBlogById,
  updateBlog,
} from "../../../redux/features/blogSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { Back } from "../../../assets";
import { FiSave, FiSend } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import axiosInstance from "../../../lib/axios";
import { API_ROUTES } from "../../../lib/routes";
import GenreatePostForm from "./GenreatePostForm";

const PostForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.blog);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImgUrl: "",
    isDraft: false,
    tags: [],
    generatedByAi: false,
  });
  const [formError, setFormError] = useState({});

  const [postIdeas, setPostsIdeas] = useState([]);
  const [postIdeasDrawer, setPostsIdeasDrawer] = useState(false);
  const [postsIdeasLoading, setPostsIdeasLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setFormError((p) => ({ ...p, [name]: "" }));
  };

  const onCreate = async (submitData) => {
    await toast.promise(dispatch(createBlog(submitData)), {
      loading: "Creating...",
      success: "Created successfull",
      error: (err) => err,
    });
  };

  const onUpdate = async (submitData) => {
    await toast.promise(dispatch(updateBlog({ id, data: submitData })), {
      loading: "Updating...",
      success: "Update successfull",
      error: (err) => err,
    });
  };

  const onSubmit = async (e, isDraft) => {
    e.preventDefault();
    const error = validateForm(formData);
    const isValidate = Object.keys(error).length !== 0;

    if (isValidate) {
      setFormError(error);
      return null;
    }

    const submitData = { ...formData, isDraft };

    if (id) {
      await onUpdate(submitData);
    } else {
      await onCreate(submitData);
    }

    navigate(-1);
  };

  const onGenreateIdeas = async () => {
    setPostsIdeasLoading(true);
    try {
      const response = await axiosInstance.post(
        API_ROUTES.AI.GEN_BLOG_POST_IDEAS,
        {
          topic: "React Js, Next Js, Node Js,React UI Components, Mongo DB",
          count: 5,
        }
      );
      // console.log(response.data);
      setPostsIdeas(response.data);
      setPostsIdeasLoading(false);
    } catch (error) {
      console.log(error);
      setPostsIdeasLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id))
        .then((res) => {
          const data = res.payload;
          setFormData({
            title: data?.title,
            content: data?.content,
            coverImgUrl: data?.coverImgUrl,
            tags: data?.tags,
            isDraft: data?.isDraft,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // onGenreateIdeas();
    }

    return () => {};
  }, [id, dispatch]);

  return (
    <div
      className={`grid grid-cols-1 ${
        id ? "sm:grid-cols-1" : "sm:grid-cols-[60%_1fr]"
      }  gap-6`}
    >
      {/* Post Form */}
      <div className="p-4 flex flex-col gap-4 border border-base-300 rounded-lg bg-base-100">
        <div>
          <h3 className="font-semibold">
            {id ? "Update Blog Post" : "Create Blog Post"}
          </h3>
        </div>
        {loading && <BlogLoader />}
        <form
          onSubmit={(e) => {
            onSubmit(e, false);
          }}
          className="flex gap-4 flex-col"
        >
          <Input
            important
            value={formData.title}
            error={formError.title}
            name="title"
            label="Title"
            onChange={onChange}
          />

          <FileInput
            file={formData.coverImgUrl || Back}
            onChange={(img) => {
              setFormData((p) => ({ ...p, coverImgUrl: img }));
            }}
          />

          <Editor
            label="Content"
            value={formData.content}
            onChange={(d) => {
              setFormData((p) => ({ ...p, content: d }));
            }}
          />

          <TagInput
            tags={formData.tags || []}
            onChange={(d) => {
              setFormData((p) => ({ ...p, tags: d }));
            }}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={(e) => {
                onSubmit(e, true);
              }}
              className="btn-secondary"
              loading={loading}
            >
              <FiSave className="text-xl mr-0.5" />
              Draft
            </Button>
            <Button type="submit" className="btn-accent" loading={loading}>
              <FiSend className="text-xl mr-0.5" />
              Publish
            </Button>
            <Button
              className="btn-soft"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* Genreate Ai Ideas */}
      {!id && (
        <div className="flex flex-col gap-4 border border-base-300 rounded-lg p-4 bg-base-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <LuSparkles />{" "}
              <span className="text-sm">Ideas for your next post</span>
            </div>
            <div>
              <Button
                onClick={() => {
                  setPostsIdeasDrawer(!postIdeasDrawer);
                }}
                className="btn-accent btn-sm"
              >
                Genreate New
              </Button>
            </div>
          </div>

          <div>
            {postsIdeasLoading ? (
              <div className="flex items-center justify-center size-full">
                Genreating...
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {postIdeas?.map((idea, index) => (
                  <GenreateIdeasCard
                    idea={idea}
                    key={index}
                    onClick={() => {
                      setFormData({
                        title: idea?.title,
                        content: idea?.content,
                        tags: idea?.tags,
                        generatedByAi: true,
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <PostFormDrawer
        open={postIdeasDrawer}
        setClose={() => {
          setPostsIdeasDrawer(!postIdeasDrawer);
        }}
      >
        <GenreatePostForm />
      </PostFormDrawer>
    </div>
  );
};

export default PostForm;
