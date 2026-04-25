"use server";

import { cookies } from "next/headers";
import { addCartApi, AddCartRequest } from "@/app/api/cartApi";

export async function addCartAction(payload: AddCartRequest) {
  const token = (await cookies()).get("token")?.value;

  return addCartApi(payload, token ? `token=${token}` : undefined);
}
