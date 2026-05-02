"use server";

import { http } from "@/app/api/http";

export async function patchMyImageAction(formData: FormData) {
  try {
    return await http(
      "/api/me",
      {
        method: "PATCH",
        body: formData,
        cache: "no-store",
      },
      {
        authRequired: true,
      },
    );
  } catch (error) {
    console.error("patchMyImage error:", error);
    throw error;
  }
}
