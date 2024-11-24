"use client";

import { useState, useTransition } from "react";
import { shuffleArray } from "@/app/api/actions";
import Spinner from "@/components/icons/spinner";
import { useRouter } from "next/navigation";

export default function ShuffleButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const firstItem = await shuffleArray();
    setLoading(false);

    startTransition(() => router.push(`/pick-random/${firstItem}`));
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
