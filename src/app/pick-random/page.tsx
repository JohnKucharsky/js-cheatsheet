import { Metadata } from "next";
import { getFirstItem } from "@/app/api/actions";
import ClientRedirect from "@/components/client-redirect";

export const metadata: Metadata = {
  title: "Pick Random",
};

export default async function Page() {
  const res = await getFirstItem();

  if (res[0]?.problem_name === undefined || res[0]?.problem_name === null) {
    return <h4>array is empty, shuffle again</h4>;
  }

  return <ClientRedirect problemName={res[0].problem_name} />;
}
