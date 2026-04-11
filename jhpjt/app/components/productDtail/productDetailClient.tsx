"use client";

import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import useGetProductDetail from "@/libs/hooks/useProductDtail";
import Header from "@/app/components/header/header";
import Buy from "@/app/components/Buy/buy";
import BotSheet from "../bottomSheet/BotSheet";
import { useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export default function ProductDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { data, isPending, isError } = useGetProductDetail(id);

  const [open, setOpen] = React.useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      window.setTimeout(() => {
        router.back();
      }, 0);
    }
  };

  return (
    <Drawer direction="left" open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="p-0 data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:max-w-none ">
        <div className="relative h-full overflow-y-auto pb-24">
          <DrawerHeader className="p-0">
            <DrawerTitle>
              <Header />
            </DrawerTitle>
          </DrawerHeader>

          <div className="p-4 pt-2">
            {isPending && <div>로딩중...</div>}
            {isError && <div>에러 발생</div>}

            {data && (
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={data.product.imageUrl}
                  alt={`${id}의 이미지`}
                  width={500}
                  height={700}
                  className="h-150 w-full rounded-md object-cover"
                  priority
                />
                <div className="flex flex-col gap-2">
                  <div className="pb-2 font-bold text-xl">
                    {data?.product?.name ?? "상품 상세"}
                  </div>
                  <div className="font-bold text-xl">
                    {data.product.price.toLocaleString()} 원
                  </div>
                  <div> {data.product.description}</div>
                </div>
              </div>
            )}
          </div>
          <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t">
            <Buy onClick={() => setIsOpen(true)} />
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/60 z-40"
                onClick={() => setIsOpen(false)}
              ></div>
            )}
            {isOpen && data?.product && (
              <BotSheet
                product={data?.product}
                onClose={() => setIsOpen(false)}
              />
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
