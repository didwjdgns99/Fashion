"use client";

import Image from "next/image";
import { useCartStore } from "@/libs/store/cartStore";
import plus from "@/public/image/plus.svg";
import minus from "@/public/image/minus.svg";
import trash from "@/public/image/trash.svg";
import EmptyCart from "../EmptyCart/EmptyCart";
import { PatchCartAction } from "@/app/actions/patchCart.action";
import type { CartItem } from "@/libs/store/cartStore";
import { useEffect, useRef } from "react";
import { getCartAction } from "@/app/actions/getCart.action";
import { deleteCartAction } from "@/app/actions/deleteCart.action";
import { useDebounceCallback } from "@/libs/hooks/useDebounceCallback";

export default function CartCard() {
  const items = useCartStore((state) => state.cartItems);
  const removeCart = useCartStore((state) => state.removeCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setItemQuantity = useCartStore((state) => state.setItemQuantity);

  const rollbackRef = useRef<Record<string, number>>({});

  const quantityDebounce = useDebounceCallback(500);
  useEffect(() => {
    async function fetchCart() {
      try {
        const result = await getCartAction();
        setCartItems(result.cart.items);
      } catch (error) {
        console.error("장바구니 조회 실패:", error);
      }
    }

    fetchCart();
  }, [setCartItems]);

  const handleIncrease = async (item: CartItem) => {
    const key = `${item.productId._id}-${item.size}`;

    // 처음 클릭했을 때만 원래 수량 저장
    if (rollbackRef.current[key] === undefined) {
      rollbackRef.current[key] = item.quantity;
    }

    const next = item.quantity + 1;
    increaseQuantity(item.productId._id, item.size);
    quantityDebounce(async () => {
      try {
        await PatchCartAction({
          productId: item.productId._id,
          size: item.size,
          quantity: next,
        });

        delete rollbackRef.current[key];
      } catch (error) {
        console.error(error);
        setItemQuantity(
          item.productId._id,
          item.size,
          rollbackRef.current[key],
        );

        delete rollbackRef.current[key];
      }
    });
  };

  const handleDecrease = async (item: CartItem) => {
    const key = `${item.productId._id}-${item.size}`;
    if (rollbackRef.current[key] === undefined) {
      rollbackRef.current[key] = item.quantity;
    }
    const next = item.quantity - 1;

    if (item.quantity <= 1) return;

    decreaseQuantity(item.productId._id, item.size);
    quantityDebounce(async () => {
      try {
        await PatchCartAction({
          productId: item.productId._id,
          size: item.size,
          quantity: next,
        });
      } catch (error) {
        console.error(error);
        setItemQuantity(
          item.productId._id,
          item.size,
          rollbackRef.current[key],
        );
        delete rollbackRef.current[key];
      }
    });
  };

  const handleDelete = async (item: CartItem) => {
    try {
      await deleteCartAction({
        productId: item.productId._id,
        size: item.size,
      });

      removeCart(item.productId._id, item.size);
    } catch (error) {
      console.error("장바구니 삭제 실패:", error);
    }
  };

  if (!items || items.length === 0) {
    return <EmptyCart />;
  }
  console.log(items);
  return (
    <div className="flex flex-col w-full m-auto mt-10">
      {items.map((item) => {
        const product = item.productId;
        return (
          <div
            key={`${product._id}-${item.size}`}
            className="flex gap-4 mb-4 border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <Image
              src={product.imageUrl || "/placeholder-image.jpg"}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-md w-[80px] h-[100px] flex-shrink-0"
            />
            <div className="flex gap-4 w-full justify-between">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-bold">{product.name}</p>
                  <p className="text-[13px] text-gray-500">
                    사이즈: {item.size}
                  </p>
                </div>

                <div className="font-bold text-[15px]">
                  {(product.price * item.quantity).toLocaleString()}원
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <button>
                  <Image
                    src={trash}
                    alt="삭제버튼"
                    width={20}
                    height={20}
                    onClick={() => handleDelete(item)}
                  />
                </button>
                <div className="flex gap-2 border border-gray-300 rounded-md px-2 py-1 shrink-0">
                  <button
                    onClick={() => handleDecrease(item)}
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
                    onClick={() => handleIncrease(item)}
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
        );
      })}
    </div>
  );
}
