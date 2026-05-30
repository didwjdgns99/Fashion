"use server";
import { http } from "@/app/api/http";
import { cookies } from "next/headers";
import { API_ROUTES } from "@/app/utills/constants/api";

type LoginPayload = {
  email: string;
  password: string;
};

export const postLoginAction = async ({ email, password }: LoginPayload) => {
  const result = await http(API_ROUTES.LOGIN, {
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
};
