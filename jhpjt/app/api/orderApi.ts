import { ApiError, http } from "@/app/api/http";
import { API_ROUTES } from "@/app/utills/constants/api";

export type ShippingAddress = {
  recipientName: string;
  recipientPhone: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  deliveryRequest: string;
};

export function createOrderApi(shippingAddress: ShippingAddress) {
  return http(
    API_ROUTES.ORDER,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
    },
    {
      authRequired: true,
    },
  );
}

export function getOrdersApi() {
  console.log("getOrdersApi 실행됨:", API_ROUTES.ORDER);

  return http(
    API_ROUTES.ORDER,
    {
      method: "GET",
      cache: "no-store",
    },
    {
      authRequired: true,
    },
  );
}

export function updateOrderActionApi(
  orderId: string,
  action: "cancel" | "return",
) {
  const path = `${API_ROUTES.ORDER}/${encodeURIComponent(orderId)}`;
  console.info("[주문 API] 요청 시작", { method: "PATCH", path, action });

  return http(
    path,
    {
      method: "PATCH",
      body: JSON.stringify({ action }),
    },
    {
      authRequired: true,
    },
  ).then(
    (result) => {
      console.info("[주문 API] 응답 성공", { orderId, action });
      return result;
    },
    (error: unknown) => {
      console.error("[주문 API] 요청 실패", {
        orderId,
        action,
        status: error instanceof ApiError ? error.status : undefined,
        message: error instanceof Error ? error.message : String(error),
      });
      throw error;
    },
  );
}
