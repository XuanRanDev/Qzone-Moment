import type { Metadata } from "next";
import MarkdownPage from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "常见问题 - QQ空间时光机",
  description: "QQ空间时光机常见问题解答。",
};

export default function FaqPage() {
  return <MarkdownPage filename="faq.md" />;
}
