import { Metadata } from "next";
import { getFirstItem } from "@/app/api/actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pick Random",
};

export default async function Page() {
  const res = await getFirstItem();

  if (res?.[0]?.problem_name) {
    redirect(`/pick-random/${res[0].problem_name}`);
  }

  return <h4>Array is empty, shuffle again</h4>;
}
