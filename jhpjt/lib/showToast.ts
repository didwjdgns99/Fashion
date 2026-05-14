"use client";

import { ReactNode } from "react";
import { toast } from "sonner";

type ToastType = "default" | "success" | "error";

interface ShowToast {
  type?: ToastType;
  children: ReactNode;
  duration?: number;
}

export default function showToast({
  type = "default",
  children,
  duration = 1500,
}: ShowToast) {
  switch (type) {
    case "success":
      toast.success(children, { duration });
      break;
    case "error":
      toast.error(children, { duration });
      break;
    default:
      toast(children, { duration });
  }
}
