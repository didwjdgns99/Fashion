import { http } from "@/app/api/http";
import { API_ROUTES } from "@/app/utills/constants/api";

export type SignupRequest = {
  email: string;
  password: string;
};

export function signup(payload: SignupRequest) {
  return http(API_ROUTES.AUTH, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// export const signup = async (payload: SignupRequest) => {
//   const res = await http.post<SignupResponse>("/signup", payload);
//   return res.data;
// };
