import { lazy, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const CodeBlock = lazy(() => import("./CodeBlock"));

const Loading = () => {
  return (
    <p className="text-base p-4 flex gap-3 items-center justify-center">
      <span className="loading loading-spinner loading-xl"></span>
      <span>Loading Content...</span>
    </p>
  );
};

const MarkDown = ({ content, theme }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4 w-full max-w-full px-2 py-2">
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
                  <code
                    className={`rounded px-1 py-0.5 bg-base-200 text-base-content/90 font-mono text-sm break-words ${
                      className || ""
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
            },
            a({ node, inline, className, children, ...props }) {
              return (
                <a
                  className="link-primary hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              );
            },
            ol({ node, inline, className, children, ...props }) {
              return (
                <ol
                  className="sm:pl-10 pl-5 flex flex-col gap-1 list-decimal text-base-content/70"
                  {...props}
                >
                  {children}
                </ol>
              );
            },
            ul({ node, inline, className, children, ...props }) {
              return (
                <ul
                  className="sm:pl-10 pl-5 flex flex-col gap-1 list-disc text-base-content/70"
                  {...props}
                >
                  {children}
                </ul>
              );
            },
            h1({ node, inline, className, children, ...props }) {
              return (
                <h1
                  className="font-bold text-2xl sm:text-3xl leading-tight mt-4 mb-2 text-base-content"
                  {...props}
                >
                  {children}
                </h1>
              );
            },
            h2({ node, inline, className, children, ...props }) {
              return (
                <h2
                  className="font-semibold text-xl sm:text-2xl leading-snug mt-4 mb-2 text-base-content"
                  {...props}
                >
                  {children}
                </h2>
              );
            },
            h3({ node, inline, className, children, ...props }) {
              return (
                <h3
                  className="font-semibold text-lg sm:text-xl leading-snug mt-3 mb-1 text-base-content"
                  {...props}
                >
                  {children}
                </h3>
              );
            },
            p({ node, inline, className, children, ...props }) {
              return (
                <div
                  className="text-base-content/80 leading-relaxed mb-2 break-words"
                  {...props}
                >
                  {children}
                </div>
              );
            },
            em({ node, inline, className, children, ...props }) {
              return (
                <em
                  className="text-base-content italic font-semibold"
                  {...props}
                >
                  {children}
                </em>
              );
            },
            strong({ node, inline, className, children, ...props }) {
              return (
                <strong className="text-base-content font-semibold" {...props}>
                  {children}
                </strong>
              );
            },
            blockquote({ node, children, ...props }) {
              return (
                <blockquote
                  className="border-l-4 border-primary pl-4 italic text-base-content/70 bg-base-200 rounded-md my-2 py-2"
                  {...props}
                >
                  {children}
                </blockquote>
              );
            },
            hr() {
              return <hr className="my-6 border-base-300" />;
            },
            table({ children, ...props }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table
                    className="min-w-full border border-base-300 rounded-md"
                    {...props}
                  >
                    {children}
                  </table>
                </div>
              );
            },
            th({ children, ...props }) {
              return (
                <th
                  className="px-4 py-2 bg-base-200 text-base-content font-semibold border border-base-300"
                  {...props}
                >
                  {children}
                </th>
              );
            },
            td({ children, ...props }) {
              return (
                <td className="px-4 py-2 border border-base-300" {...props}>
                  {children}
                </td>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </Suspense>
  );
};

export default MarkDown;
