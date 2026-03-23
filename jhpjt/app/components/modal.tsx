"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import useBodyScrollLock from "@/libs/hooks/useScrollLock";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  useBodyScrollLock(true);

  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full h-full bg-white  shadow-xl flex flex-col items-center"
      >
        {children}
      </div>
    </div>
  );
}
