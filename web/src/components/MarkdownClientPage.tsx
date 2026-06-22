"use client";

import MarkdownRenderer from "@/components/MarkdownRenderer";
import TextReveal from "@/components/TextReveal";

interface Props {
  content: string;
}

export default function MarkdownClientPage({ content }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <TextReveal>
        <article className="bg-white dark:bg-gray-900/30 rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-white/[0.06] shadow-xl shadow-gray-200/20 dark:shadow-black/20">
          <MarkdownRenderer content={content} />
        </article>
      </TextReveal>
    </div>
  );
}
