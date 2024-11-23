"use client";

import { useState, useTransition } from "react";
import { getFirstItem, shuffleArray } from "@/app/api/actions";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";

export default function ShuffleButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    await shuffleArray();
    const res = await getFirstItem();
    setLoading(false);
    startTransition(() => router.push(`/pick-random/${res[0].problem_name}`));
  };

  return (
    <button
      disabled={loading || isPending}
      onClick={handleClick}
      className={"text-white"}
    >
      {loading || isPending ? <Spinner /> : "shuffle"}
    </button>
  );
}
