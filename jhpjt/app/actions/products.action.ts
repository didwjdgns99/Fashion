"use server";
import { getProducts } from "@/libs/services/products";

export async function getProductsAction(params = {}) {
  console.log("[ACTION] called", params);
  return getProducts(params);
}
