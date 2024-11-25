import { Metadata } from "next";
import Spinner from "@/components/icons/spinner";

export const metadata: Metadata = {
  title: "Pick Random",
};

export default async function Page() {
  return <Spinner />;
}
