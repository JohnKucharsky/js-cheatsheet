"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Editor } from "@monaco-editor/react";
import clsx from "clsx";
import { executeCode } from "@/code-playground/api";
import Link from "next/link";
import { EditorData } from "@/code-playground/types";
import { cn } from "@/lib/utils";

const getErrorMessage = (input: string) => {
  const errorLineMatch = input.match(/^\s*(\w*Error):\s(.+)$/m);
  const expectedLineMatch = input.match(/^\s*Expected:\s(.+)$/m);

  if (errorLineMatch) {
    const [, errorType, message] = errorLineMatch;
    const expected = expectedLineMatch
      ? `Expected: ${expectedLineMatch[1]}`
      : "";
    return [`${errorType}: ${message}`, expected].filter(Boolean).join("\n");
  }

  return input;
};

export default function CodePlayground({ data }: { data: EditorData[] }) {
  const [index, setIndex] = useState<number>(0);
  const [value, setValue] = useState(data[0].content);
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, startTransition] = useTransition();

  const editorRef = useRef<any>();

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        runCode().catch(console.error);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run } = await executeCode(data[index].language, sourceCode);

      setOutput(run.code !== 0 ? getErrorMessage(run.output) : run.output);
      setIsError(run.code !== 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSnippet = () => {
    const nextIndex = (index + 1) % data.length;
    setIndex(nextIndex);
    setValue(data[nextIndex].content);
    setOutput(null);
    setIsError(false);
  };

  return (
    <div>
      <div className="mb-2 flex flex-row items-center gap-3 justify-between"></div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <div className="mb-2 flex flex-row items-center gap-3 justify-between">
            <Link href={"/"}>home</Link>
            <button onClick={runCode} disabled={isLoading}>
              {isLoading ? "running..." : "run"}
            </button>
          </div>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="calc(100vh - 100px)"
            theme="vs-dark"
            language={data[index].language}
            defaultValue={data[index].content}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value || "")}
          />
        </div>
        <div className="w-1/2">
          <div className="mb-2 flex flex-row items-center gap-3 justify-between">
            <button onClick={nextSnippet}>next</button>
            <Link
              target={"_blank"}
              className={cn({ "opacity-50": loading }, "cursor-pointer")}
              href={`/${data[index].slug}`}
              onClick={() => startTransition(() => undefined)}
            >
              {data[index].slug}
            </Link>
          </div>
          <div
            className={clsx("h-full p-2 border rounded-md bg-stone-900", {
              "border-red-500": isError,
              "border-stone-700": !isError,
            })}
          >
            {output ? (
              <p
                className={`m-0 ${isError ? "text-red-500" : "text-gray-100"} whitespace-pre-wrap font-mono text-sm overflow-auto`}
              >
                {output}
              </p>
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
}
