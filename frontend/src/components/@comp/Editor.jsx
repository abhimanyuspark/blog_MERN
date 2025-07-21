import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt();

const MarkdownEditor = ({ value, onChange, label = "Description", error }) => {
  // Handle editor change: pass raw Markdown to parent
  const handleEditorChange = ({ text }) => {
    onChange(text);
  };

  return (
    <div className="mb-4">
      <label
        className="mb-2 text-base font-medium cursor-pointer flex gap-2"
        onClick={() => {
          // Focus textarea inside MdEditor when clicking label
          const textarea = document.querySelector(".rc-md-editor textarea");
          if (textarea) textarea.focus();
        }}
      >
        {label}
        <sup className="text-red-500 text-base static">*</sup>
      </label>

      <div
        className={`border rounded-lg outline-2 outline-offset-2  overflow-hidden not-focus-within:outline-none ${
          error
            ? "border-error focus-within:outline-error"
            : "border-primary focus-within:outline-primary"
        }`}
      >
        <MdEditor
          value={value}
          style={{ minHeight: "200px", height: "100%" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          placeholder="Write in Markdown..."
        />
      </div>

      {error && <p className="text-base text-error mt-2">{error}</p>}
    </div>
  );
};

export default MarkdownEditor;
