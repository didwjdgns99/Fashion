"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsAction } from "@/app/actions/products.action";

export function useGetProductsInfinite(keyword: string, category: string) {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", keyword, category],

    initialPageParam: null as string | null, //첫 요청  cursor 없으므로 null ,무한스크롤에 있는 옵션

    queryFn: ({ pageParam }) =>
      getProductsAction({ cursor: pageParam, keyword, category }),

    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });
}

// "use client";

// import { useInfiniteQuery } from "@tanstack/react-query";
// import { getProducts } from "@/libs/services/products";
// import type { ProductsCursorResponse } from "@/libs/types/products";

// export function useGetProductsInfinite() {
//   return useInfiniteQuery<
//     ProductsCursorResponse, // queryFn이 반환하는 타입 즉 서버에서 주는 타입
//     Error, // 에러 타입
//     { pages: ProductsCursorResponse[]; pageParams: (string | null)[] }, //무한스크롤 각 페이지마다 오는 데이터 타입
//     ["products", "infinite"], // queryKey 타입
//     string | null // cursor 타입
//   >({
//     queryKey: ["products", "infinite"],

//     initialPageParam: null, //첫 요청  cursor 없으므로 null

//     queryFn: ({ pageParam }) => getProducts({ cursor: pageParam }),

//     getNextPageParam: (lastPage) =>
//       lastPage.hasNext ? lastPage.nextCursor : undefined,
//   });
// }
