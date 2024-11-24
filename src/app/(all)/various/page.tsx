import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { getMDXComponents } from "@/get-mdx-components";
import { SectionNameEnum } from "@/lib/types";

export const metadata: Metadata = {
  title: "Various",
};

export default async function Page() {
  const mdxItems = await getMDXComponents({
    pathName: SectionNameEnum.various,
  });

  return (
    <>
      <Link href={"/"}>back</Link>
      {mdxItems.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
      </div>
    </>
  );
}
