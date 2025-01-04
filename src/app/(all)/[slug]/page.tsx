import { notFound } from "next/navigation";
import { getAllFilesNames, getAllMDXComponents } from "@/get-mdx-components";
import Link from "next/link";
import * as React from "react";

export async function generateStaticParams() {
  const filesNames = getAllFilesNames();

  return filesNames.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const resParams = await params;
  return {
    title: resParams.slug,
  };
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
    <>
      <Link href={"/"}>home</Link>
      <Content />
    </>
  );
}
