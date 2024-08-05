import Content from "./content.mdx";
import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Problems One",
};

export default function Page() {
  return (
    <>
      <Content />
      <div className={"flex justify-between"}>
        <Link href={"/"}>menu</Link>
      </div>
    </>
  );
}
