import path from "path";
import { readFile } from "node:fs/promises";
import fs from "fs";
import { EditorData } from "@/javascript-challenges/types";

const dirPath = path.join(process.cwd(), "./src/content-editor");

export async function javascriptChallengesData(): Promise<EditorData[]> {
  const files = fs.readdirSync(dirPath);
  const result: EditorData[] = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const slug = path.basename(file, path.extname(file));

    if (file.endsWith(".ts")) {
      const content = await readFile(filePath, "utf-8");
      result.push({
        slug,
        language: "typescript",
        content,
      });
    } else if (file.endsWith(".js")) {
      const content = await readFile(filePath, "utf-8");
      result.push({
        slug,
        language: "javascript",
        content,
      });
    }
  }

  return result;
}
