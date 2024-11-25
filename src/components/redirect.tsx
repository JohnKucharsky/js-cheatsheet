"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect({ slug }: { slug: string | undefined }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname.includes("pick-random/") && slug) {
      router.push(`/pick-random/${slug}`);
    }
  }, []);

  return <></>;
}
