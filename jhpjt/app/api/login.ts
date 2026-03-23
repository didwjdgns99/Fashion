import { http } from "@/app/api/http";

export type LoginRequest = {
  email: string;
  password: string;
};

export function login(payload: LoginRequest) {
  return http("/api/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(payload),
  });
}

// export const login = async (payload: LoginRequest) => {
//   const res = await http.post<LoginResponse>("/login", payload);
//   return res.data;
// };
