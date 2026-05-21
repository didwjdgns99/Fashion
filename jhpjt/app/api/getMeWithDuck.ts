export async function getMeWithDuck() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
}
