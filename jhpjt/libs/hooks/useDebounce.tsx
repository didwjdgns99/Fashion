"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UseSearchQueryProps = {
  keyword: string;
};

export function useDebounce({ keyword }: UseSearchQueryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      const trimmedKeyword = keyword.trim();

      if (trimmedKeyword) {
        params.set("keyword", trimmedKeyword);
      } else {
        params.delete("keyword");
      }

      params.delete("cursor");

      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);
}
