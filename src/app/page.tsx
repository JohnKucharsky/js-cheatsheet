import Content from "./content.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JS Cheatsheet",
};

export default function Page() {
  return <Content />;
}
