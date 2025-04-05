import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JS Theory – Clean Code, Principles, and Fundamentals",
  description:
    "Explore in-depth JavaScript theory covering composition vs inheritance, the function stack, SOLID principles, clean component design, and type conversions. Ideal for developers aiming to write robust, maintainable, and idiomatic JS/TS code.",
  keywords: [
    "JavaScript theory",
    "composition vs inheritance",
    "function stack",
    "SOLID principles",
    "clean code JavaScript",
    "KISS YAGNI",
    "type coercion in JavaScript",
    "JavaScript comparison operators",
    "design principles",
    "React architecture",
    "object-oriented vs functional",
    "JavaScript call stack",
    "JavaScript conversion examples",
    "developer best practices",
    "JS Cheatsheets theory",
  ],
  openGraph: {
    title: "JS Theory – Clean Code, Principles, and Fundamentals",
    description:
      "Master JavaScript theory: understand composition, OOP principles, call stacks, and writing better code with SOLID and type conversion patterns.",
    url: "https://js-cheatsheet-v1.vercel.app/theory",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JS Theory – Clean Code, Principles, and Fundamentals",
    description:
      "Deepen your understanding of JavaScript and TypeScript with examples of function stacks, component architecture, and modern programming principles.",
  },
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionName.theory,
  });

  return (
    <>
      <Link href={"/"}>home</Link>
      {mdxItems.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/various"}>various</Link>
      </div>
    </>
  );
}
