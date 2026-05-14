"use client";

import { useCartStore } from "@/libs/store/cartStore";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { createOrderAction } from "@/app/actions/order.action";
import showToast from "@/lib/showToast";

export default function CartBotSheet() {
  const items = useCartStore((state) => state.cartItems);
  console.log(items);
  if (items.length === 0) return null;
  const productTotal = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const handlePayment = async () => {
    try {
      // 1. 백엔드에 주문 생성 요청만 보냄
      // 장바구니 조회, 가격 계산, orderId 생성은 백엔드가 함
      const result = await createOrderAction();

      // 2. 백엔드 주문 생성 실패 처리
      if (result.isError) {
        console.log("주문 생성 실패:", result.message);
        showToast({
          type: "error",
          children: result.message ?? "주문 실패",
        });
        return;
      }

      if (
        !result.order?.amount ||
        !result.order?.orderId ||
        !result.order?.orderName
      ) {
        console.log("토스 필수값 없음:", result);

        showToast({
          type: "error",
          children: "결제에 필요한 주문 정보가 없습니다.",
        });
        return;
      }

      // 3. 토스 결제 객체 불러오기
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!,
      );

      // 4. 백엔드가 반환한 값으로 토스 결제창 열기
      await tossPayments.requestPayment("카드", {
        amount: result.order.amount,
        orderId: String(result.order.orderId),
        orderName: result.order.orderName,
        successUrl: `${window.location.origin}/pay/success`,
        failUrl: `${window.location.origin}/pay/fail`,
      });
    } catch (error) {
      console.error("결제 에러:", error);

      showToast({
        type: "error",
        children: "결제 진행 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <div className="flex flex-col fixed bottom-0 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] left-0 w-full px-4 h-50 items-center">
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
      <button
        onClick={handlePayment}
        className="bg-black text-white w-full py-3 rounded-xl"
      >
        결제하기
      </button>
    </div>
  );
}
