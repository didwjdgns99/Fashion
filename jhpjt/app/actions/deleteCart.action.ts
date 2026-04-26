"use server";

import { DeleteCartRequest, deleteCartApi } from "../api/cartApi";

export async function deleteCartAction(payload: DeleteCartRequest) {
  return deleteCartApi(payload);
}
