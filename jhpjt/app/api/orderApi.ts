import { http } from "@/app/api/http";
import { API_ROUTES } from "@/app/utills/constants/api";

// export type OrderItem = {
//   productId: string;
//   size: string;
//   quantity: number;
// };

// export type OrderPayload = {
//   items: OrderItem[];
// };

// type CreateOrderResponse = {
//   orderId: string;
//   amount: number;
//   orderName: string;
//   isError: boolean;
// };

// export default async function createOrderApi(
//   payload: OrderPayload,
// ): Promise<CreateOrderResponse> {
//   const result = await http(
//     API_ROUTES.ORDER,
//     {
//       method: "POST",
//       body: JSON.stringify(payload),
//     },
//     {
//       authRequired: true,
//     },
//   );

//   return result;
// }

export default function createOrderApi() {
  return http(
    API_ROUTES.ORDER,
    {
      method: "POST",
    },
    {
      authRequired: true,
    },
  );
}
