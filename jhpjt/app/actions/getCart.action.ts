"use server";

import { getCartApi } from "@/app/api/cartApi";

export async function getCartAction() {
  return getCartApi();
}
