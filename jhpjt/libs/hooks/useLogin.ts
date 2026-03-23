"use client";

import { useMutation } from "@tanstack/react-query";
import { postLoginAction } from "@/app/actions/login.action";

export type LoginRequest = {
  email: string;
  password: string;
};

//로그인 리스폰스값, 에러타입, 페이로드
export const useLogin = () => {
  return useMutation<unknown, unknown, LoginRequest>({
    mutationFn: postLoginAction,
  });
};
