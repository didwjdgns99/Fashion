import Image from "next/image";
import banner from "@/public/image/banner_img.webp";

export default function Banner() {
  return (
    <div className="relative">
      <Image
        src={banner}
        alt="메인배너 이미지"
        className="object-cover w-full h-55"
      />
      <span className="absolute bottom-4 left-10 text-white font-bold text-lg">
        지금 Fashion은
        <br /> 무료배송
      </span>
    </div>
  );
}
