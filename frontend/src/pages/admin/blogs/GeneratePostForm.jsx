import { useState } from "react";
import { validateForm } from "../../../utils/validations";
import { Button } from "../../../components/@comp/Buttons";
import { Input } from "../../../components/@comp/Inputs";
import axiosInstance from "../../../lib/axios";
import { API_ROUTES } from "../../../lib/routes";

const GeneratePostForm = ({ postContent, onPostChange, onClose }) => {
  const [formData, setFormData] = useState({
    title: postContent?.title || "How to create a React App",
    tone: postContent?.tone || "beginner-friendly",
  });
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setFormError((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm(formData);
    const isValid = Object.keys(error).length === 0;

    if (!isValid) {
      setFormError(error);
      return null;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.post(
        API_ROUTES.AI.GEN_BLOG_POST,
        formData
      );

      const content = response.data;
      const title = formData.title;
      const tags = postContent?.tags;
      onPostChange({ title, content, tags });
      onClose();
    } catch (err) {
      setError("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <Input
        label="Title"
        name="title"
        important
        value={formData.title}
        error={formError?.title}
        onChange={onChange}
      />

      <Input
        label="Tone"
        name="tone"
        important
        value={formData.tone}
        onChange={onChange}
      />

      {error && <div className="text-red-600">{error}</div>}

      <Button type="submit" className="w-full btn-primary" loading={loading}>
        {loading ? "Generating..." : "Generate"}
      </Button>
    </form>
  );
};

export default GeneratePostForm;
