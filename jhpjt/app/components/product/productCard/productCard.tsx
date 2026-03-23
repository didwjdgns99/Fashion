import { ProductCardProps } from "@/libs/types/products";
import Link from "next/link";
import ProductCardImage from "../allProducts/productCardImage";

export default function ProductCard({
  id,
  name,
  description,
  price,
  category,
  meta,
  imageUrl,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} scroll={false}>
      <div
        id={id}
        data-category={category}
        className="rounded-2xl flex flex-col gap-1"
      >
        {/* aspect-[4/5] 가로4 :세로5 비율설정 */}
        {/* 이미지 비율을 맞추기 위해 fill사용 시 높이 필요 */}
        <div className="relative w-full aspect-4/5 overflow-hidden rounded-2xl">
          {/* <Image
            src={imageUrl}
            alt={`${name} 이미지`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         25vw"
            priority
          /> */}
          <ProductCardImage src={imageUrl} alt={`${name} 이미지`} />
        </div>
        <p className="font-bold text-black text-[16px] mb-2">{name}</p>
        <p className="text-[12px] text-gray-500 truncate">{description}</p>
        <p className="text-[14px]  font-bold">{price.toLocaleString()} 원</p>
        <div className="text-[12px] font-bold">
          ❤ {meta?.heart} / review {meta?.review}
        </div>
      </div>
    </Link>
  );
}
