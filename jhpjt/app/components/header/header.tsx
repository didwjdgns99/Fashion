"use client";

import Image from "next/image";
import Heading from "@/public/image/Heading.png";
import Avatar from "@/app/components/Avatar/Avatar";
import { useUser } from "@/libs/hooks/useUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import basketIcon from "@/public/image/basketIcon.svg";

export default function Header() {
  const { data } = useUser();
  const pathname = usePathname();
  const user = data?.user;

  const hidePathname = ["/login", "/signup"];
  if (hidePathname.includes(pathname)) {
    return null;
  }

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
        {user ? (
          <button>
            <Avatar
              src={user.profileImage}
              name={user.nickName}
              size="sm"
              className="font-bold text-white cursor-pointer"
            />
          </button>
        ) : (
          <Link href="/login" className="text-sm font-semibold cursor-pointer">
            로그인
          </Link>
        )}

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
