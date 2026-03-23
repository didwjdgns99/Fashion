"use client";
import { useQuery } from "@tanstack/react-query";
import { getProductDetailAvtion } from "@/app/actions/productDetail.action";

export default function useGetProductDtail(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetailAvtion(id),
    enabled: !!id,
  });
}
