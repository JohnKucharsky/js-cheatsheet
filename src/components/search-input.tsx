"use client";

import Fuse from "fuse.js";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DialogTrigger } from "@/components/ui/dialog";

export default function SearchInput({
  documents,
  openInNewTab,
}: {
  documents: { slug: string }[];
  openInNewTab?: boolean;
}) {
  const [input, setInput] = useState<string>("");
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const fuse = new Fuse(documents, {
    keys: ["slug"],
    minMatchCharLength: 2,
  });
  const resultData = fuse.search(input);
  const hasData = resultData.length > 0;

  const handleChangeRoute = (slug: string) => {
    if (loading) return;
    startTransition(() => router.push(`/${slug}`));
  };

  return (
    <div className={cn({ "opacity-50": loading })}>
      <Input
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
        disabled={loading}
      />

      {hasData ? (
        <div className="flex flex-col gap-2 pt-2 max-h-80 overflow-y-scroll hide-scrollbar">
          {resultData.map(({ item }) =>
            openInNewTab ? (
              <DialogTrigger asChild key={item.slug}>
                <Link
                  target={"_blank"}
                  className="cursor-pointer"
                  href={`/${item.slug}`}
                  onClick={() => startTransition(() => undefined)}
                >
                  {item.slug}
                </Link>
              </DialogTrigger>
            ) : (
              <h5
                key={item.slug}
                className="cursor-pointer"
                onClick={() => handleChangeRoute(item.slug)}
              >
                {item.slug}
              </h5>
            ),
          )}
        </div>
      ) : (
        <h5 className="pt-2">No results found.</h5>
      )}
    </div>
  );
}
