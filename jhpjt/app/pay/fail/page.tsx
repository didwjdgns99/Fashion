"use client";

import Image from "next/image";
import payfail2 from "@/public/image/payfail2.svg";
import { useRouter } from "next/navigation";
export default function FailPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/products");
  };

  return (
    <div className="flex flex-col items-center w-full gap-10 px-4">
      <Image src={payfail2} alt="결제실패 이미지" width={100} height={100} />
      <div className="flex flex-col items-center gap-3">
        <span className="font-bold text-2xl">결제실패</span>
        <span className="font-bold text-xl">다시 시도해 주세요.</span>
      </div>
      <button
        onClick={handleClick}
        className="border border-1 rounded-xl w-full mx-auto py-3 bg-white flex gap-4 justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-colors"
      >
        홈으로 이동
      </button>
    </div>
  );
}
