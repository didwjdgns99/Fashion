// app/api/products/route.ts
import { getProductsApi } from "@/app/api/productsApi";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const size = Number(searchParams.get("size") ?? 6);
  const cursor = searchParams.get("cursor") ?? null;

  const data = await getProductsApi({ size, cursor });
  return Response.json(data);
}
