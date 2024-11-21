"use client";

import Fuse from "fuse.js";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  console.log(resultData);

  return (
    <Command onValueChange={(string) => console.log(string)}>
      <CommandInput
        onValueChange={(string) => setInput(string)}
        placeholder="Search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {resultData.map(({ item }) => (
          <CommandItem
            style={{ cursor: "pointer" }}
            key={item.slug}
            onSelect={(value) => router.push(`/${value}`)}
          >
            {item.slug}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
