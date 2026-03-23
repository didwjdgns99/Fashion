import { http } from "@/app/api/http";

export async function getProductDetail(id: string) {
  const res = await http(`/api/products/${id}`);
  return res;
}
