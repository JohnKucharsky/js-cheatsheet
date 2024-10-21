"use client";

import { useState } from "react";
import { nextItem } from "@/app/api/actions";

export default function NextButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    await nextItem();
    setLoading(false);
  };
  return (
    <button disabled={loading} onClick={handleClick} className={"text-white"}>
      {loading ? "waiting..." : "next"}
    </button>
  );
}
