"use server";

import {
  createOrderApi,
  getOrdersApi,
  updateOrderActionApi,
  type ShippingAddress,
} from "../api/orderApi";
import { ApiError } from "@/app/api/http";

export async function createOrderAction(data: {
  shippingAddress: ShippingAddress;
}) {
  try {
    const result = await createOrderApi(data.shippingAddress);
    return {
      isError: false,
      status: 200,
      message: result.message ?? "주문 생성 성공",
      order: result.order,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message,
      };
    }

    return {
      isError: true,
      status: 500,
      message: "주문 생성 실패",
    };
  }
}

export async function getOrdersAction() {
  console.log("getOrdersAction 실행됨");
  try {
    const result = await getOrdersApi();

    return {
      isError: false,
      status: 200,
      message: result.message || "주문 조회 성공",
      orders: result.orders ?? [],
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message,
        orders: [],
      };
    }

    return {
      isError: true,
      status: 500,
      message: "주문 조회 실패",
      orders: [],
    };
  }
}

export async function updateOrderAction(data: {
  orderId: string;
  action: "cancel" | "return";
}) {
  console.info("[주문 Server Action] 요청 시작", data);
  try {
    const result = await updateOrderActionApi(data.orderId, data.action);

    console.info("[주문 Server Action] API 응답 수신", {
      orderId: data.orderId,
      action: data.action,
    });
    return {
      isError: false,
      status: 200,
      message: result.message,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("[주문 Server Action] API 오류", {
        orderId: data.orderId,
        action: data.action,
        status: error.status,
        message: error.message,
      });
      return {
        isError: true,
        status: error.status,
        message: `주문 API 오류 (${error.status}): ${error.message}`,
      };
    }

    console.error("[주문 Server Action] 처리 오류", error);
    return {
      isError: true,
      status: 500,
      message: `Server Action 처리 오류: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
