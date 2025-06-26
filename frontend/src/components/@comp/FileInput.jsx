import { useEffect, useRef, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Label } from "./Inputs";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../redux/features/blogSlice";

const FileInput = ({ label, file, onChange }) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadstart = () => {
        setLoading(true);
      };
      reader.onloadend = async (event) => {
        setPreview(event.target.result);

        const formData = { coverImgUrl: event.target.result };

        await dispatch(uploadImage(formData))
          .then((res) => {
            console.log(res);
            onChange(res.payload.coverImgUrl);
          })
          .catch((err) => console.log(err));

        setLoading(false);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      onChange(null);
      setPreview(null);
    }
  };

  const handleDelete = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    if (typeof file === "string") {
      setPreview(file); // file is a URL
    } else if (file instanceof File) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="flex gap-2 flex-col">
      <Label label={label} name={label} />

      <div className="w-full border border-dashed border-primary rounded">
        <div className="relative flex flex-col items-center h-60">
          {loading ? (
            <div className="flex size-full text-xl items-center justify-center">
              Uploading...
            </div>
          ) : !preview ? (
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
              <span className="text-base-content/50 font-medium mb-2">
                Choose Image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                ref={inputRef}
                className="hidden"
              />
              <div className="w-15 h-15 flex items-center justify-center bg-base-200 rounded-full">
                <FiPlus className="text-3xl text-base-content/80" />
              </div>
            </label>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center">
              <img src={preview} alt="Preview" className="rounded size-full" />
              <button
                type="button"
                onClick={handleDelete}
                className="absolute top-2 right-2 btn btn-error btn-md"
                title="Delete"
              >
                <FiTrash />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileInput;
