"use client";

import { useMutation } from "@tanstack/react-query";
import { postAuthAction } from "@/app/actions/auth.action";

export type SignupRequest = {
  email: string;
  password: string;
  nickName: string;
};

export const useSignup = () => {
  return useMutation<unknown, unknown, SignupRequest>({
    mutationFn: postAuthAction,
  });
};
