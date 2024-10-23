import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { leetcode } from "@/content/leetcode";

export const metadata: Metadata = {
  title: "Leetcode",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {leetcode.map((Content) => (
        <Content />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/various2"}>various2</Link>
      </div>
    </>
  );
}
