import { http } from "@/app/api/http";

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
    "/api/cart",
    {
      method: "GET",
    },
    { authRequired: true },
  );
}

export function addCartApi(payload: AddCartRequest) {
  return http(
    "/api/cart",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { authRequired: true },
  );
}

export function patchCartApi(payload: PatchCartRequest) {
  return http(
    "/api/cart",
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
    { authRequired: true },
  );
}

export function deleteCartApi(payload: DeleteCartRequest) {
  return http(
    "/api/cart",
    {
      method: "DELETE",

      body: JSON.stringify(payload),
    },
    { authRequired: true },
  );
}
