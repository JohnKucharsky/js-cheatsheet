import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JS Native – JS Cheatsheets",
  description:
    "Master JavaScript by recreating native methods like map, reduce, filter, promises, and more from scratch. Understand how core JS really works.",
  keywords: [
    "JavaScript native methods",
    "Custom array methods",
    "JavaScript built-ins",
    "Reimplement map reduce filter",
    "JavaScript internals",
    "Promise polyfill",
    "Array prototype",
    "JS fundamentals",
    "learn JavaScript deeply",
    "JS methods from scratch",
  ],
  openGraph: {
    title: "JS Native – JS Cheatsheets",
    description:
      "Custom implementations of native JavaScript methods and built-in objects like Map, Set, and Promises. Learn JavaScript internals through code.",
    url: "https://js-cheatsheet-v1.vercel.app/js-native",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JS Native – JS Cheatsheets",
    description:
      "Explore JavaScript internals by re-creating built-in methods like map, reduce, flatMap, and Promise.all from scratch with examples.",
  },
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionName["js-native"],
  });

  return (
    <>
      <Link href={"/"}>home</Link>
      {mdxItems.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/learn-js-and-mdn"}>learn js and mdn</Link>
      </div>
    </>
  );
}
