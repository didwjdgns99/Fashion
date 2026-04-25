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

export function getCartApi(cookie?: string) {
  return http("/api/cart", {
    method: "GET",
    headers: {
      ...(cookie ? { Cookie: cookie } : {}),
    },
  });
}

export function addCartApi(payload: AddCartRequest, cookie?: string) {
  return http("/api/cart", {
    method: "POST",
    headers: {
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify(payload),
  });
}

export function patchCartApi(payload: PatchCartRequest, cookie?: string) {
  return http("/api/cart", {
    method: "PATCH",
    headers: {
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify(payload),
  });
}

export function deleteCartApi(payload: DeleteCartRequest, cookie?: string) {
  return http("/api/cart", {
    method: "DELETE",
    headers: {
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify(payload),
  });
}
