import bucket from "@/public/image/bucket.svg";
import Image from "next/image";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-2 max-w-[450px] m-auto text-center">
      <Image
        src={bucket}
        alt="빈 장바구니"
        width={80}
        height={80}
        className="mb-10"
      />
      <p className="font-bold">장바구니가 비어있습니다.</p>
      <p className="text-gray-500">마음에 드는 상품을 담아보세요.</p>
      <Link href="/products">
        <button className="mt-2 bg-black rounded-lg text-white px-6 py-3 mt-4 cursor-pointer">
          쇼핑 계속하기
        </button>
      </Link>
    </div>
  );
}
