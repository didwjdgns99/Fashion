"use client";

import { useMutation } from "@tanstack/react-query";
import { postAuthAction } from "@/app/actions/auth.action";

export type SignupRequest = {
  email: string;
  password: string;
  nickName: string;
};

type SignupResponse = {
  isError: boolean;
  status?: number;
  message: string;
  data?: unknown;
};

export const useSignup = () => {
  return useMutation<SignupResponse, unknown, SignupRequest>({
    mutationFn: async (payload) => {
      const result = await postAuthAction(payload);
      return result;
    },
  });
};
