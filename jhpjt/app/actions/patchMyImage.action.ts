"use server";

import { getAuthCookie } from "@/libs/services/getCookies";

export async function patchMyImageAction(formData: FormData) {
  try {
    const cookie = await getAuthCookie();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, {
      method: "PATCH",
      headers: cookie ? { Cookie: cookie } : {},
      body: formData,
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("프로필 이미지수정 실패");
    }

    return res;
  } catch (error) {
    console.error("patchMyImage error:", error);
    throw error;
  }
}
