"use client";

import Image from "next/image";
import { useGetOrders } from "@/libs/hooks/useGetOrders";

function getBadgeStyle(status?: string) {
  switch (status) {
    case "상품 준비중":
      return "bg-blue-400 text-white";
    case "배송중":
      return "bg-violet-400 text-white";
    case "배송완료":
      return "bg-green-400 text-white";
    case "반품/취소":
      return "bg-red-400 text-white";
    default:
      return "bg-gray-300 text-black";
  }
}

export default function SuccessCard() {
  const { data } = useGetOrders();
  if (!data?.orders.length) {
    return <div>주문 내역이 없습니다.</div>;
  }
  return (
    <div className="h-100 overflow-hidden overflow-y-auto flex flex-col gap-2">
      {data?.orders?.slice(0, 5).map((order) => (
        <div
          key={order.orderId}
          className="border p-3 rounded-xl flex flex-col gap-2"
        >
          <div className="flex justify-between items-start ">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500 font-bold">
                {order.createdAt?.split("T")[0]}
              </span>
              <span className="text-[15px] font-medium">
                주문번호: {order.orderId}
              </span>
            </div>
            <span
              className={`text-[11px] font-medium px-2 py-1 rounded-xl  ${getBadgeStyle(
                order.deliveryStatus,
              )}`}
            >
              {order.deliveryStatus}
            </span>
          </div>
          <div>
            <div key={order.orderId} className="flex gap-4">
              {order.items.map((item) => (
                <Image
                  key={item.productId}
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-25 h-25 object-cover rounded-sm"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between border-t-1  py-2">
            <span className="text-[15px] text-black font-bold">
              총 {order.items.length} 개의 상품
            </span>
            <span className=" font-semibold">
              {order.totalPrice.toLocaleString()} 원
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
