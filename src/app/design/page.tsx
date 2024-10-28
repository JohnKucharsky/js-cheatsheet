import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { design } from "@/content/design";

export const metadata: Metadata = {
  title: "Design",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {design.map((Content) => (
        <Content />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/learn-js"}>learn js</Link>
      </div>
    </>
  );
}
