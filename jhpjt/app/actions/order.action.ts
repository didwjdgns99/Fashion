"use server";

import { createOrderApi, getOrdersApi } from "../api/orderApi";
import { ApiError } from "@/app/api/http";

export async function createOrderAction() {
  try {
    const result = await createOrderApi();
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
