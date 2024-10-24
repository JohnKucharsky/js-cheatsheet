import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { lodash } from "@/content/lodash";

export const metadata: Metadata = {
  title: "Lodash",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {lodash.map((Content) => (
        <Content />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/principles"}>principles</Link>
      </div>
    </>
  );
}
