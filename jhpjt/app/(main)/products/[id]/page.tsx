import ProductDetailClient from "@/app/components/productDtail/productDetailClient";

// import backBtn from "@/public/image/backBtn.svg";
export default async function ProductModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductDetailClient id={id} />;
}
