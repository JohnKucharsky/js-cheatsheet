import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Fuse from "fuse.js";

// Directory where your content files are located
const contentDirectory = path.join(process.cwd(), "./src/content");

// Function to recursively get all .mdx files from nested directories
const getAllFiles = (
  dirPath: string,
  arrayOfFiles: string[] = [],
): string[] => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles); // Recurse into subdirectory
    } else if (filePath.endsWith(".mdx")) {
      arrayOfFiles.push(filePath); // Add file if it is an .mdx file
    }
  });

  return arrayOfFiles;
};

export const createSearchIndex = () => {
  // Get all .mdx file paths
  const filePaths = getAllFiles(contentDirectory);

  const documents = filePaths.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title || path.basename(filePath, ".mdx"),
      slug: data.slug || path.basename(filePath, ".mdx"),
      content,
    };
  });

  const fuse = new Fuse(documents, {
    keys: ["title", "content"],
    includeScore: true,
  });
  console.log(fuse);
  return documents;
};
