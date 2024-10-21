import { Metadata } from "next";
import Link from "next/link";
import { various2 } from "@/content/various2";

export const metadata: Metadata = {
  title: "Various2",
};

export default function Page() {
  return (
    <>
      <Link href={"/"}>back</Link>
      {various2.map((Content) => (
        <Content />
      ))}
      <div className={"flex justify-between my-4"}>
        <Link href={"/"}>menu</Link>
        <Link href={"/leetcode"}>leetcode</Link>
      </div>
    </>
  );
}
