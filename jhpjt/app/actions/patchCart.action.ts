"use server";

import { cookies } from "next/headers";
import { patchCartApi, PatchCartRequest } from "@/app/api/cartApi";

export async function PatchCartAction(payload: PatchCartRequest) {
  const token = (await cookies()).get("token")?.value;

  return patchCartApi(payload, token ? `token=${token}` : undefined);
}
