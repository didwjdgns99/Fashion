import { http } from "@/app/api/http";

export type SignupRequest = {
  email: string;
  password: string;
};

export function signup(payload: SignupRequest) {
  return http("/api/auth", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// export const signup = async (payload: SignupRequest) => {
//   const res = await http.post<SignupResponse>("/signup", payload);
//   return res.data;
// };
