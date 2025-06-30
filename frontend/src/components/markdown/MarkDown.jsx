import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkDown = ({ content, theme }) => {
  const cleanedMarkdown = content
    ?.replace(/^<p>/, "") // remove the first <p>
    ?.replace(/<\/p>$/, ""); // remove the last </p>

  // Use cleanedMarkdown directly for rendering
  const sanitized = cleanedMarkdown || "";

  return (
    <div className="flex gap-4 flex-col">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            if (!inline) {
              return (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                  theme={theme}
                />
              );
            } else {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          },
          p({ node, inline, className, children, ...props }) {
            return <div {...props}>{children}</div>;
          },
          ol({ node, inline, className, children, ...props }) {
            return (
              <ol className="pl-15 flex gap-2 flex-col" {...props}>
                {children}
              </ol>
            );
          },
          ul({ node, inline, className, children, ...props }) {
            return (
              <ul className="pl-15 flex gap-2 flex-col" {...props}>
                {children}
              </ul>
            );
          },
        }}
      >
        {sanitized}
      </ReactMarkdown>
    </div>
  );
};

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
    <div className="bg-base-300 overflow-hidden rounded-lg my-4">
      <div className="flex justify-between items-center p-4 bg-base-100 text-sm">
        <span className="font-mono text-sm text-base-content/70">
          {language || "Code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-base-200 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <FiCheck className="text-green-500" />
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <FiCopy />
              <span>Copy</span>
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
          fontSize: "1rem",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default MarkDown;
