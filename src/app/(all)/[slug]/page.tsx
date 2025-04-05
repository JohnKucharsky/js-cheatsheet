import { notFound } from "next/navigation";
import { getAllFilesNames, getAllMDXComponents } from "@/get-mdx-components";
import Link from "next/link";
import * as React from "react";

export async function generateStaticParams() {
  const filesNames = getAllFilesNames();

  return filesNames.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const resParams = await params;
  return {
    title: `${resParams.slug} JavaScript Cheatsheets`,
    description:
      "A modern developer resource offering practical JavaScript and TypeScript cheatsheets, deep-dive examples, and utility patterns. Explore built-in methods, async logic, algorithms, and real-world coding techniques to level up your frontend and backend skills.",
    keywords: [
      "JavaScript cheatsheet",
      "TypeScript cheatsheet",
      "JavaScript examples",
      "TypeScript examples",
      "frontend development",
      "backend development",
      "JS methods",
      "TS utilities",
      "async JavaScript",
      "programming patterns",
      "interview prep",
      "code snippets",
      "JS/TS tricks",
      "developer reference",
      "learn JavaScript",
      "learn TypeScript",
      "React",
      "system design",
    ],
    openGraph: {
      title: "JavaScript & TypeScript Cheatsheets – Learn by Example",
      description:
        "Explore modern JS/TS through code: built-in methods, async patterns, real-world problems, and more. Ideal for hands-on learning, debugging, or interviews.",
      url: "https://js-cheatsheet-v1.vercel.app",
      siteName: "JS Cheatsheets",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "JavaScript & TypeScript Cheatsheets",
      description:
        "Hands-on JS/TS reference with runnable examples and real-world patterns. Perfect for developers who learn by doing.",
    },
    alternates: {
      canonical: "https://js-cheatsheet-v1.vercel.app",
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const allFiles = await getAllMDXComponents();

  if (!allFiles.object[params.slug]) {
    notFound();
  }

  const Content = allFiles.object[params.slug];

  return (
    <>
      <Link href={"/"}>home</Link>
      <Content />
    </>
  );
}
