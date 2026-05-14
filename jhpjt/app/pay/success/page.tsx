import { Suspense } from "react";
import SuccessClient from "@/app/pay/success/successClient";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-4">결제 정보 확인 중...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
