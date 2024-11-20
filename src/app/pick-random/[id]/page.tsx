import { notFound } from "next/navigation";
import NextButton from "@/components/next-button";
import { Metadata } from "next";
import { getAllFilesNames, getAllMDXComponents } from "@/get-mdx-components";

export const metadata: Metadata = {
  title: "Pick Random",
};

export async function generateStaticParams() {
  const filesNames = getAllFilesNames();

  return filesNames.map(({ slug }) => ({ id: slug }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const allFiles = await getAllMDXComponents();

  if (!allFiles.object[params.id]) {
    notFound();
  }

  const Content = allFiles.object[params.id];

  return (
    <>
      <Content />
      <div className={"flex flex-row justify-end"}>
        <NextButton />
      </div>
    </>
  );
}
