import { http } from "@/app/api/http";
import { API_ROUTES } from "@/app/utills/constants/api";

export function createOrderApi() {
  return http(
    API_ROUTES.ORDER,
    {
      method: "POST",
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
