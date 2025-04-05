import "@/app/globals.css";
import { ReactNode } from "react";
import * as React from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "JavaScript Cheatsheets",
  description:
    "Quick reference guides for JavaScript, TypeScript, React, and other tools. Stay productive with concise, easy-to-use cheatsheets.",
  openGraph: {
    title: "JS Cheatsheets – Quick Reference Guides",
    description: "Cheatsheets for JavaScript, TypeScript, React, and more.",
    url: "https://js-cheatsheet-v1.vercel.app",
    siteName: "JS Cheatsheets",
    images: [
      {
        url: "https://js-cheatsheet-v1.vercel.app/og-image.png",
        width: 1024,
        height: 657,
        alt: "JS Cheatsheets",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JS Cheatsheets",
    description: "Cheatsheets for JavaScript, TypeScript, React, and more.",
    images: ["https://js-cheatsheet-v1.vercel.app/og-image.png"],
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
