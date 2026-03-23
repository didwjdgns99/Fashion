"use server";

import { http } from "@/app/api/http";

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

    console.log("회원가입 성공:", data);
    return data;
  } catch (error) {
    console.error("postAuthAction 에러:", error);
    throw error;
  }

  // if (!res.ok) {
  //   const error = await res.json();
  //   throw new Error(error.message ?? "회원가입 실패");
  // }

  // const data = await res;
  // return data;
};
