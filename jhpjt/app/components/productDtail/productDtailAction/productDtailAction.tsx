"use client";
import useGetProductDtail from "@/libs/hooks/useProductDtail";
import { useState } from "react";

export default function ProductDtailAction({ id }: { id: string }) {
  const { data } = useGetProductDtail(id);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div>
      <p>Size</p>
      {data?.product.size.map((size: string) => (
        <button
          type="button" // ✅ 중요: submit 방지
          key={size}
          onClick={() => handleSizeClick(size)}
          className={`px-4 py-2 border rounded-md transition
  ${
    selectedSize === size
      ? "bg-black text-white"
      : "bg-white text-black hover:bg-black hover:text-white"
  }
`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
