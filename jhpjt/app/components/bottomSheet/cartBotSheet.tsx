"use client";

import { useCartStore } from "@/libs/store/cartStore";

export default function CartBotSheet() {
  const items = useCartStore((state) => state.cartItems);

  if (items.length === 0) return null;
  const productTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <div className="flex flex-col fixed bottom-0 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] left-0 w-full px-4 h-50 items-center flex">
      <div className="w-full px-4 mb-4 pt-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p>상품금액</p>
            <p>{productTotal.toLocaleString()} 원</p>
          </div>
          <div className="flex justify-between">
            <p>배송비</p>
            <p>무료</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p>총 결제금액</p>
          <p>{productTotal.toLocaleString()} 원</p>
        </div>
      </div>
      <button className="bg-black text-white w-full py-3 rounded-xl">
        결제하기
      </button>
    </div>
  );
}
