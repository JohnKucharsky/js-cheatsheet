"use client";

import "@/app/globals.css";
import { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
import * as React from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="prose prose-invert text-gray-300/70 px-4 sm:px-6 md:px-8 mx-auto mt-12 mb-6 relative z-1">
            <article>
              <MDXProvider>{children}</MDXProvider>
            </article>
          </div>
        </main>
      </body>
    </html>
  );
}
