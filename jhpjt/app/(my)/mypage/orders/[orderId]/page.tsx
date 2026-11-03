"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import OrderActions from "@/app/components/order/OrderActions";
import { useGetOrders } from "@/libs/hooks/useGetOrders";

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data, isPending, isError } = useGetOrders();
  const order = data?.orders.find((item) => item.orderId === orderId);

  if (isPending) {
    return <p className="p-5">주문 정보를 불러오는 중...</p>;
  }

  if (isError || data?.isError) {
    return <p className="p-5">주문 정보를 불러오지 못했습니다.</p>;
  }

  if (!order) {
    return <p className="p-5">주문 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-5 p-5">
      <Link href="/mypage" className="text-sm text-gray-600 hover:underline">
        ← 주문 목록
      </Link>
      <section className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">주문 상세보기</h1>
          <p className="mt-2 text-sm text-gray-500">
            주문번호: {order.orderId}
          </p>
          <p className="text-sm text-gray-500">
            주문일: {order.createdAt?.split("T")[0]}
          </p>
        </div>
        {order.orderId && (
          <OrderActions
            orderId={order.orderId}
            deliveryStatus={order.deliveryStatus}
            returnRequestedAt={order.returnRequestedAt}
            showDetails={false}
          />
        )}
      </section>
      <section className="flex flex-col gap-4 rounded-xl border p-4">
        {order.items.map((item, index) => (
          <div
            key={`${item.productId}-${item.size}-${index}`}
            className="flex items-center gap-4"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded object-cover"
            />
            <div className="flex flex-1 flex-col gap-1">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-500">
                사이즈 {item.size} · {item.quantity}개
              </span>
            </div>
            <span className="text-sm font-semibold">
              {(item.price * item.quantity).toLocaleString()}원
            </span>
          </div>
        ))}
        <div className="flex justify-between border-t pt-4 font-bold">
          <span>총 결제 금액</span>
          <span>{order.totalPrice.toLocaleString()}원</span>
        </div>
        {order.returnRequestedAt && (
          <p className="text-sm text-orange-700">
            반품 요청 접수: {order.returnRequestedAt.split("T")[0]}
          </p>
        )}
      </section>
      {order.shippingAddress && (
        <section className="flex flex-col gap-2 rounded-xl border p-4 text-sm">
          <h2 className="font-bold">배송지 정보</h2>
          <p>받는 사람: {order.shippingAddress.recipientName}</p>
          <p>연락처: {order.shippingAddress.recipientPhone}</p>
          <p>
            주소: ({order.shippingAddress.postalCode}){" "}
            {order.shippingAddress.address} {order.shippingAddress.detailAddress}
          </p>
          {order.shippingAddress.deliveryRequest && (
            <p>배송 요청사항: {order.shippingAddress.deliveryRequest}</p>
          )}
        </section>
      )}
    </main>
  );
}
