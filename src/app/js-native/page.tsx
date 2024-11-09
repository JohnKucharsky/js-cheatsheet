import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { jsNative } from "@/content/js-native";

export const metadata: Metadata = {
  title: "JS Native",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {jsNative.map((Content, idx) => (
        <Content key={idx} />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/learn-js-and-mdn"}>learn js and mdn</Link>
      </div>
    </>
  );
}
