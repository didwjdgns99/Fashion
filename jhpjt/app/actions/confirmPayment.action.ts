"use server";

import { confirmPaymentApi } from "@/app/api/pay";
import { ApiError } from "@/app/api/http";

export default async function confirmPaymentAction(data: {
  paymentKey: string;
  orderId: string;
  amount: number;
}) {
  try {
    const result = await confirmPaymentApi(data);
    console.log("result 결과", result);
    return {
      isError: false,
      payment: result.payment,
      message: result.message,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        message: error.message,
        status: error.status,
      };
    }
    return {
      isError: true,
      message: "결제 승인 실패",
      status: 500,
    };
  }
}
