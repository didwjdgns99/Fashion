import Image from "next/image";
import Heading from "@/public/image/Heading.png";
import userRegular from "@/public/image/userRegular.png";
import cartShopping from "@/public/image/cartShopping.png";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-4 py-2 w-full h-[50px]">
      <Image
        src={Heading}
        alt="헤더 이미지"
        width={100}
        height={34}
        className="h-[30px]"
      />
      <div className="flex gap-1">
        {/* <Image src={userRegular} alt="마이페이지" className="w-6 h-6" /> 
        <Image src={cartShopping} alt="장바구니" className="w-6 h-6" /> */}
      </div>
    </div>
  );
}
