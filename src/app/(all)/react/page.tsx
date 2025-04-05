import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";

export const metadata: Metadata = {
  title: "React – JS Cheatsheets",
  description:
    "A comprehensive collection of React-related code snippets, patterns, and best practices for building modern web applications with React.",
  keywords: [
    "React",
    "React hooks",
    "React state management",
    "React components",
    "React context",
    "React lifecycle",
    "React patterns",
    "React best practices",
    "React code snippets",
    "React tutorial",
  ],
  openGraph: {
    title: "React – JS Cheatsheets",
    description:
      "Explore essential React concepts, patterns, and practical examples. Learn about hooks, state management, rendering patterns, and more.",
    url: "https://js-cheatsheet-v1.vercel.app/react",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React – JS Cheatsheets",
    description:
      "Learn React through hands-on examples. Explore concepts like hooks, context, and component lifecycle with clear, concise code snippets.",
  },
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionName.react,
  });

  return (
    <>
      <h1>React Concepts</h1>
      {mdxItems.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/sorting"}>sorting</Link>
      </div>
    </>
  );
}
