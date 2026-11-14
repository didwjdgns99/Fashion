"use client";

import Dropdown from "@/app/components/dropdown/Dropdown";
import { ProductCardProps } from "@/./libs/types/products";
import { useState } from "react";
import { useCartStore, useDemoCartStore } from "@/libs/store/cartStore";
import { useRouter } from "next/navigation";
import showToast from "@/lib/showToast";
import { addCartAction } from "@/app/actions/addCart.action";
import { useUser } from "@/libs/hooks/useUser";

interface BotSheetProps {
  onClose: () => void;
  product?: ProductCardProps;
}

export default function BotSheet({ product, onClose }: BotSheetProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter();
  const { data: userData } = useUser();
  const isDemo = Boolean(userData?.user?.isDemo);

  const addItemToCart = async (requestItem: {
    productId: string;
    size: string;
    quantity: number;
  }): Promise<boolean> => {
    if (isDemo) {
      useDemoCartStore.getState().addCart({
        productId: {
          _id: requestItem.productId,
          name: product?.name ?? "",
          price: product?.price ?? 0,
          imageUrl: product?.imageUrl ?? "",
        },
        size: requestItem.size,
        quantity: requestItem.quantity,
      });
      return true;
    }

    const result = await addCartAction(requestItem);
    if (result.isError) {
      showToast({ type: "error", children: result.message });
      return false;
    }
    useCartStore.getState().setCartItems(result.cart.items);
    return true;
  };

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

    const added = await addItemToCart(requestItem);
    if (!added) return;

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

    const added = await addItemToCart(requestItem);
    if (!added) return;

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
