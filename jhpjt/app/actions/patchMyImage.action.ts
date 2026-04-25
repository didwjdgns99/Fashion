"use server";

import { cookies } from "next/headers";

export async function patchMyImageAction(formData: FormData) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, {
      method: "PATCH",
      headers: token ? { cookie: `token=${token}` } : {},
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
