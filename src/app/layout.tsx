"use client";

import "@/app/globals.css";
import { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
import * as React from "react";
import Link from "next/link";

function Heading({
  level,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  const tag = `h${level}`;
  return React.createElement(tag, props);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="prose prose-invert text-gray-300/70 px-4 sm:px-6 md:px-8 mx-auto mt-12 mb-6 relative z-1">
            <article>
              <MDXProvider
                components={{
                  h1: (props) => <Heading level={1} {...props} />,
                  h2: (props) => <Heading level={2} {...props} />,
                  h3: (props) => <Heading level={3} {...props} />,
                  h4: (props) => <Heading level={4} {...props} />,
                  h5: (props) => <Heading level={5} {...props} />,
                  h6: (props) => <Heading level={6} {...props} />,
                  a: CustomLink,
                }}
              >
                {children}
              </MDXProvider>
            </article>
          </div>
        </main>
      </body>
    </html>
  );
}

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
