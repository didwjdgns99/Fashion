"use client";

import { useGetOrders } from "@/libs/hooks/useGetOrders";
export type OrderState = "결제완료" | "배송중" | "배송완료" | "반품/취소";

export default function OrderState() {
  const { data, isPending, isError } = useGetOrders();

  console.log("OrderState 실행됨");
  console.log("data:", data);
  console.log("isPending:", isPending);
  console.log("isError:", isError);

  if (isPending) {
    return <div>주문 상태 불러오는 중...</div>;
  }

  if (isError || data?.isError) {
    return <div>주문 상태를 불러오지 못했습니다.</div>;
  }

  const orders = data?.orders ?? [];

  const paidCount = orders.filter(
    (order) => order.orderStatus === "결제완료",
  ).length;

  // 배송중 개수
  const shippingCount = orders.filter(
    (order) => order.deliveryStatus === "배송중",
  ).length;

  // 배송완료 개수
  const deliveredCount = orders.filter(
    (order) => order.deliveryStatus === "배송완료",
  ).length;

  // 반품/교환 개수
  const canceledCount = orders.filter(
    (order) => order.orderStatus === "반품/취소",
  ).length;

  console.log("데이타입니다아다다닫 ", data);

  const states = [
    { state: "결제완료", orderQuantity: paidCount },
    { state: "배송중", orderQuantity: shippingCount },
    { state: "배송완료", orderQuantity: deliveredCount },
    { state: "반품/취소", orderQuantity: canceledCount },
  ];

  return (
    <div className="flex flex-col gap-4 px-8 bg-white py-4">
      <h3 className="font-bold text-md">주문 배송</h3>
      <div className="flex justify-between">
        {states.map((item) => (
          <div key={item.state} className="flex flex-col items-center gap-1">
            <p className="flex justify-center items-center bg-black rounded-full text-white w-12 h-12 mb-1 font-bold">
              {item.orderQuantity ?? 0}
            </p>
            <p className="text-sm">{item.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
