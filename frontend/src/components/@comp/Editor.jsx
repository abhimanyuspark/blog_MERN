import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import { Label } from "./Inputs";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "code"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "align",
  "list",
  "indent",
  "size",
  "header",
  "link",
  "image",
  "video",
  "color",
  "background",
];

const Editor = ({ value, onChange, label, error }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2 relative size-full">
      <div>
        <Label label={label} important />
      </div>
      <div
        className={`w-full h-full rounded border ${
          focused ? "outline-2 outline-offset-2" : "outline-none"
        } ${
          error
            ? "outline-2 outline-error outline-offset-2 border-error"
            : "border-primary outline-primary"
        }`}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="size-full"
        />
      </div>
      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
};

export default Editor;
