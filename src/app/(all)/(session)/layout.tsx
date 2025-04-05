import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pick Random – JS Cheatsheets",
  description:
    "Get a random JavaScript code snippet from across the entire cheatsheet collection. Great for daily practice, discovery, or surprise learning.",
  openGraph: {
    title: "Pick Random – JS Cheatsheets",
    description:
      "Explore a randomly selected code example from all available JavaScript challenges, data structures, and patterns.",
    url: "https://js-cheatsheet-v1.vercel.app/pick-random",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pick Random – JS Cheatsheets",
    description:
      "Get inspired with a random JavaScript snippet pulled from the full cheatsheet collection. A fun way to explore and learn.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
