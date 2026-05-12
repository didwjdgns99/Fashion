"use client";

import Image from "next/image";
import paysuccess from "@/public/image/paysuccess.svg";
import RecentOrder from "@/app/components/order/recentOrder";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import confirmPaymentAction from "@/app/actions/confirmPayment.action";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    const confirm = async () => {
      if (!paymentKey || !orderId || !amount) return;

      const result = await confirmPaymentAction({
        paymentKey,
        orderId,
        amount: Number(amount),
      });

      console.log("결제 승인 결과:", result);
    };

    confirm();
  }, [paymentKey, orderId, amount]);

  const handleClick = () => {
    router.push("/mypage");
  };

  return (
    <div className="flex flex-col items-center w-full gap-10 px-4">
      <Image
        src={paysuccess}
        alt="결제성공 체크이미지"
        width={100}
        height={100}
      />
      <span className="font-bold text-2xl">결제완료</span>
      <div className="w-full">
        <RecentOrder />
      </div>
      <button
        onClick={handleClick}
        className="border border-1 rounded-xl w-full mx-auto py-3 bg-white flex gap-4 justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-colors"
      >
        내 주문내역 확인하기
      </button>
    </div>
  );
}
