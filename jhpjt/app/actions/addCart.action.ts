"use server";

import { addCartApi, AddCartRequest } from "@/app/api/cartApi";

export async function addCartAction(payload: AddCartRequest) {
  return addCartApi(payload);
}
