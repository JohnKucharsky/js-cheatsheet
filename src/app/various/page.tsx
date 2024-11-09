import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { various } from "@/content/various";

export const metadata: Metadata = {
  title: "Various",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {various.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
      </div>
    </>
  );
}
