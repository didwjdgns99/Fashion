// "use server";
// import { API_BASE_URL } from "../utills/api";
// import { http } from "@/app/api/http";

// type LoginPayload = {
//   email: string;
//   password: string;
// };

// export const postLoginAction = async ({ email, password }: LoginPayload) => {
//   const res = await http("/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message ?? "로그인 실패");
//   }

//   const data = await res.json();
//   return data;
// };
"use server";
import { http } from "@/app/api/http";

type LoginPayload = {
  email: string;
  password: string;
};

export const postLoginAction = async ({ email, password }: LoginPayload) => {
  try {
    return await http("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        isError: true,
        message: error.message,
      };
    }
    return {
      isError: true,
      message: "로그인 실패",
    };
  }
};
