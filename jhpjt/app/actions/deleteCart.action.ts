"use server";

import { DeleteCartRequest, deleteCartApi } from "../api/cartApi";
import { ApiError } from "../api/http";
export async function deleteCartAction(payload: DeleteCartRequest) {
  try {
    const data = await deleteCartApi(payload);
    return {
      isError: false,
      message: data.message ?? "장바구니에서 상품이 삭제되었습니다.",
      data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message ?? "장바구니에서 상품 삭제에 실패했습니다.",
      };
    }

    return {
      isError: true,
      status: 500,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
