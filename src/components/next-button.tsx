"use client";

import { useState, useTransition } from "react";
import { nextItem } from "@/app/api/actions";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";

export default function NextButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const res = await nextItem();
    setLoading(false);
    if (
      res?.[0]?.problem_name !== undefined &&
      res?.[0].problem_name !== null
    ) {
      startTransition(() => router.push(`/pick-random/${res[0].problem_name}`));
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
