"use server";

import { cookies } from "next/headers";
import { DeleteCartRequest, deleteCartApi } from "../api/cartApi";

export async function deleteCartAction(payload: DeleteCartRequest) {
  const token = (await cookies()).get("token")?.value;

  return deleteCartApi(payload, token ? `token=${token}` : undefined);
}
