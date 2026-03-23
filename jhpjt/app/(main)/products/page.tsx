import AllProducts from "@/app/components/product/allProducts/allProducts";
import {
  QueryClient, //캐시 저장 저장소
  dehydrate, //서버에서 준 데이터를 JSON형태로 바꿔서 보내기 위해
  HydrationBoundary, //로 감싸야 JSON로 바꾼 캐시를 사용가능하다.
} from "@tanstack/react-query";
import { getProducts } from "@/libs/services/products";
import Search from "@/app/components/search/search";
import ScrollFix from "@/libs/hooks/useScrollFix";

//next에서 params값을 page에 프롭스로 넘겨주기위해
type ProductsPageProps = {
  searchParams: Promise<{
    keyword?: string;
    category?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const queryClient = new QueryClient(); //캐시 저장소 생성

  const params = await searchParams; //위에서 Promise 해서 await
  const keyword = params.keyword ?? "";
  const category = params.category ?? "";
  // 서버에서 첫 페이지(6개) 프리패치
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products", "infinite", keyword, category],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      getProducts({ cursor: pageParam, keyword, category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="sticky top-0 z-10 bg-white  flex w-full ">
        <Search defaultValue={keyword} category={category} />
      </div>
      <ScrollFix />
      <div className="px-4 py-6 flex flex-col gap-4">
        <h3 className="font-bold">전체 상품</h3>
        <AllProducts keyword={keyword} category={category} />
      </div>
    </HydrationBoundary>
  );
}
