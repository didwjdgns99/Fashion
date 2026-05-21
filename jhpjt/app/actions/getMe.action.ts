// "use server";
// import { http, ApiError } from "@/app/api/http";
import { API_BASE_URL } from "@/app/utills/api";
// export const getMeAction = async () => {
//   try {
//     return await http(
//       "/api/me",
//       {
//         method: "GET",
//       },
//       { authRequired: true },
//     );
//   } catch (error) {
//     if (error instanceof ApiError) {
//       return {
//         isError: true,
//         status: error.status,
//         message: error.message ?? "유저 정보를 가져오는데 실패했습니다.",
//       };
//     }
//   }
// };

export const getMeAction = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/me`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        isError: true,
        status: res.status,
        message: data.message ?? "유저 정보를 가져오는데 실패했습니다.",
      };
    }

    return data;
  } catch (error) {
    return {
      isError: true,
      status: 500,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
};
