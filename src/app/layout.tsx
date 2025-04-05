import "@/app/globals.css";
import { ReactNode } from "react";
import * as React from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

const title = "JavaScript Cheatsheets";
const description =
  "Quick reference guides for JavaScript, TypeScript, React, and other tools. Stay productive with concise, easy-to-use cheatsheets.";
const ogTitle = "JS Cheatsheets – Quick Reference Guides";
const ogDescription =
  "Cheatsheets for JavaScript, TypeScript, React, and more.";

export const metadata = {
  title,
  description,
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: "https://js-cheatsheet-v1.vercel.app",
    siteName: "JS Cheatsheets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
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
