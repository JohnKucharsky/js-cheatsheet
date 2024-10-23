import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { learnJs } from "@/content/learn-js";

export const metadata: Metadata = {
  title: "Learn JS",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {learnJs.map((Content) => (
        <Content />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/big-front-end"}>big front end</Link>
      </div>
    </>
  );
}
