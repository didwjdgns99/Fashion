"use client";

import { useQuery } from "@tanstack/react-query";
// import { getMeAction } from "@/app/actions/getMe.action";
import { getMeWithDuck } from "@/app/api/getMeWithDuck";

export function useUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMeWithDuck,
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
  });
}
