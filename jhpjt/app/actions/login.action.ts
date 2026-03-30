"use server";
import { http } from "@/app/api/http";

type LoginPayload = {
  email: string;
  password: string;
};

export const postLoginAction = async ({ email, password }: LoginPayload) => {
  try {
    return await http("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        isError: true,
        message: error.message,
      };
    }
    return {
      isError: true,
      message: "로그인 실패",
    };
  }
};
