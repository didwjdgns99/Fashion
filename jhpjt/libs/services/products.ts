// import {
//   ProductsCursorResponse,
//   ProductsCursorParams,
// } from "../types/products";

// const SIZE = 6;

// type Options = {
//   baseUrl?: string; // 서버 프리패치용
// };

// export async function getProducts(
//   params: ProductsCursorParams = {}, //params를 안넘기면 빈객체를 넘기겠다.
//   options: Options = {},
// ): Promise<ProductsCursorResponse> {
//   const cursor = params.cursor ?? null; //사이즈는 항상 보내야하고 cursor는 첫 요청은 없음

//   const qs = new URLSearchParams({ size: String(SIZE) }); //쿼리스트링을 만들어서 size를 보낸다.

//   if (cursor !== null) qs.set("cursor", cursor); // cursor가 null이 아니면 새로만든 qs에 cursor=cursor (문자열=반환값)형태로 넣겠다?

//   const baseUrl = options.baseUrl ?? "";
//   const res = await fetch(`${baseUrl}/api/products?${qs.toString()}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error("상품 조회 실패");

//   return res.json();
// }

// import {
//   ProductsCursorResponse,
//   ProductsCursorParams,
// } from "../types/products";

// const SIZE = 6;

// type Options = {
//   baseUrl?: string; // 서버 프리패치용
// };

// export async function getProducts(
//   params: ProductsCursorParams = {}, //params를 안넘기면 빈객체를 넘기겠다.
//   options: Options = {},
// ): Promise<ProductsCursorResponse> {
//   const cursor = params.cursor ?? null; //사이즈는 항상 보내야하고 cursor는 첫 요청은 없음

//   const qs = new URLSearchParams({ size: String(SIZE) }); //쿼리스트링을 만들어서 size를 보낸다.

//   if (cursor !== null) qs.set("cursor", cursor); // cursor가 null이 아니면 새로만든 qs에 cursor=cursor (문자열=반환값)형태로 넣겠다?

//   const baseUrl = options.baseUrl ?? "";
//   const res = await fetch(`${baseUrl}/api/products?${qs.toString()}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error("상품 조회 실패");

//   return res.json();
// }

import {
  ProductsCursorResponse,
  ProductsRequestParams,
} from "../types/products";
import { http } from "@/app/api/http";

const SIZE = 6;

export async function getProducts(
  params: ProductsRequestParams = {},
): Promise<ProductsCursorResponse> {
  const cursor = params.cursor ?? null; //사이즈는 항상 보내야하고 cursor는 첫 요청은 없음
  const keyword = (params.keyword ?? "").trim();
  const category = (params.category ?? "").trim();
  const qs = new URLSearchParams({ size: String(SIZE) }); //쿼리스트링을 만들어서 size를 보낸다.

  if (cursor !== null) qs.set("cursor", String(cursor)); // cursor가 null이 아니면 새로만든 qs에 cursor=cursor (문자열=반환값)형태로 넣겠다?
  if (keyword) qs.set("keyword", keyword);
  if (category) qs.set("category", category);
  return await http(`/api/products?${qs.toString()}`, {
    method: "GET",
    next: { revalidate: 60 },
  });
}
