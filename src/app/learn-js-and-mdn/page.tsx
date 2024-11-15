import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { learnJsAndMdn } from "@/content/learn-js-and-mdn";

export const metadata: Metadata = {
  title: "LearnJS & MDN",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {learnJsAndMdn.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/leetcode"}>leetcode</Link>
      </div>
    </>
  );
}
