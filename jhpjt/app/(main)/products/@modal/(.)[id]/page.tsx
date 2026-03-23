import Modal from "@/app/components/modal";
import ProductDetailClient from "@/app/components/productDtail/productDetailClient";

// import backBtn from "@/public/image/backBtn.svg";
export default async function ProductModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Modal>
      <ProductDetailClient id={id} />
      {/* <Image
        src={data.product.imageUrl}
        alt={`${id}의 이미지`}
        width={450}
        height={600}
        className="mb-4"
      />
      <div className="font-bold">{data.product.name}</div>
      <div className="font-bold">₩ {data.product.price}</div>
      <div>
        <p>Size</p>
        {data.product.size.map((size: string) => (
          <button
            key={size}
            className="px-3 py-1 border rounded-md hover:bg-black hover:text-white transition"
          >
            {size}
          </button>
        ))}
      </div> */}
      {/* <Image src={backBtn} alt="뒤로가기" width={40} height={40} /> */}
    </Modal>
  );
}
