import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lodash – JS Cheatsheets",
  description:
    "A collection of Lodash utility functions for simplifying JavaScript operations, including methods for array manipulation, object handling, and functional programming.",
  keywords: [
    "Lodash utilities",
    "Lodash functions",
    "JavaScript Lodash cheatsheet",
    "Lodash array methods",
    "Lodash object manipulation",
    "JavaScript functional programming",
    "Lodash tutorials",
    "JavaScript Lodash library",
    "Lodash cheatsheet",
  ],
  openGraph: {
    title: "Lodash – JS Cheatsheets",
    description:
      "Explore Lodash utility functions with practical examples to improve your JavaScript coding efficiency. Includes methods like _.chunk, _.curry, _.union, and more.",
    url: "https://js-cheatsheet-v1.vercel.app/lodash",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lodash – JS Cheatsheets",
    description:
      "Master Lodash functions with practical examples for array and object manipulation in JavaScript. Perfect for developers looking to streamline their code.",
  },
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionName.lodash,
  });

  return (
    <>
      <h1>Implementation of Lodash functions</h1>
      {mdxItems.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/react"}>react</Link>
      </div>
    </>
  );
}
