"use server";

import createOrderApi from "../api/orderApi";
import { ApiError } from "@/app/api/http";
import { OrderPayload } from "../api/orderApi";

export async function createOrderAction(payload: OrderPayload) {
  try {
    const result = await createOrderApi(payload);

    return {
      isError: false,
      data: {
        orderId: result.orderId,
        amount: result.amount,
        orderName: result.orderName,
      },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message || "cresteOrderAction 에러",
      };
    }

    return {
      isError: true,
      status: 500,
      message: "주문 생성 실패",
    };
  }
}
