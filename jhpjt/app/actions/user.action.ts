"use server";

import { API_BASE_URL } from "../utills/api";

export const getUsersAction = async () => {
  const res = await fetch(`${API_BASE_URL}/api/users`);
  const data = await res.json();
  const users = data.user;
  console.log(users);
  return users;
};
