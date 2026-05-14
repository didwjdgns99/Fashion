"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrdersAction } from "@/app/actions/order.action";

// export type Order = {
//   orderStatus?: string;
//   deliveryStatus?: string;
//   orderId?: string;
//   orderBadge?: string;
//   createdAt?: string;
//   totalPrice: string;
//   orderQuantity: number;
//   imageUrl: string;
// };

type GetOrdersResponse = {
  isError: boolean;
  status: number;
  message: string;
  orders: Order[];
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size: string;
};

export type Order = {
  orderStatus?: string;
  deliveryStatus?: string;
  orderId?: string;
  orderBadge?: string;
  createdAt?: string;
  totalPrice: number;
  items: OrderItem[];
};

export function useGetOrders() {
  console.log("useGetOrders 훅 실행됨");
  return useQuery<GetOrdersResponse>({
    queryKey: ["orders"],
    queryFn: getOrdersAction,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });
}
