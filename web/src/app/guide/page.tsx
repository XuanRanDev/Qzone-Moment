import type { Metadata } from "next";
import MarkdownPage from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "使用指南 - QQ空间时光机",
  description: "QQ空间时光机使用教程，从下载到导出的完整指南。",
};

export default function GuidePage() {
  return <MarkdownPage filename="guide.md" />;
}
