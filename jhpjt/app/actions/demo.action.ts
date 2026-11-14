"use server";

import { cookies } from "next/headers";
import { getMeAction } from "@/app/actions/getMe.action";

export async function enterDemoAction() {
  const cookieStore = await cookies();
  cookieStore.set("demo-mode", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function exitDemoAction() {
  const cookieStore = await cookies();
  cookieStore.delete("demo-mode");
  return getMeAction();
}
