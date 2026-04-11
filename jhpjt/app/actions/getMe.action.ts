"use server";
import { http } from "@/app/api/http";
import { cookies } from "next/headers";

export const getMeAction = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value; //token이란 이름의 value를 가져온다.

    return await http("/api/me", {
      method: "GET",
      headers: token ? { cookie: `token=${token}` } : {},
    });
  } catch (error) {
    console.error("getMeAction error:", error);
    throw error;
  }
};
