import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionName } from "@/lib/types";

export const metadata: Metadata = {
  title: "JS Native",
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
