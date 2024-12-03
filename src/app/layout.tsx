"use client";

import "@/app/globals.css";
import { ReactNode } from "react";
import * as React from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId={"G-KWQLDVETTW"} />
      <GoogleTagManager gtmId={"GTM-P4PTVL7P"} />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
