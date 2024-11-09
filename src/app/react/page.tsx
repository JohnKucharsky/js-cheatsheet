import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { react } from "@/content/react";

export const metadata: Metadata = {
  title: "React",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {react.map((Content) => (
        <Content />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/theory"}>theory</Link>
      </div>
    </>
  );
}
