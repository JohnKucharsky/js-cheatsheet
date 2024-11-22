"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/spinner";

export default function ClientRedirect({
  problemName,
}: {
  problemName: string;
}) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/pick-random/${problemName}`);
  }, []);

  return <Spinner />;
}
