"use client";
import clsx from "clsx";
import { ReactElement, useRef, useState } from "react";
import CopyIcon from "@/components/icons/copy-icon";

interface ICopyToClipboard {
  children: ReactElement;
}

export const CopyToClipboard = ({ children }: ICopyToClipboard) => {
  const [copied, setCopied] = useState(false);

  const textInput = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onExit = () => {
    setCopied(false);
  };

  const onCopy = () => {
    setCopied(true);
    if (textInput.current !== null && textInput.current.textContent !== null) {
      navigator.clipboard.writeText(textInput.current.textContent);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
      timeoutRef.current = null;
    }, 2000);
  };

  return (
    <div ref={textInput} onMouseLeave={onExit} className="relative code-block">
      <button
        aria-label="Copy code"
        type="button"
        className={"absolute right-2 top-2 w-8 h-8"}
        onClick={onCopy}
      >
        <CopyIcon
          classN={clsx({
            "text-green-400": copied,
            "text-gray-300 hover:text-gray-400": !copied,
          })}
        />
      </button>

      {children}
    </div>
  );
};
