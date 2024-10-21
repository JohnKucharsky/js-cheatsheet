"use client";

import { useState } from "react";
import { shuffleArray } from "@/app/api/actions";

export default function ShuffleButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    await shuffleArray();
    setLoading(false);
  };
  return (
    <button disabled={loading} onClick={handleClick} className={"text-white"}>
      {loading ? "waiting..." : "shuffle"}
    </button>
  );
}
