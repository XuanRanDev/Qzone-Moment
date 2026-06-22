import type { Metadata } from "next";
import MarkdownPage from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "更新日志 - QQ空间时光机",
  description: "QQ空间时光机版本更新历史。",
};

export default function ChangelogPage() {
  return <MarkdownPage filename="changelog.md" />;
}
