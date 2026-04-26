"use server";

import { patchCartApi, PatchCartRequest } from "@/app/api/cartApi";

export async function PatchCartAction(payload: PatchCartRequest) {
  return patchCartApi(payload);
}
