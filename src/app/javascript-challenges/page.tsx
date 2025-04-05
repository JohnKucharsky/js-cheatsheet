import JavascriptChallenges from "@/javascript-challenges/javascript-challenges";
import { javascriptChallengesData } from "@/javascript-challenges/javascript-challenges-data";
import { shuffle } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Challenges – JS Cheatsheets",
  description:
    "Solve interactive JavaScript coding challenges with live output and instant validation. Practice your problem-solving skills in real-time.",
  openGraph: {
    title: "JavaScript Challenges – JS Cheatsheets",
    description:
      "Practice JavaScript with hands-on coding challenges. Write, run, and validate code live in the browser.",
    url: "https://js-cheatsheet-v1.vercel.app/javascript-challenges",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Challenges – JS Cheatsheets",
    description:
      "Interactive JS problems with code editor and real-time output. Test your knowledge and improve your coding skills.",
  },
};

export default async function Page() {
  const shuffledData = await javascriptChallengesData();
  shuffle(shuffledData);

  return (
    <div className={"max-w-[100rem] mx-auto py-6 px-4"}>
      <JavascriptChallenges data={shuffledData} />
    </div>
  );
}
