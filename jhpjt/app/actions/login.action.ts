"use server";
import { http } from "@/app/api/http";
import { cookies } from "next/headers";

type LoginPayload = {
  email: string;
  password: string;
};

export const postLoginAction = async ({ email, password }: LoginPayload) => {
  try {
    const result = await http("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!result.isError && result.token) {
      const cookieStore = await cookies();

      cookieStore.set("token", result.token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/",
      });
    }

    return result;
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
