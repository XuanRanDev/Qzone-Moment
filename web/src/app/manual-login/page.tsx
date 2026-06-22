import type { Metadata } from "next";
import MarkdownPage from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "手动登录教程 - QQ空间时光机",
  description: "QQ空间时光机手动登录使用教程。",
};

export default function ManualLoginPage() {
  return <MarkdownPage filename="manual_login.md" />;
}
