"use client";

import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import useGetProductDetail from "@/libs/hooks/useProductDtail";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

export default function ProductDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { data, isPending, isError } = useGetProductDetail(id);

  const [open, setOpen] = React.useState(true);

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
      <DrawerContent className="p-0 data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:max-w-none overflow-y-auto">
        <div className="ml-auto w-full ">
          <DrawerHeader className="p-4 pb-2">
            <DrawerTitle className="font-semibold">
              {data?.product?.name ?? "상품 상세"}
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
                  className="h-auto w-full rounded-md object-cover"
                  priority
                />
                <div className="flex flex-col gap-2">
                  <div> {data.product.description}</div>
                  <div className="font-bold">₩ {data.product.price}</div>

                  <div className="w-full">
                    <p className="mb-3 font-medium">Size</p>
                    <div className="flex flex-wrap gap-2">
                      {data.product.size.map((size: string) => (
                        <button
                          key={size}
                          type="button"
                          className="px-3 py-1 border rounded-md hover:bg-black hover:text-white transition"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DrawerFooter className="p-4 pt-2">
            <DrawerClose asChild>
              <button>닫기</button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
