import { Metadata } from "next";
import { getFirstItem } from "@/app/api/actions";

export const metadata: Metadata = {
  title: "Pick Random",
};

export default async function Page() {
  console.log("page");
  const res = await getFirstItem();
  console.log({ res }, "page");
  if (res[0]?.problem_name === undefined || res[0]?.problem_name === null) {
    return <h4>array is empty, shuffle again</h4>;
  }
  return <>something went wrong</>;
}
