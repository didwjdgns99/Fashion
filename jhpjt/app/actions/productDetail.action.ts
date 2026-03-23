"use server";

import { getProductDetail } from "@/libs/services/productDtail";

export async function getProductDetailAvtion(id: string) {
  try {
    return await getProductDetail(id);
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);
    throw new Error("상품 상세 정보를 불러올 수 없습니다.");
  }
}
