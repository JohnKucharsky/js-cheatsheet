import { Metadata } from "next";
import * as React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design",
};

export default async function Page() {
  // const designItems = await getMDXComponents();

  return (
    <>
      <Link href={"/"}>back</Link>
      {/*{designItems.map((content, idx) => {*/}
      {/*  return content.value;*/}
      {/*})}*/}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/js-native"}>js native</Link>
      </div>
    </>
  );
}
