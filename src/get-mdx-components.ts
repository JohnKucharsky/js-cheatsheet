import fs from "fs";
import path from "path";
import { VFile } from "vfile";

export async function getMDXComponents() {
  const folderPath = path.join(process.cwd(), "./src/content/design");
  const fileNames = fs.readdirSync(folderPath);
  const mdxComponents: VFile[] = [];

  for (const fileName of fileNames) {
    if (fileName.endsWith(".mdx")) {
      // const filePath = path.join(folderPath, fileName);
      // const fileContent = await fs.readFile(filePath, "utf-8");
      // const MDXContent = (
      //   await evaluate(
      //     { path: filePath, value },
      //     { ...runtime, baseUrl: import.meta.url },
      //   )
      // ).default;
      // mdxComponents.push(file);
    }
  }

  return mdxComponents;
}
