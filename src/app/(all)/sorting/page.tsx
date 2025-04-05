import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";

export const metadata: Metadata = {
  title: "Sorting – JS Cheatsheets",
  description:
    "Explore common sorting algorithms like bubble sort, insertion sort, and selection sort with clear, runnable JavaScript examples.",
  keywords: [
    "sorting algorithms",
    "bubble sort",
    "insertion sort",
    "selection sort",
    "javascript sorting",
    "sorting examples",
    "code snippets",
    "JS cheatsheets",
    "algorithm examples",
  ],
  openGraph: {
    title: "Sorting – JS Cheatsheets",
    description:
      "Learn about various sorting algorithms such as bubble sort, insertion sort, and selection sort with hands-on JavaScript examples.",
    url: "https://js-cheatsheet-v1.vercel.app/sorting",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sorting – JS Cheatsheets",
    description:
      "Master sorting algorithms like bubble sort, insertion sort, and selection sort with interactive, code-based examples in JavaScript.",
  },
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionName.sorting,
  });

  return (
    <>
      <h1>Sorting Algorithms</h1>
      {mdxItems.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/theory"}>theory</Link>
      </div>
    </>
  );
}
