import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";

export const metadata: Metadata = {
  title: "Various – JS Cheatsheets",
  description:
    "Explore advanced JavaScript examples including call, bind, and apply for controlling context, as well as utility functions like clsx, deep cloning, data flattening, list-to-tree conversions, filtering by related properties, and more.",
  keywords: [
    "JavaScript call",
    "bind vs call",
    "apply method",
    "Function.prototype.bind",
    "clsx",
    "deep clone",
    "nested dictionary",
    "filter by related property",
    "flat nested data",
    "tree to list",
    "inner join",
    "async context",
    "event loop",
    "closures",
    "rate limit",
    "retry with delay",
    "shuffle array",
    "topological sort",
    "JavaScript utilities",
    "JS Cheatsheets various",
  ],
  openGraph: {
    title: "Various – JS Cheatsheets",
    description:
      "Deep dive into JavaScript's most versatile patterns: context control, data transformation, and async behavior. Includes call, bind, apply, custom bind implementation, utility helpers, and closure examples.",
    url: "https://js-cheatsheet-v1.vercel.app/various",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Various – JS Cheatsheets",
    description:
      "From call and bind to data flattening and topological sort – explore practical JavaScript examples that go beyond the basics.",
  },
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionName.various,
  });

  return (
    <>
      <h1>Various Code Examples And Patterns</h1>
      {mdxItems.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
      </div>
    </>
  );
}
