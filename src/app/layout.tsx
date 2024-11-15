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
        <main>
          <div className="prose prose-invert text-gray-300/70 px-2 sm:px-6 md:px-8 mx-auto mt-8 mb-6 relative z-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
