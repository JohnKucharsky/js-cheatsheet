import Content from "./content.mdx";
import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Object and promise polyfills",
};

export default function Page() {
  return (
    <>
      <Content />
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/learn-js"}>learn js</Link>
      </div>
    </>
  );
}
