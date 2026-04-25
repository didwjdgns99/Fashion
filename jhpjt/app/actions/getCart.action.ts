"use server";

import { cookies } from "next/headers";
import { getCartApi } from "@/app/api/cartApi";

export async function getCartAction() {
  const token = (await cookies()).get("token")?.value;

  return getCartApi(token ? `token=${token}` : undefined);
}
