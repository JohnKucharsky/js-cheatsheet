"use client";

import { useState, useTransition } from "react";
import { nextItem } from "@/app/api/actions";
import Spinner from "@/components/icons/spinner";
import { useRouter } from "next/navigation";

export default function NextButton({
  allItems,
}: {
  allItems: {
    shuffledarray: string[];
    current_index: number;
  };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    await nextItem({ currentIndex: allItems.current_index + 1 });
    setLoading(false);

    if (allItems.shuffledarray[allItems.current_index + 1]) {
      startTransition(() =>
        router.push(
          `/pick-random/${allItems.shuffledarray[allItems.current_index + 1]}`,
        ),
      );
    } else {
      startTransition(() => router.push("/"));
    }
  };

  return (
    <button
      disabled={loading || isPending}
      onClick={handleClick}
      className={"text-white"}
    >
      {loading || isPending ? <Spinner /> : "next"}
    </button>
  );
}
