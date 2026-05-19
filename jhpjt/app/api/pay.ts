import { http } from "@/app/api/http";
import { Payment } from "@/libs/types/payment";

export type Order = {
  _id: string;
  orderId: string;
  userId: string;

  totalPrice: number;

  orderStatus: string;
  deliveryStatus: string;

  paymentKey?: string;

  items: {
    productId: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    size: string;
  }[];

  createdAt: string;
  updatedAt: string;
};

type ConfirmPaymentResponse = {
  isError: boolean;
  message: string;
  payment: Payment;
  order: Order;
};

export async function confirmPaymentApi(data: {
  paymentKey: string;
  orderId: string;
  amount: number;
}): Promise<ConfirmPaymentResponse> {
  return http(
    "/api/payment/confirm",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    {
      authRequired: true,
    },
  );
}

export async function failPaymentApi() {}
