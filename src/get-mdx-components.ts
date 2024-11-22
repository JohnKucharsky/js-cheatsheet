import fs from "fs";
import path from "path";
import { evaluate, EvaluateOptions } from "@mdx-js/mdx";
import { readFile } from "node:fs/promises";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { SectionNameEnum } from "@/common/types";
import { MDXContent } from "mdx/types";
import githubDark from "tm-themes/themes/github-dark.json";

const contentDirectory = path.join(process.cwd(), "./src/content");

const getAllFiles = (dirPath: string): string[] => {
  const files = fs.readdirSync(dirPath);
  const allFiles: string[] = [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      allFiles.push(...getAllFiles(filePath));
    } else if (filePath.endsWith(".mdx")) {
      allFiles.push(filePath);
    }
  });

  return allFiles;
};

export const getAllFilesNames = () => {
  return getAllFiles(contentDirectory).map((filePath) => ({
    slug: path.basename(filePath, ".mdx"),
  }));
};

export async function getMDXComponents({
  pathName,
}: {
  pathName: SectionNameEnum;
}) {
  const folderPath = path.join(contentDirectory, pathName);
  const filePaths = getAllFiles(folderPath);

  return Promise.all(
    filePaths.map(async (filePath) => {
      const fileContent = await readFile(filePath, "utf-8");
      const MDXContent = await evaluate(fileContent, {
        ...(runtime as Readonly<EvaluateOptions>),
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              keepBackground: false,
              theme: githubDark,
            },
          ],
          rehypeSlug,
        ],
      });
      return MDXContent.default;
    }),
  );
}

export async function getAllMDXComponents() {
  const filePaths = getAllFiles(contentDirectory);
  const mdxComponents: MDXContent[] = [];
  const mdxCompObject: Record<string, MDXContent> = {};

  for (const filePath of filePaths) {
    const fileContent = await readFile(filePath, "utf-8");
    const slug = path.basename(filePath, ".mdx");

    const MDXContent = await evaluate(fileContent, {
      ...(runtime as Readonly<EvaluateOptions>),
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            keepBackground: false,
            theme: githubDark,
          },
        ],
        rehypeSlug,
      ],
    });
    mdxCompObject[slug] = MDXContent.default;
    mdxComponents.push(MDXContent.default);
  }

  return { array: mdxComponents, object: mdxCompObject };
}
