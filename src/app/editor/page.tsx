import { Metadata } from "next";
import * as React from "react";
import CodeEditor from "@/editor/code-editor";

export const metadata: Metadata = {
  title: "Editor",
};

export default async function Page() {
  return <CodeEditor language={"typescript"} snippet={""} />;
}
