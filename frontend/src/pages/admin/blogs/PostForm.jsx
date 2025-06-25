import { useEffect, useState } from "react";
import { validateForm } from "../../../utils/validations";
import { Button } from "../../../components/@comp/Buttons";
import { Input } from "../../../components/@comp/Inputs";
import { BlogLoader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  fetchBlogById,
  updateBlog,
} from "../../../redux/features/blogSlice";

const PostForm = ({ id }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blog);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isDraft: false,
    tags: [],
  });
  const [formError, setFormError] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setFormError((p) => ({ ...p, [name]: "" }));
  };

  const onCreate = () => {
    console.log(formData);
    // dispatch(createBlog(formData));
  };

  const onUpdate = (id) => {
    console.log(formData, id);
    // dispatch(updateBlog(formData));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const error = validateForm(formData);

    const isValidate = Object.keys(error).length !== 0;

    if (isValidate) {
      setFormError(error);
      return null;
    }

    if (id) {
      onUpdate(id);
    } else {
      onCreate();
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id))
        .then((res) => {
          const data = res.payload;
          setFormData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, dispatch]);

  return (
    <div className="p-4">
      {!loading && <BlogLoader />}
      <form onSubmit={onSubmit}>
        <div>
          <Input
            important
            value={formData.title}
            error={formError.title}
            name="title"
            label="Title"
            onChange={onChange}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default PostForm;
