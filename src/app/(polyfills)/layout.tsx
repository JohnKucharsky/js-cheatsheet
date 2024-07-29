import "@/app/globals.css";
import { ReactNode } from "react";
import * as React from "react";
import MenuLink from "@/app/components/menu-link.mdx";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <MenuLink />
    </>
  );
}
