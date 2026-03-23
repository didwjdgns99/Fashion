// import { http } from "@/app/api/http";

// export async function getProductsApi() {
//   return http("/api/products", { method: "GET" });
// }

import { http } from "@/app/api/http";

export async function getProductsApi(params: {
  size: number;
  cursor?: string | null;
}) {
  const qs = new URLSearchParams({ size: String(params.size) });
  if (params.cursor !== null && params.cursor !== undefined)
    qs.set("cursor", params.cursor);

  return http(`/api/products?${qs.toString()}`);
}
