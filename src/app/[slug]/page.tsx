import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllFilesNames, getAllMDXComponents } from "@/get-mdx-components";
import Link from "next/link";
import * as React from "react";

export const metadata: Metadata = {
  title: "Details Page",
};

export async function generateStaticParams() {
  const filesNames = getAllFilesNames();

  return filesNames.map(({ slug }) => ({ slug }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const allFiles = await getAllMDXComponents();

  if (!allFiles.object[params.slug]) {
    notFound();
  }

  const Content = allFiles.object[params.slug];

  return (
    <div>
      <Link href={"/"}>back</Link>
      <Content />;
    </div>
  );
}
