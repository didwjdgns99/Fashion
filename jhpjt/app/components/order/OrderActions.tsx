"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useOrderAction } from "@/libs/hooks/useOrderAction";

type OrderActionsProps = {
  orderId: string;
  deliveryStatus?: string;
  returnRequestedAt?: string | null;
  showDetails?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

function getBadgeStyle(status?: string) {
  switch (status) {
    case "상품 준비중":
      return "bg-blue-400 text-white";
    case "배송중":
      return "bg-violet-400 text-white";
    case "배송완료":
      return "bg-green-400 text-white";
    case "반품 요청":
      return "bg-orange-400 text-white";
    case "반품/취소":
      return "bg-red-400 text-white";
    default:
      return "bg-gray-300 text-black";
  }
}

export default function OrderActions({
  orderId,
  deliveryStatus,
  returnRequestedAt,
  showDetails = true,
  isOpen: controlledIsOpen,
  onOpenChange,
}: OrderActionsProps) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? localIsOpen;
  const orderActionMutation = useOrderAction();
  const action =
    deliveryStatus === "상품 준비중"
      ? "cancel"
      : deliveryStatus === "배송중" || deliveryStatus === "배송완료"
        ? "return"
        : null;
  const actionLabel = action === "cancel" ? "주문 취소" : "반품 요청";

  const setIsOpen = (nextIsOpen: boolean) => {
    setLocalIsOpen(nextIsOpen);
    onOpenChange?.(nextIsOpen);
  };

  const handleAction = () => {
    if (!action || orderActionMutation.isPending) {
      console.error("[주문 UI] 처리할 액션이 없거나 요청이 진행 중입니다.", {
        orderId,
        action,
        isPending: orderActionMutation.isPending,
      });
      return;
    }

    const confirmationMessage =
      action === "cancel"
        ? "주문을 취소하고 결제 금액을 환불받으시겠습니까?"
        : "반품 요청을 접수하시겠습니까?";

    if (!window.confirm(confirmationMessage)) {
      return;
    }

    console.info("[주문 UI] 사용자 확인 완료", { orderId, action });
    orderActionMutation.mutate(
      { orderId, action },
      {
        onSuccess: (result) => {
          if (!result.isError) {
            setIsOpen(false);
          }
        },
      },
    );
  };

  return (
    <div className="relative flex items-center gap-1">
      {deliveryStatus && (
        <span
          className={`text-[11px] font-medium px-2 py-1 rounded-xl ${getBadgeStyle(
            returnRequestedAt ? "반품 요청" : deliveryStatus,
          )}`}
        >
          {returnRequestedAt ? "반품 요청" : deliveryStatus}
        </span>
      )}
      <button
        type="button"
        aria-label="주문 메뉴 열기"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-1 hover:bg-gray-100"
      >
        <MoreHorizontal size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-1 flex min-w-36 flex-col rounded-lg border bg-white p-1 shadow-lg">
          {showDetails && (
            <Link
              href={`/mypage/orders/${encodeURIComponent(orderId)}`}
              onClick={() => setIsOpen(false)}
              className="rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
            >
              주문 상세보기
            </Link>
          )}
          {action && !returnRequestedAt && (
            <button
              type="button"
              onClick={handleAction}
              disabled={orderActionMutation.isPending}
              className="rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
            >
              {orderActionMutation.isPending ? "처리 중..." : actionLabel}
            </button>
          )}
          {action === "return" && returnRequestedAt && (
            <span className="px-3 py-2 text-sm text-gray-500">
              반품 요청 완료
            </span>
          )}
        </div>
      )}
    </div>
  );
}
