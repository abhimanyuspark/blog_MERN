import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState } from "react";
import { FiCopy, FiCheck, FiCode } from "react-icons/fi";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code, language, theme }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div className="bg-base-300 overflow-x-auto rounded-xl my-4 shadow-sm border border-base-200">
      <div className="flex justify-between items-center px-3 py-2 bg-base-200 border-b border-base-200">
        <span className="font-mono text-sm text-base-content/70 flex gap-2 items-center">
          <FiCode />
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="btn btn-ghost btn-xs flex items-center gap-1"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <FiCheck className="text-green-500" />
              <span className="text-green-500 text-xs">Copied</span>
            </>
          ) : (
            <>
              <FiCopy />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme ? oneLight : oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.8rem",
          background: "transparent",
          minWidth: "100%",
        }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
