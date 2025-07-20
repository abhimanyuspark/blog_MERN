import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useState, useCallback } from "react";
import { Label } from "./Inputs";

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
  const [isReady, setIsReady] = useState(false);

  // Memoized handlers to prevent unnecessary re-renders
  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  // Wait for quill to be ready before setting up
  useEffect(() => {
    if (quill) {
      setIsReady(true);
    }
  }, [quill]);

  // Set initial value if provided - only when quill is ready
  useEffect(() => {
    if (quill && isReady && value !== undefined) {
      const currentHTML = quill.root.innerHTML;
      // Only update if content is actually different
      if (currentHTML !== value && value !== currentHTML) {
        // Use quill's clipboard module for better HTML parsing
        quill.clipboard.dangerouslyPasteHTML(value);
      }
    }
  }, [quill, value, isReady]);

  // Listen for changes and call onChange
  useEffect(() => {
    if (quill && isReady && onChange) {
      const handler = () => {
        const html = quill.root.innerHTML;
        onChange(html);
      };

      quill.on("text-change", handler);

      return () => {
        quill.off("text-change", handler);
      };
    }
  }, [quill, onChange, isReady]);

  // Focus/blur handlers with better cleanup
  useEffect(() => {
    const editor = quillRef.current;
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
