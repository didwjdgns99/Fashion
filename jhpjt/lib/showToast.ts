"use client";

import { ReactNode } from "react";
import { toast } from "sonner";

type ToastType = "default" | "success" | "error";

interface ShowToast {
  type?: ToastType;
  children: ReactNode;
}

export default function showToast({ type = "default", children }: ShowToast) {
  switch (type) {
    case "success":
      toast.success(children);
      break;
    case "error":
      toast.error(children);
      break;
    default:
      toast(children);
  }
}
