"use server";

import { getCartApi } from "@/app/api/cartApi";
import { ApiError } from "../api/http";

export async function getCartAction() {
  try {
    const result = await getCartApi();
    return {
      isError: false,
      message: result.message ?? "장바구니 정보를 불러왔습니다.",
      cart: result.cart,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        message: error.message ?? "장바구니 정보를 불러오는데 실패했습니다.",
        status: error.status,
      };
    }

    return {
      isError: true,
      status: 500,
      message: "장바구니 정보를 불러오는데 실패했습니다.",
    };
  }
}
