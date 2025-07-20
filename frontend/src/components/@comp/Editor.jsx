import { useEffect, useState, useCallback } from "react";
import { Label } from "./Inputs";

// Prevent import crash on SSR or production build
let useQuill;
if (typeof window !== "undefined") {
  // Only import on client
  const quilljs = require("react-quilljs");
  require("quill/dist/quill.snow.css");
  useQuill = quilljs.useQuill;
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

  const { quill, quillRef } = useQuill
    ? useQuill({ modules, formats })
    : { quill: null, quillRef: { current: null } };

  const [focused, setFocused] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  useEffect(() => {
    if (quill) {
      setIsReady(true);
    }
  }, [quill]);

  useEffect(() => {
    if (quill && isReady && value !== undefined) {
      const currentHTML = quill.root.innerHTML;
      if (currentHTML !== value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }
    }
  }, [quill, value, isReady]);

  useEffect(() => {
    if (quill && isReady && onChange) {
      const handler = () => {
        const html = quill.root.innerHTML;
        onChange(html);
      };
      quill.on("text-change", handler);
      return () => quill.off("text-change", handler);
    }
  }, [quill, onChange, isReady]);

  useEffect(() => {
    const editor = quillRef?.current;
    if (editor && isReady) {
      editor.addEventListener("focusin", handleFocus);
      editor.addEventListener("focusout", handleBlur);
      return () => {
        editor.removeEventListener("focusin", handleFocus);
        editor.removeEventListener("focusout", handleBlur);
      };
    }
  }, [quillRef, handleFocus, handleBlur, isReady]);

  const handleLabelClick = useCallback(() => {
    if (quill && isReady) {
      handleFocus();
      quill.focus();
    }
  }, [quill, handleFocus, isReady]);

  // Fallback for SSR / first render
  if (!useQuill) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="flex flex-col gap-2 relative size-full">
      <div onClick={handleLabelClick}>
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
      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
};

export default Editor;
