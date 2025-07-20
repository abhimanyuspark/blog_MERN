import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useEffect, useState } from "react";
import { Label } from "./Inputs";

// Fix: Attach Quill globally for react-quilljs
if (typeof window !== "undefined" && !window.Quill) {
  window.Quill = Quill;
}

const Editor = ({ value, onChange, label, error }) => {
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

  // Set initial value
  useEffect(() => {
    if (quill && value !== undefined) {
      if (quill.root.innerHTML !== value) {
        quill.root.innerHTML = value;
      }
    }
  }, [quill, value]);

  // Listen for changes
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

  // Focus/blur
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
      <div
        onClick={() => {
          handleFocus();
          quill.root.focus();
        }}
      >
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
        <div className="size-full" ref={quillRef} />
      </div>
      <div className="text-error text-sm">{error}</div>
    </div>
  );
};

export default Editor;
