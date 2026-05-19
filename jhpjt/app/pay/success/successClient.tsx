"use client";

import Image from "next/image";
import paysuccess from "@/public/image/paysuccess.svg";
import SuccessCard from "@/app/pay/success/successCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import confirmPaymentAction from "@/app/actions/confirmPayment.action";
import { Order } from "@/app/api/pay";
import { Payment } from "@/libs/types/payment";
type ConfirmPaymentResult = {
  isError: boolean;
  payment?: Payment;
  message: string;
  status?: number;
  order?: Order;
};

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderData, setOrderData] = useState<ConfirmPaymentResult | null>(null);
  useEffect(() => {
    const confirm = async () => {
      try {
        if (!paymentKey || !orderId || !amount) {
          router.replace("/pay/fail");
          return;
        }

        const result = await confirmPaymentAction({
          paymentKey,
          orderId,
          amount: Number(amount),
        });

        if (result.isError) {
          router.replace("/pay/fail");
          return;
        }

        setOrderData(result);

        setIsConfirmed(true);

        console.log("결제 승인 결과:", result);
      } catch (error) {
        console.error("결제 승인 실패:", error);
        router.replace("/pay/fail");
      }
    };

    confirm();
  }, [paymentKey, orderId, amount]);

  const handleClick = () => {
    router.push("/mypage");
  };

  if (!isConfirmed) {
    return <div className="p-4">결제 승인 확인 중...</div>;
  }

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
        {orderData?.order && (
          <SuccessCard
            orderData={{
              ...orderData,
              order: orderData.order,
            }}
          />
        )}
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
