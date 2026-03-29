// "use client";

// import ProductCard from "../productCard/productCard";
// import { useGetProductsInfinite } from "@/libs/hooks/useProducts";
// import { useInView } from "react-intersection-observer";
// import { useEffect, useRef } from "react";

// export default function AllProducts() {
//   const {
//     data,
//     isPending,
//     isError,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useGetProductsInfinite();

//   const { ref, inView } = useInView({
//     threshold: 0,
//   });
//   const products = data?.pages.flatMap((page) => page.products) ?? [];

//   // ✅ 같은 pages 길이에서 중복 fetch 방지
//   const lastFetchedPagesLenRef = useRef(0);

//   useEffect(() => {
//     const pagesLen = data?.pages?.length ?? 0;

//     if (!inView) return;
//     if (!hasNextPage) return;
//     if (isFetchingNextPage) return;

//     if (lastFetchedPagesLenRef.current === pagesLen) return;
//     lastFetchedPagesLenRef.current = pagesLen;

//     fetchNextPage();
//   }, [
//     inView,
//     hasNextPage,
//     isFetchingNextPage,
//     fetchNextPage,
//     data?.pages?.length,
//   ]);

//   if (isPending) return <p>로딩중...</p>;
//   if (isError) return <p>에러: {(error as Error).message}</p>;

//   return (
//     <>
//       <div className="grid grid-cols-2 gap-4">
//         {products.map((product) => (
//           <ProductCard key={product.id} {...product} />
//         ))}
//       </div>

//       <div ref={ref} className="h-20 flex items-center justify-center">
//         {isFetchingNextPage && (
//           <div className="animate-spin w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
//         )}
//       </div>
//     </>wwwwwwwwwwwwwwwwwww
//   );
// }

"use client";

import ProductCard from "../productCard/productCard";
import { useGetProductsInfinite } from "@/libs/hooks/useProducts"; //data/pages/fetchNextPage, hasNextPage 같은 걸 제공
import { useEffect, useRef, useMemo } from "react";

type AllProductsProps = {
  keyword: string;
  category: string;
};

export default function AllProducts({ keyword, category }: AllProductsProps) {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProductsInfinite(keyword, category);

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.products ?? []) ?? [],
    [data],
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false); //돔 접근x 렌더링 없이 유지되는 상태

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return; //돔 연결 전이면 리턴

    // IntersectionObserver 생성
    // entries: 관찰 중인 요소들이 화면에 들어왔는지 결과가 배열로 들어옴
    const observer = new IntersectionObserver(
      //entries 감시대상이 가지고 있는 객체들의 배열 - 정보
      //감시 대상이 하나여서 const entry = entries[0];만 필요
      async (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        if (!hasNextPage) return;
        if (isFetchingNextPage) return;
        if (lockRef.current) return;

        lockRef.current = true;
        try {
          await fetchNextPage();
        } finally {
          lockRef.current = false; //fetch 끝나면 락 해제
        }
      },
      {
        root: null, // viewport 기준
        threshold: 1,
        rootMargin: "0px",
      },
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isPending) return <p>로딩중...</p>;
  if (isError) return <p>에러: {(error as Error).message}</p>;
  if (!isPending && products.length === 0 && keyword) {
    return <p>"{keyword}" 에 대한 검색결과가 없습니다.</p>;
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="animate-spin w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
        )}
      </div>
    </>
  );
}
