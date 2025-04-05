import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphs – JS Cheatsheets",
  description:
    "Learn graph algorithms and traversal techniques in JavaScript. Includes DFS, BFS, pathfinding, and adjacency list implementations.",
  keywords: [
    "JavaScript graph algorithms",
    "DFS",
    "BFS",
    "pathfinding algorithms",
    "graph traversal",
    "undirected graph",
    "graph checks",
    "adjacency list",
    "JavaScript algorithms",
    "graph theory JavaScript examples",
  ],
  openGraph: {
    title: "Graphs – JS Cheatsheets",
    description:
      "Explore JavaScript examples for graph traversal, pathfinding, and undirected graph checks using depth-first and breadth-first search.",
    url: "https://js-cheatsheet-v1.vercel.app/graphs",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Graphs – JS Cheatsheets",
    description:
      "JavaScript implementations of graph algorithms like DFS, BFS, and pathfinding. Learn through clean, practical examples.",
  },
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionName.graphs,
  });

  return (
    <>
      <Link href={"/"}>home</Link>
      {mdxItems.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/js-native"}>js-native</Link>
      </div>
    </>
  );
}
