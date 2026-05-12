"use server";

import createOrderApi from "../api/orderApi";

export async function createOrderAction() {
  return createOrderApi();
}
