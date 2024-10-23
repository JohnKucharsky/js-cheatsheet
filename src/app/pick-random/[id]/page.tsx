import { various2, various2Qty } from "@/content/various2";
import { notFound } from "next/navigation";
import NextButton from "@/components/next-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pick Random",
};

export async function generateStaticParams() {
  return Array(various2Qty)
    .fill(0)
    .map((_, idx) => ({ id: String(idx) }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  if (Number(params.id) >= various2Qty || isNaN(Number(params.id))) {
    notFound();
  }

  const Content = various2[Number(params.id)];

  return (
    <>
      <Content />
      <div className={"flex flex-row gap-8 items-center"}>
        <NextButton />
      </div>
    </>
  );
}
