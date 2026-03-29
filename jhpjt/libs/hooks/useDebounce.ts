// "use client";

// import { useEffect } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// type UseSearchQueryProps = {
//   keyword: string;
// };

// export function useDebounce({ keyword }: UseSearchQueryProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const params = new URLSearchParams(searchParams);

//       const trimmedKeyword = keyword.trim();

//       if (trimmedKeyword) {
//         params.set("keyword", trimmedKeyword);
//       } else {
//         params.delete("keyword");
//       }

//       params.delete("cursor");

//       router.push(`${pathname}?${params.toString()}`);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [keyword]);
// }

"use client";

type useDebounceProps = {
  value: string;
  delay?: number;
};

import { useState, useEffect } from "react";

export default function useDebounce({ value, delay = 500 }: useDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
