import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAllItems } from "@/app/api/actions";

export const metadata: Metadata = {
  title: "Pick Random",
};

export default async function Page() {
  const res = await getAllItems();

  if (res[0].shuffledarray[res[0].current_index]) {
    redirect(`/pick-random/${res[0].shuffledarray[res[0].current_index]}`);
  }

  return <h4>Array is empty, shuffle again</h4>;
}
