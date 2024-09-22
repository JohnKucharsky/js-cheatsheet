import Content from "./content.mdx";
import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Array Methods",
};

export default function Page() {
  return (
    <>
      <Content />
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/object-and-promise-methods"}>
          object and promise polyfills
        </Link>
      </div>
    </>
  );
}
