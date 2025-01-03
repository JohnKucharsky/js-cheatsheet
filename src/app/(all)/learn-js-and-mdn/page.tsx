import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";

export const metadata: Metadata = {
  title: "LearnJS & MDN",
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
        <Link href={"/leetcode"}>leetcode</Link>
      </div>
    </>
  );
}
