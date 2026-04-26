"use server";
import { http } from "@/app/api/http";
import { getAuthCookie } from "@/libs/services/getCookies";

export const getMeAction = async () => {
  try {
    const cookie = await getAuthCookie();

    return await http("/api/me", {
      method: "GET",
      headers: cookie ? { cookie } : {},
    });
  } catch (error) {
    console.error("getMeAction error:", error);
    throw error;
  }
};
