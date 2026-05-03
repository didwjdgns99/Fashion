"use server";

import { http, ApiError } from "@/app/api/http";
import { API_ROUTES } from "@/app/utills/constants/api";

export async function patchMyImageAction(formData: FormData) {
  try {
    return await http(
      API_ROUTES.ME,
      {
        method: "PATCH",
        body: formData,
        cache: "no-store",
      },
      {
        authRequired: true,
      },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message ?? "프로필 이미지 업데이트에 실패했습니다.",
      };
    }

    return {
      isError: true,
      status: 500,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}

export async function deleteMyImageAction() {
  try {
    return await http(
      API_ROUTES.ME,
      {
        method: "DELETE",
        cache: "no-store",
      },
      {
        authRequired: true,
      },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message ?? "프로필 이미지 삭제에 실패했습니다.",
      };
    }

    return {
      isError: true,
      status: 500,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
