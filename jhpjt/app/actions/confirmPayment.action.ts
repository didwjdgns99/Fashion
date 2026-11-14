"use server";

import { confirmPaymentApi } from "@/app/api/pay";
import { ApiError } from "@/app/api/http";
import { cookies } from "next/headers";

export default async function confirmPaymentAction(data: {
  paymentKey: string;
  orderId: string;
  amount: number;
}) {
  if ((await cookies()).get("demo-mode")?.value === "1") {
    return {
      isError: true,
      message: "체험 모드에서는 결제를 진행할 수 없습니다.",
      status: 403,
    };
  }

  try {
    const result = await confirmPaymentApi(data);
    console.log("result 결과", result);
    return {
      isError: false,
      payment: result.payment,
      message: result.message,
      order: result.order,
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
