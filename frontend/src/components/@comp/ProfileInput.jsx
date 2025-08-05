import { useEffect, useRef, useState } from "react";
import { FiPlus, FiTrash, FiEdit } from "react-icons/fi";
import { Label } from "./Inputs";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/features/authSlice";
import toast from "react-hot-toast";
import { Logo } from "../../assets/index";

const ProfileInput = ({ label = "Profile Image", file }) => {
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

        const formData = { profilePic: event.target.result };

        await dispatch(updateProfile(formData))
          .then((res) => {
            // console.log(res);
            toast.success("Profile image updated successfully!");
          })
          .catch((err) => {
            // console.error(err);
            toast.error("Failed to update profile image.");
          });

        setLoading(false);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleDelete = () => {
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

      <div className="flex items-center justify-center">
        <div className="relative">
          {preview && (
            <button
              type="button"
              onClick={handleDelete}
              className="absolute top-2 right-2 z-[1] btn btn-error btn-md btn-circle"
              title="Delete"
            >
              <FiTrash />
            </button>
          )}

          <div className="border border-primary rounded-full overflow-hidden size-60 loader">
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
                <div className="size-10 flex items-center justify-center bg-base-200 rounded-full">
                  <FiPlus className="text-3xl text-base-content/80" />
                </div>
              </label>
            ) : (
              <div className="size-full cursor-pointer group">
                <img
                  src={preview || Logo}
                  onError={(e) => (e.currentTarget.src = Logo)}
                  alt="Preview"
                  className="size-full object-cover"
                />
                <label className="group-hover:flex hidden absolute top-0 left-0 flex-col items-center justify-center w-full h-full cursor-pointer bg-black/60 rounded-full">
                  <span className="text-base-content/50 text-center font-medium mb-2">
                    Click for change image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    ref={inputRef}
                    className="hidden"
                  />
                  <div className="size-12 flex items-center bg-info justify-center rounded-full">
                    <FiEdit className="text-xl text-info-content" />
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInput;
