"use server";

import { addCartApi, AddCartRequest } from "@/app/api/cartApi";
import { ApiError } from "../api/http";

export async function addCartAction(payload: AddCartRequest) {
  try {
    const result = await addCartApi(payload);

    return {
      isError: false,
      message: result.message ?? "장바구니에 상품이 추가되었습니다.",
      cart: result.cart,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message ?? "장바구니에 상품 추가에 실패했습니다.",
      };
    }

    return {
      isError: true,
      status: 500,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
