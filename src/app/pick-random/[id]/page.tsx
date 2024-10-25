import { notFound } from "next/navigation";
import NextButton from "@/components/next-button";
import { Metadata } from "next";
import { listOfAllItems, quantity } from "@/app/api/quantity-and-list";

export const metadata: Metadata = {
  title: "Pick Random",
};

export async function generateStaticParams() {
  return Array(quantity)
    .fill(0)
    .map((_, idx) => ({ id: String(idx) }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  if (Number(params.id) >= quantity || isNaN(Number(params.id))) {
    notFound();
  }

  const Content = listOfAllItems[Number(params.id)];

  return (
    <>
      <Content />
      <div className={"flex flex-row justify-end"}>
        <NextButton />
      </div>
    </>
  );
}
