import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";

export const metadata: Metadata = {
  title: "Learn JS & MDN – JS Cheatsheets",
  description:
    "A curated collection of practical JavaScript and TypeScript examples inspired by MDN documentation and real-world usage.",
  keywords: [
    "JavaScript",
    "TypeScript",
    "MDN",
    "JavaScript fundamentals",
    "MDN documentation",
    "JavaScript examples",
    "JavaScript tips",
    "JavaScript code snippets",
    "MDN JS reference",
    "TypeScript examples",
    "learn JavaScript",
  ],
  openGraph: {
    title: "Learn JS & MDN – JS Cheatsheets",
    description:
      "Explore JavaScript fundamentals with clear, runnable code snippets inspired by MDN docs and JavaScript.info.",
    url: "https://js-cheatsheet-v1.vercel.app/learn-js-and-mdn",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn JS & MDN – JS Cheatsheets",
    description:
      "Master core JavaScript concepts with hands-on examples based on MDN documentation and real-world use cases.",
  },
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionName["learn-js-and-mdn"],
  });

  return (
    <>
      <Link href={"/"}>home</Link>
      {mdxItems.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/lodash"}>lodash</Link>
      </div>
    </>
  );
}
