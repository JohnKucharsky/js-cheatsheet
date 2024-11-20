import Fuse from "fuse.js";
import { getAllFilesNames } from "@/get-mdx-components";

// Directory where your content files are located

export const createSearchIndex = () => {
  const documents = getAllFilesNames();

  return new Fuse(documents, {
    keys: ["slug"],
    minMatchCharLength: 2,
  });
};
