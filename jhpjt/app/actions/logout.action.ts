"use server";

import { http, ApiError } from "@/app/api/http";
import { API_ROUTES } from "@/app/utills/constants/api";
import { cookies } from "next/headers";

export const logoutAction = async () => {
  try {
    await http(API_ROUTES.LOGOUT, {
      method: "POST",
    });

    const cookieStore = await cookies();
    cookieStore.delete("token");

    return {
      isError: false,
      message: "로그아웃 되었습니다.",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message ?? "로그아웃에 실패했습니다.",
      };
    }

    return {
      isError: true,
      status: 500,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
};
