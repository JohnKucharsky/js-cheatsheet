"use client";

import "@/app/globals.css";
import { ReactNode } from "react";
import * as React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId={"G-KWQLDVETTW"} />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
