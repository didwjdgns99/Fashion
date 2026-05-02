import { http } from "@/app/api/http";
import { API_ROUTES } from "@/app/utills/constants/api";

export type AddCartRequest = {
  productId: string;
  size: string;
  quantity: number;
};

export type PatchCartRequest = {
  productId: string;
  size: string;
  quantity: number;
};

export type DeleteCartRequest = {
  productId: string;
  size: string;
};

export function getCartApi() {
  return http(
    API_ROUTES.CART,
    {
      method: "GET",
    },
    { authRequired: true },
  );
}

export function addCartApi(payload: AddCartRequest) {
  return http(
    API_ROUTES.CART,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { authRequired: true },
  );
}

export function patchCartApi(payload: PatchCartRequest) {
  return http(
    API_ROUTES.CART,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
    { authRequired: true },
  );
}

export function deleteCartApi(payload: DeleteCartRequest) {
  return http(
    API_ROUTES.CART,
    {
      method: "DELETE",

      body: JSON.stringify(payload),
    },
    { authRequired: true },
  );
}
