import { http } from "@/app/api/http";

type ConfirmPaymentResponse = {
  isError: boolean;
  message: string;
  payment: unknown;
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
