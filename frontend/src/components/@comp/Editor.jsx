import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "react-quilljs/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { Label } from "./Inputs";

const Editor = ({ value, onChange, label }) => {
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
  const { quill, quillRef } = useQuill({ modules, formats });
  const [focused, setFocused] = useState(false);

  // Set initial value if provided
  useEffect(() => {
    if (quill && value !== undefined) {
      if (quill.root.innerHTML !== value) {
        quill.root.innerHTML = value;
      }
    }
  }, [quill, value]);

  // Listen for changes and call onChange
  useEffect(() => {
    if (quill && onChange) {
      const handler = () => {
        onChange(quill.root.innerHTML);
      };
      quill.on("text-change", handler);
      return () => {
        quill.off("text-change", handler);
      };
    }
  }, [quill, onChange]);

  // Focus/blur handlers
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  useEffect(() => {
    const editor = quillRef.current;
    if (editor) {
      editor.addEventListener("focusin", handleFocus);
      editor.addEventListener("focusout", handleBlur);
      return () => {
        editor.removeEventListener("focusin", handleFocus);
        editor.removeEventListener("focusout", handleBlur);
      };
    }
  }, [quillRef]);

  return (
    <div className="flex flex-col gap-2 relative size-full">
      <Label label={label} important />
      <div
        className={`w-full h-full rounded border border-primary ${
          focused
            ? "outline-2 outline-primary outline-offset-2"
            : "outline-none"
        }`}
      >
        <div className="size-full" ref={quillRef} />
      </div>
    </div>
  );
};

export default Editor;
