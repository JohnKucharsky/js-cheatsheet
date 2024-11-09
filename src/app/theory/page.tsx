import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import Content from "@/content/theory/principles.mdx";

export const metadata: Metadata = {
  title: "Theory",
};

export default function Page() {
  return (
    <>
      <Content />
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/various"}>various</Link>
      </div>
    </>
  );
}
