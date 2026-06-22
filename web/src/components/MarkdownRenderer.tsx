"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

interface MarkdownRendererProps {
  content: string;
}

function transformHref(href: string): string {
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
    return href;
  }
  let result = href
    .replace(/\.md$/, "")
    .replace(/\.md#/, "#")
    .replace(/\.md\?/, "?");
  if (result.startsWith("/manual_login")) {
    result = result.replace("/manual_login", "/manual-login");
  }
  return result;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const router = useRouter();

  const handleLinkClick = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("http") || href.startsWith("mailto:")) return;
    e.preventDefault();
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          h1: ({ children, ...props }) => (
            <h1
              className="text-3xl sm:text-4xl font-bold mt-10 mb-6 pb-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, id, ...props }) => (
            <h2
              id={id}
              className="text-2xl font-bold mt-10 mb-4 pb-2 border-b border-gray-100 dark:border-gray-800 scroll-mt-20 group"
              {...props}
            >
              <a href={`#${id}`} className="no-underline group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {children}
              </a>
            </h2>
          ),
          h3: ({ children, id, ...props }) => (
            <h3
              id={id}
              className="text-xl font-semibold mt-6 mb-3 scroll-mt-20 group"
              {...props}
            >
              <a href={`#${id}`} className="no-underline group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {children}
              </a>
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="my-3 leading-7 text-gray-700 dark:text-gray-300" {...props}>
              {children}
            </p>
          ),
          a: ({ href: rawHref, children, ...props }) => {
            const href = rawHref ? transformHref(rawHref) : "#";
            const isExternal = href.startsWith("http") || href.startsWith("mailto:");
            return (
              <a
                href={href}
                onClick={handleLinkClick(href)}
                className="relative text-blue-600 dark:text-blue-400 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...props}
              >
                {children}
                {isExternal && (
                  <svg className="inline-block w-3 h-3 ml-0.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </a>
            );
          },
          ul: ({ children, ...props }) => (
            <ul className="my-3 ml-6 list-none space-y-2 text-gray-700 dark:text-gray-300" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="my-3 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-7 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:rounded-full" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="my-5 pl-5 border-l-4 border-transparent bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 py-3 pr-4 rounded-r-xl text-gray-600 dark:text-gray-400"
              style={{ borderImage: "linear-gradient(to bottom, #3b82f6, #a855f7) 1" }}
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-md text-sm font-mono text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <pre
              className="my-4 p-5 bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-2xl overflow-x-auto text-sm leading-relaxed border border-gray-800 dark:border-gray-700 shadow-xl"
              {...props}
            >
              {children}
            </pre>
          ),
          table: ({ children, ...props }) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full border-collapse" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 border-b border-gray-200 dark:border-gray-700 font-semibold text-left text-sm"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
              {...props}
            >
              {children}
            </td>
          ),
          hr: (props) => (
            <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" {...props} />
          ),
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt || ""}
              className="my-6 max-w-full rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800"
              loading="lazy"
              {...props}
            />
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </strong>
          ),
          del: ({ children, ...props }) => (
            <del className="text-gray-400 dark:text-gray-600 line-through" {...props}>
              {children}
            </del>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
