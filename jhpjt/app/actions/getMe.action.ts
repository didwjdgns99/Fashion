"use server";
import { http, ApiError } from "@/app/api/http";

export const getMeAction = async () => {
  try {
    return await http(
      "/api/me",
      {
        method: "GET",
      },
      { authRequired: true },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message ?? "유저 정보를 가져오는데 실패했습니다.",
      };
    }
  }
};
