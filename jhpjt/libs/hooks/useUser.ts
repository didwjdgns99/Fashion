"use client";

import { useQuery } from "@tanstack/react-query";
import { getMeAction } from "@/app/actions/getMe.action";

export function useUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMeAction,
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
  });
}
