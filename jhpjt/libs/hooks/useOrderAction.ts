"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderAction } from "@/app/actions/order.action";
import showToast from "@/lib/showToast";

export type OrderActionInput = {
  orderId: string;
  action: "cancel" | "return";
};

export function useOrderAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderActionInput) => {
      console.info("[주문 mutation] 요청 시작", data);
      return updateOrderAction(data);
    },
    onSuccess: (result) => {
      console.info("[주문 mutation] Server Action 결과", result);
      if (result.isError) {
        showToast({ type: "error", children: result.message });
        return;
      }

      showToast({ type: "success", children: result.message });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("[주문 mutation] 예외 발생", error);
      showToast({
        type: "error",
        children: `주문 처리 중 클라이언트 오류: ${error.message}`,
      });
    },
  });
}
