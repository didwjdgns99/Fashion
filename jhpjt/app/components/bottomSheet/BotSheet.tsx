"use client";

import Dropdown from "@/app/components/dropdown/Dropdown";
import { ProductCardProps } from "@/./libs/types/products";
import { useState } from "react";
import { useCartStore } from "@/libs/store/cartStore";
import { useRouter } from "next/navigation";
import showToast from "@/lib/showToast";
import { addCartAction } from "@/app/actions/addCart.action";

interface BotSheetProps {
  onClose: () => void;
  product?: ProductCardProps;
}

export default function BotSheet({ product, onClose }: BotSheetProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter();
  const handleAddCart = async () => {
    if (!product) return;

    if (!selectedSize) {
      showToast({
        type: "error",
        children: "사이즈를 선택해주세요.",
      });
      return;
    }

    const requestItem = {
      productId: product.id,
      size: selectedSize,
      quantity: 1,
    };

    const result = await addCartAction(requestItem);

    // 서버가 populate해서 돌려준 최신 cart를 store에 반영
    useCartStore.getState().setCartItems(result.cart.items);

    showToast({
      type: "success",
      children: "장바구니에 추가됐습니다.",
    });

    onClose();
  };
  const handleBuyProduct = async () => {
    if (!product) return;

    if (!selectedSize) {
      showToast({
        type: "error",
        children: "사이즈를 선택해주세요.",
      });
      return;
    }

    const requestItem = {
      productId: product.id,
      size: selectedSize,
      quantity: 1,
    };

    const result = await addCartAction(requestItem);

    useCartStore.getState().setCartItems(result.cart.items);

    onClose();
    router.push("/cart");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 h-75 w-full rounded-md bg-white p-4 ">
      <div className="mb-2 h-1 w-10 rounded-full bg-gray-300 mx-auto"></div>
      <div className="border text-center">
        <Dropdown
          trigger={
            <button className="w-full">{selectedSize || "사이즈 선택"}</button>
          }
          items={
            product?.size?.map((size) => ({
              label: size,
              onClick: () => setSelectedSize(size),
            })) || []
          }
        />
      </div>
      <button
        onClick={handleBuyProduct}
        className="mt-3 w-full bg-black text-white py-3 rounded-xl cursor-pointer"
      >
        구매하기
      </button>
      <button
        onClick={handleAddCart}
        className="mt-3 w-full bg-black text-white py-3 rounded-xl cursor-pointer"
      >
        장바구니 담기
      </button>
    </div>
  );
}
