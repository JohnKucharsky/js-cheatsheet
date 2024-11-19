import fs from "fs";
import path from "path";
import { evaluate, EvaluateOptions } from "@mdx-js/mdx";
import { MDXContent } from "mdx/types";
import { readFile } from "node:fs/promises";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { SectionNameEnum } from "@/common/types";

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
