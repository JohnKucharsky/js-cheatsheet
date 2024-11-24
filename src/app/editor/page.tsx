import { Metadata } from "next";
import CodeEditor from "@/editor/code-editor";
import { getEditorData } from "@/editor/get-editor-data";
import { shuffle } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Editor",
};

export default async function Page() {
  const shuffledData = await getEditorData();
  shuffle(shuffledData);

  return (
    <div className={"max-w-[100rem] mx-auto py-6 px-4"}>
      <CodeEditor data={shuffledData} />
    </div>
  );
}
