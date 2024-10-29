import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { arrayMethods } from "@/content/array-methods";

export const metadata: Metadata = {
  title: "Array Methods",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {arrayMethods.map((Content) => (
        <Content />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/big-front-end"}>big front end</Link>
      </div>
    </>
  );
}
