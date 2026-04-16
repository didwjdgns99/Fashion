"use client";

import Dropdown from "@/app/components/dropdown/Dropdown";
import { ProductCardProps } from "@/./libs/types/products";
import { useState } from "react";
import { useCartStore } from "@/libs/store/cartStore";
import { useRouter } from "next/navigation";

interface BotSheetProps {
  onClose: () => void;
  product?: ProductCardProps;
}

export default function BotSheet({ product, onClose }: BotSheetProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addCart = useCartStore((state) => state.addCart);
  const router = useRouter();
  const handleAddCart = () => {
    if (!product) return;
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      imageUrl: product.imageUrl,
      quantity: 1,
    };

    console.log("장바구니에 담을 값:", cartItem);

    addCart(cartItem);
    onClose();
  };

  const handleBuyProduct = () => {
    if (!product) return;
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      imageUrl: product.imageUrl,
      quantity: 1,
    };

    addCart(cartItem);
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
        className="mt-3 w-full bg-black text-white py-3 rounded-xl pointer-cursor"
      >
        구매하기
      </button>
      <button
        onClick={handleAddCart}
        className="mt-3 w-full bg-black text-white py-3 rounded-xl pointer-cursor"
      >
        장바구니 담기
      </button>
    </div>
  );
}
