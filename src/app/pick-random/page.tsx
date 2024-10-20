import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getFirstItem } from "@/app/api/actions";

export const metadata: Metadata = {
  title: "Pick Random",
};

export default async function Page() {
  const res = await getFirstItem();

  if (res[0].shuff_num === undefined || res[0].shuff_num === null) {
    return <>array is empty, shuffle again</>;
  }

  redirect(`/pick-random/${res[0].shuff_num}`);
}
