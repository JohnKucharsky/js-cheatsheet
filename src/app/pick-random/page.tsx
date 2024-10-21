import { Metadata } from "next";
import { redirect } from "next/navigation";
import { popNum, setGlobalNums } from "@/app/api/globalShuffledArray";
import { getShuffledArray } from "@/app/api/actions";

export const metadata: Metadata = {
  title: "Pick Random",
};

export default async function Page() {
  const res = await getShuffledArray();

  if (!res?.[0]?.shuffledarray) return <>error</>;
  if (res[0].shuffledarray.length === 0) {
    return <> array is empty, shuffle again</>;
  }

  setGlobalNums(res[0].shuffledarray.map(Number));
  const pageNum = popNum();
  redirect(`/pick-random/${pageNum}`);
}
