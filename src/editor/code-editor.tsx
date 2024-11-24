"use client";

import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import clsx from "clsx";
import { executeCode } from "@/editor/api";
import Link from "next/link";
import * as React from "react";

const CodeEditor = ({
  language,
  snippet,
}: {
  language: "typescript" | "javascript";
  snippet: string;
}) => {
  const editorRef = useRef<any>();
  const [value, setValue] = useState(snippet);

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run } = await executeCode(language, sourceCode);
      setOutput(run.output.split("\n"));
      setIsError(run.code !== 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-2 flex flex-row items-center gap-3 justify-between">
        <Link href={"/"}>back</Link>
        <button onClick={runCode} disabled={isLoading}>
          {isLoading ? "running..." : "run"}
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="30rem"
            theme="vs-dark"
            language={language}
            defaultValue={snippet}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value || "")}
          />
        </div>
        <div className="w-1/2">
          <div
            className={clsx("h-[30rem] p-2 border rounded-md bg-stone-900", {
              "border-red-500": isError,
              "border-stone-700": !isError,
            })}
          >
            {output ? (
              output.map((line, i) => (
                <p key={i} className="h- text-sm text-white">
                  {line}
                </p>
              ))
            ) : (
              <p className="text-white text-sm">
                Click run to see the output here
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CodeEditor;
