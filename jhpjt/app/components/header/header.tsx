import Image from "next/image";
import Heading from "@/public/image/Heading.png";
import Avatar from "@/app/components/Avatar/Avatar";
// import basketIcon from "@/public/image/basketIcon.svg";

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
      <div className="flex gap-4">
        <button>
          <Avatar size="sm" className="font-bold text-white cursor-pointer" />
        </button>
        {/* <button className="relative w-7 h-7 cursor-pointer">
          <Image
            src={basketIcon}
            alt="장바구니"
            fill
            className="object-contain brightness-0"
          />
        </button> */}
      </div>
    </div>
  );
}
