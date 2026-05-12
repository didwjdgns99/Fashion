import Image from "next/image";
// import { OrderState } from "./orderState";

type orderBadge = "상품 준비중" | "배송중" | "배송완료" | "주문취소";

type RecentOrderProps = {
  orderBadge?: orderBadge;
  orderDate?: string;
  orderCode?: string;
  imageList?: string[] | undefined;
  totalPrice?: string;
  orderQuantity?: number;
};

const stateStyleMap: Record<orderBadge, string> = {
  "상품 준비중": "bg-blue-400 text-white",
  배송중: "bg-violet-400 text-white",
  배송완료: "bg-green-400 text-white",
  주문취소: "bg-red-400 text-white",
};

export default function RecentOrder({
  orderBadge = "배송중",
  orderDate = "2026.05.06",
  orderCode = "123456789",
  imageList = [],
  totalPrice = "10000",
  orderQuantity = 1,
}: RecentOrderProps) {
  const badgeStyle = stateStyleMap[orderBadge];

  return (
    <>
      <div className="border p-3 rounded-xl">
        <div className="flex justify-between items-start ">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-gray-500">{orderDate}</span>
            <span className="text-[15px] font-medium">
              주문번호: {orderCode}
            </span>
          </div>
          <span
            className={`text-[14px] font-medium px-2 py-1 rounded-xl ${badgeStyle}`}
          >
            {orderBadge}
          </span>
        </div>
        <div>
          {imageList.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`상품 이미지${index + 1}`}
              width={64}
              height={64}
            />
          ))}
        </div>
        <div className="flex justify-between border-t-1  py-4">
          <span className="text-[15px] text-gray-500">
            총 {orderQuantity}개 상품
          </span>
          <span className=" font-semibold">
            {totalPrice.toLocaleString()} 원
          </span>
        </div>
      </div>
    </>
  );
}
