"use server";

import { http, ApiError } from "@/app/api/http";

type SignupPayload = {
  email: string;
  password: string;
  nickName: string;
};

export const postAuthAction = async ({
  email,
  password,
  nickName,
}: SignupPayload) => {
  try {
    const data = await http("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        nickName,
      }),
    });

    return {
      isError: false,
      message: data.message ?? "회원가입이 완료되었습니다.",
      data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message ?? "회원가입에 실패했습니다.",
      };
    }

    return {
      isError: true,
      status: 500,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }

  // if (!res.ok) {
  //   const error = await res.json();
  //   throw new Error(error.message ?? "회원가입 실패");
  // }

  // const data = await res;
  // return data;
};
