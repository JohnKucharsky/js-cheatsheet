import "@/app/globals.css";
import { ReactNode } from "react";
import * as React from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript & TypeScript Cheatsheets – Learn by Example",
  description:
    "A modern developer resource offering practical JavaScript and TypeScript cheatsheets, deep-dive examples, and utility patterns. Explore built-in methods, async logic, algorithms, and real-world coding techniques to level up your frontend and backend skills.",
  keywords: [
    "JavaScript cheatsheet",
    "TypeScript cheatsheet",
    "JavaScript examples",
    "TypeScript examples",
    "frontend development",
    "backend development",
    "JS methods",
    "TS utilities",
    "async JavaScript",
    "programming patterns",
    "interview prep",
    "code snippets",
    "JS/TS tricks",
    "developer reference",
    "learn JavaScript",
    "learn TypeScript",
    "React",
    "system design",
  ],
  openGraph: {
    title: "JavaScript & TypeScript Cheatsheets – Learn by Example",
    description:
      "Explore modern JS/TS through code: built-in methods, async patterns, real-world problems, and more. Ideal for hands-on learning, debugging, or interviews.",
    url: "https://js-cheatsheet-v1.vercel.app",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript & TypeScript Cheatsheets",
    description:
      "Hands-on JS/TS reference with runnable examples and real-world patterns. Perfect for developers who learn by doing.",
  },
  alternates: {
    canonical: "https://js-cheatsheet-v1.vercel.app/",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Analytics />
      <GoogleAnalytics gaId={"G-KWQLDVETTW"} />
      <GoogleTagManager gtmId={"GTM-P4PTVL7P"} />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
