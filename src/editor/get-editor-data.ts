import path from "path";
import { readFile } from "node:fs/promises";
import fs from "fs";

const dirPath = path.join(process.cwd(), "./src/content-editor");

export async function getEditorData(): Promise<
  { language: "typescript" | "javascript"; content: string }[]
> {
  const files = fs.readdirSync(dirPath);
  const result: { language: "typescript" | "javascript"; content: string }[] =
    [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);

    if (file.endsWith(".ts")) {
      const content = await readFile(filePath, "utf-8");
      result.push({
        language: "typescript",
        content,
      });
    } else if (file.endsWith(".js")) {
      const content = await readFile(filePath, "utf-8");
      result.push({
        language: "javascript",
        content,
      });
    }
  }

  return result;
}
