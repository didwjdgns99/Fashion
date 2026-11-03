"use client";

import Script from "next/script";
import { useRef, useState, type FormEvent } from "react";
import { useCartStore } from "@/libs/store/cartStore";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { createOrderAction } from "@/app/actions/order.action";
import showToast from "@/lib/showToast";
import type { ShippingAddress } from "@/app/api/orderApi";

type DaumAddress = {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
};

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: DaumAddress) => void;
      }) => {
        open: () => void;
      };
    };
  }
}

export default function CartBotSheet() {
  const items = useCartStore((state) => state.cartItems);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [isAddressSearchReady, setIsAddressSearchReady] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const detailAddressRef = useRef<HTMLInputElement>(null);

  if (items.length === 0) return null;

  const productTotal = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const handleAddressSearch = () => {
    if (!isAddressSearchReady || !window.daum?.Postcode) {
      showToast({
        type: "error",
        children: "주소 검색을 불러오는 중입니다. 잠시 후 다시 시도해 주세요.",
      });
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        setPostalCode(data.zonecode);
        setAddress(data.roadAddress || data.jibunAddress);
        setDetailAddress("");
        detailAddressRef.current?.focus();
      },
    }).open();
  };

  const handlePayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPaymentPending) return;

    const shippingAddress: ShippingAddress = {
      recipientName: recipientName.trim(),
      recipientPhone: recipientPhone.trim(),
      postalCode,
      address,
      detailAddress: detailAddress.trim(),
      deliveryRequest: deliveryRequest.trim(),
    };

    if (
      !shippingAddress.recipientName ||
      !shippingAddress.recipientPhone ||
      !shippingAddress.postalCode ||
      !shippingAddress.address ||
      !shippingAddress.detailAddress
    ) {
      showToast({
        type: "error",
        children: "받는 사람, 연락처, 주소와 상세 주소를 입력해 주세요.",
      });
      return;
    }

    setIsPaymentPending(true);
    try {
      const result = await createOrderAction({ shippingAddress });

      if (result.isError) {
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
        showToast({
          type: "error",
          children: "결제에 필요한 주문 정보가 없습니다.",
        });
        return;
      }

      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!,
      );

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
    } finally {
      setIsPaymentPending(false);
    }
  };

  return (
    <>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
        onReady={() => setIsAddressSearchReady(true)}
        onError={() => {
          showToast({
            type: "error",
            children: "주소 검색 스크립트를 불러오지 못했습니다.",
          });
        }}
      />
      <form
        id="cart-checkout-form"
        onSubmit={handlePayment}
        className="mx-auto flex w-full max-w-2xl flex-col gap-4 py-8"
      >
        <h2 className="text-lg font-bold">배송 정보</h2>
        <label className="flex flex-col gap-1 text-sm font-medium">
          받는 사람
          <input
            required
            maxLength={50}
            autoComplete="name"
            value={recipientName}
            onChange={(event) => setRecipientName(event.target.value)}
            className="rounded-lg border px-3 py-2"
            placeholder="받는 사람 이름"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          연락처
          <input
            required
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{9,11}"
            maxLength={11}
            autoComplete="tel"
            value={recipientPhone}
            onChange={(event) =>
              setRecipientPhone(event.target.value.replace(/\D/g, ""))
            }
            className="rounded-lg border px-3 py-2"
            placeholder="숫자만 입력 (예: 01012345678)"
          />
        </label>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">주소</span>
          <div className="flex gap-2">
            <input
              readOnly
              required
              value={postalCode}
              aria-label="우편번호"
              className="w-32 rounded-lg border bg-gray-50 px-3 py-2"
              placeholder="우편번호"
            />
            <button
              type="button"
              onClick={handleAddressSearch}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              주소 검색
            </button>
          </div>
          <input
            readOnly
            required
            value={address}
            aria-label="도로명 또는 지번 주소"
            className="rounded-lg border bg-gray-50 px-3 py-2"
            placeholder="주소 검색으로 입력해 주세요"
          />
          <input
            ref={detailAddressRef}
            required
            maxLength={100}
            autoComplete="address-line2"
            value={detailAddress}
            onChange={(event) => setDetailAddress(event.target.value)}
            className="rounded-lg border px-3 py-2"
            placeholder="상세 주소를 입력해 주세요 (동/호수 등)"
          />
        </div>
        <label className="flex flex-col gap-1 text-sm font-medium">
          배송 요청사항 <span className="font-normal text-gray-500">선택</span>
          <textarea
            maxLength={100}
            value={deliveryRequest}
            onChange={(event) => setDeliveryRequest(event.target.value)}
            className="resize-y rounded-lg border px-3 py-2"
            placeholder="배송 시 요청사항이 있으면 입력해 주세요"
            rows={2}
          />
        </label>
      </form>
      <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-center bg-white px-4 pb-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="w-full max-w-2xl px-2 py-3">
          <div className="flex justify-between text-sm">
            <p>상품금액</p>
            <p>{productTotal.toLocaleString()} 원</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>배송비</p>
            <p>무료</p>
          </div>
          <div className="flex justify-between pt-2 font-bold">
            <p>총 결제금액</p>
            <p>{productTotal.toLocaleString()} 원</p>
          </div>
        </div>
        <button
          type="submit"
          form="cart-checkout-form"
          disabled={isPaymentPending}
          className="w-full max-w-2xl rounded-xl bg-black py-3 text-white disabled:opacity-50"
        >
          {isPaymentPending ? "결제 준비 중..." : "결제하기"}
        </button>
      </div>
    </>
  );
}
