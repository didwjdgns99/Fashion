"use client";

import Image from "next/image";
import Heading from "@/public/image/Heading.png";
import Avatar from "@/app/components/Avatar/Avatar";
import { useUser } from "@/libs/hooks/useUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { enterDemoAction, exitDemoAction } from "@/app/actions/demo.action";
import showToast from "@/lib/showToast";
import { useState } from "react";
// import basketIcon from "@/public/image/basketIcon.svg";

export default function Header() {
  const { data } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDemoTransitioning, setIsDemoTransitioning] = useState(false);
  const user = data?.user;

  const hidePathname = ["/login", "/signup"];
  if (hidePathname.includes(pathname)) {
    return null;
  }

  const imageSrc = user?.profileImage
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profileImage}`
    : null;

  const handleEnterDemo = async () => {
    setIsDemoTransitioning(true);
    try {
      await enterDemoAction();
      queryClient.setQueryData(["me"], {
        user: {
          id: "demo-user",
          _id: "demo-user",
          email: "demo@example.com",
          nickName: "데모 사용자",
          profileImage: null,
          isDemo: true,
        },
      });
      router.replace("/products");
      router.refresh();
    } catch {
      showToast({
        type: "error",
        children: "데브모드를 시작하지 못했습니다. 다시 시도해 주세요.",
      });
    } finally {
      setIsDemoTransitioning(false);
    }
  };

  const handleExitDemo = async () => {
    setIsDemoTransitioning(true);
    try {
      const currentUser = await exitDemoAction();
      queryClient.setQueryData(["me"], currentUser);
      router.refresh();
    } catch {
      showToast({
        type: "error",
        children: "데브모드를 종료하지 못했습니다. 다시 시도해 주세요.",
      });
    } finally {
      setIsDemoTransitioning(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 w-full h-[50px]">
      <Link href="/">
        <Image
          src={Heading}
          alt="헤더 이미지"
          width={100}
          height={34}
          className="h-[30px]"
        />
      </Link>
      <div className="flex gap-4">
        {user ? (
          user.isDemo ? (
            <>
              <span className="self-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                체험모드
              </span>
              <button
                type="button"
                onClick={handleExitDemo}
                disabled={isDemoTransitioning}
                className=" self-center text-sm font-semibold cursor-pointer disabled:opacity-50"
              >
                체험모드 종료
              </button>
            </>
          ) : (
            <Link href="/mypage">
              <button>
                <Avatar
                  src={imageSrc ?? undefined}
                  name={user.nickName}
                  size="sm"
                  className="font-bold text-white cursor-pointer"
                />
              </button>
            </Link>
          )
        ) : (
          <>
            <Link
              href="/login"
              className="self-center text-sm font-semibold cursor-pointer"
            >
              로그인
            </Link>
            <button
              type="button"
              onClick={handleEnterDemo}
              disabled={isDemoTransitioning}
              className="max-w-[150px] rounded-full bg-black px-3 py-1 text-center text-sm leading-tight font-semibold text-white cursor-pointer disabled:opacity-50 sm:max-w-none sm:text-sm"
            >
              {isDemoTransitioning ? "시작 중..." : "체험하기"}
            </button>
          </>
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
