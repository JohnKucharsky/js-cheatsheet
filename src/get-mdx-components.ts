import fs from "fs";
import path from "path";
import { evaluate, EvaluateOptions } from "@mdx-js/mdx";
import { MDXContent } from "mdx/types";
import { readFile } from "node:fs/promises";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { SectionNameEnum } from "@/common/types";

const contentDirectory = path.join(process.cwd(), "./src/content");

const getAllFiles = (
  dirPath: string,
  arrayOfFiles: string[] = [],
): string[] => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else if (filePath.endsWith(".mdx")) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
};

export const getAllFilesNames = () => {
  const filePaths = getAllFiles(contentDirectory);

  return filePaths.map((filePath) => ({
    slug: path.basename(filePath, ".mdx"),
  }));
};

export async function getMDXComponents({
  pathName,
}: {
  pathName: SectionNameEnum;
}) {
  const folderPath = path.join(process.cwd(), `./src/content/${pathName}`);
  const fileNames = fs.readdirSync(folderPath);
  const mdxComponents: MDXContent[] = [];

  for (const fileName of fileNames) {
    if (fileName.endsWith(".mdx")) {
      const filePath = path.join(folderPath, fileName);
      const fileContent = await readFile(filePath, "utf-8");

      const MDXContent = await evaluate(fileContent, {
        ...(runtime as Readonly<EvaluateOptions>),
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              keepBackground: false,
              theme: "github-dark",
            },
          ],
          rehypeSlug,
        ],
      });
      mdxComponents.push(MDXContent.default);
    }
  }

  return mdxComponents;
}

export async function getAllMDXComponents() {
  const filePaths = getAllFiles(contentDirectory);
  const mdxComponents: MDXContent[] = [];
  const mdxCompObject: Record<string, MDXContent> = {};

  for (const filePath of filePaths) {
    if (filePath.endsWith(".mdx")) {
      const fileContent = await readFile(filePath, "utf-8");
      const slug = path.basename(filePath, ".mdx");

      const MDXContent = await evaluate(fileContent, {
        ...(runtime as Readonly<EvaluateOptions>),
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              keepBackground: false,
              theme: "github-dark",
            },
          ],
          rehypeSlug,
        ],
      });
      mdxCompObject[slug] = MDXContent.default;
      mdxComponents.push(MDXContent.default);
    }
  }

  return { array: mdxComponents, object: mdxCompObject };
}
