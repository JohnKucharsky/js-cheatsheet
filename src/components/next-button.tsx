"use client";

import { useState } from "react";
import { nextItem } from "@/app/api/actions";
import Spinner from "@/components/spinner";

export default function NextButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    await nextItem();
    setLoading(false);
  };
  return (
    <button disabled={loading} onClick={handleClick} className={"text-white"}>
      {loading ? <Spinner /> : "next"}
    </button>
  );
}
