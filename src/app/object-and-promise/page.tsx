import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { objectAndPromise } from "@/content/object-and-promise";

export const metadata: Metadata = {
  title: "Object and promise methods",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {objectAndPromise.map((Content) => (
        <Content />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/principles"}>principles</Link>
      </div>
    </>
  );
}
