import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design & Patterns – JS Cheatsheets",
  description:
    "JavaScript implementations of core system design patterns and data structures. Explore queues, stacks, reducers, async workflows, and more.",
  keywords: [
    "system design",
    "design patterns",
    "data structures",
    "queues",
    "stacks",
    "async workflows",
    "redux",
    "JavaScript design patterns",
    "JS cheatsheets",
    "queues in JS",
    "stacks in JS",
    "redux store",
    "async queues",
  ],
  openGraph: {
    title: "System Design & Patterns – JS Cheatsheets",
    description:
      "Learn how to implement core data structures and system design concepts in JavaScript: stacks, queues, async queues, redux stores, and more.",
    url: "https://js-cheatsheet-v1.vercel.app/system-design-and-patterns",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Design & Patterns – JS Cheatsheets",
    description:
      "Practical examples of system design principles in JavaScript. Dive into queues, stacks, redux stores, and async workflows.",
  },
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionName.design,
  });

  return (
    <>
      <h1>System Design And Data Structures</h1>
      {mdxItems.map((Content, idx) => {
        return <Content key={idx} />;
      })}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/graphs"}>graphs</Link>
      </div>
    </>
  );
}
