"use client";

// import { logoutAction } from "@/app/actions/logout.action";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import showToast from "@/lib/showToast";
import logout from "@/public/image/logout.svg";
import Image from "next/image";

export default function Logout() {
  const queryClient = useQueryClient(); //캐시 저장소 접근
  const router = useRouter();
  const handleLogout = async () => {
    // const result = await logoutAction();
    // if (!result?.isError) {
    //   queryClient.removeQueries({ queryKey: ["me"] });
    //   queryClient.removeQueries({ queryKey: ["cart"] });
    //   showToast({
    //     type: "success",
    //     children: "로그아웃 성공",
    //   });
    //   router.push("/products");
    // } else {
    //   showToast({
    //     type: "error",
    //     children: "로그아웃 실패",
    //   });
    // }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("로그아웃 실패");

      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["cart"] });

      showToast({
        type: "success",
        children: "로그아웃 성공",
      });

      router.push("/products");
    } catch {
      showToast({
        type: "error",
        children: "로그아웃 실패",
      });
    }
  };

  return (
    <button
      className="border border-1 rounded-xl w-[90%] mx-auto py-3 bg-white flex gap-4 justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-colors"
      onClick={handleLogout}
    >
      <Image src={logout} alt="logout" width={20} height={20} />
      로그아웃
    </button>
  );
}
