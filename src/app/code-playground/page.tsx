import { Metadata } from "next";
import CodePlayground from "@/code-playground/code-playground";
import { getCodePlaygroundData } from "@/code-playground/get-code-playground-data";
import { shuffle } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Code Playground – JS Cheatsheets",
  description:
    "Interactive code playground with a real-time editor and output preview. Write, test, and experiment with JavaScript, TypeScript, and React snippets.",
  openGraph: {
    title: "Code Playground – JS Cheatsheets",
    description:
      "Interactive playground to write and preview JavaScript, TypeScript, and React code in real-time.",
    url: "https://js-cheatsheet-v1.vercel.app/code-playground",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Playground – JS Cheatsheets",
    description:
      "Real-time code editor and preview for JS, TS, and React. Experiment and learn faster.",
  },
};

export default async function Page() {
  const shuffledData = await getCodePlaygroundData();
  shuffle(shuffledData);

  return (
    <div className={"max-w-[100rem] mx-auto py-6 px-4"}>
      <CodePlayground data={shuffledData} />
    </div>
  );
}
