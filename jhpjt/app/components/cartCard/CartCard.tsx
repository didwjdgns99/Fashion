"use client";

import Image from "next/image";
import { useCartStore } from "@/libs/store/cartStore";
import plus from "@/public/image/plus.svg";
import minus from "@/public/image/minus.svg";
import trash from "@/public/image/trash.svg";
import EmptyCart from "../EmptyCart/EmptyCart";

export default function CartCard() {
  const items = useCartStore((state) => state.cartItems);
  const removeCart = useCartStore((state) => state.removeCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  console.log("cart page items:", items);

  if (!items || items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="flex flex-col w-full m-auto mt-10">
      {items.map((item) => (
        <div
          key={`${item.productId}-${item.size}`}
          className="flex gap-4 mb-4 border border-gray-200 rounded-xl p-4 shadow-sm"
        >
          <Image
            src={item.imageUrl || "/placeholder-image.jpg"}
            alt={item.name}
            width={100}
            height={100}
            className="rounded-md w-[80px] h-[100px] flex-shrink-0"
          />
          <div className="flex gap-4 w-full justify-between">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <p className="font-bold">{item.name}</p>
                <p className="text-[13px] text-gray-500">사이즈: {item.size}</p>
              </div>

              <div className="font-bold text-[15px]">
                {(item.price * item.quantity).toLocaleString()}원
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <button>
                <Image
                  src={trash}
                  alt="삭제버튼"
                  width={20}
                  height={20}
                  onClick={() => removeCart(item.productId, item.size)}
                />
              </button>
              <div className="flex gap-2 border border-gray-300 rounded-md px-2 py-1 shrink-0">
                <button
                  onClick={() => decreaseQuantity(item.productId, item.size)}
                  className="cursor-pointer"
                >
                  <Image
                    src={minus}
                    alt="수량 감소버튼"
                    width={16}
                    height={16}
                  />
                </button>
                <div>{item.quantity}</div>
                <button
                  onClick={() => increaseQuantity(item.productId, item.size)}
                  className="cursor-pointer"
                >
                  <Image
                    src={plus}
                    alt="수량 증가버튼"
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
