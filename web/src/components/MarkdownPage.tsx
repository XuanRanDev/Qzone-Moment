import fs from "fs";
import path from "path";
import MarkdownClientPage from "./MarkdownClientPage";

interface MarkdownPageProps {
  filename: string;
}

export default function MarkdownPage({ filename }: MarkdownPageProps) {
  const filePath = path.join(process.cwd(), "src", "content", filename);
  const content = fs.readFileSync(filePath, "utf-8");

  return <MarkdownClientPage content={content} />;
}
