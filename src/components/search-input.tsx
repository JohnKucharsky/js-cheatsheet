"use client";

import Fuse from "fuse.js";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function SearchInput({
  documents,
}: {
  documents: { slug: string }[];
}) {
  const [input, setInput] = useState<string>("");
  const fuse = new Fuse(documents, {
    keys: ["slug"],
    minMatchCharLength: 2,
  });
  const resultData = fuse.search(input);
  const hasData = resultData.length > 0;

  return (
    <div className="pt-3">
      <Input
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
      />

      {hasData ? (
        <div className="flex flex-col gap-2 pt-2">
          {resultData.map(({ item }) => (
            <Link
              className="cursor-pointer"
              key={item.slug}
              href={`/${item.slug}`}
            >
              {item.slug}
            </Link>
          ))}
        </div>
      ) : (
        <h5 className="pt-2">No results found.</h5>
      )}
    </div>
  );
}
