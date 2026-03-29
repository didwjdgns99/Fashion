"use client";

import Input from "@/app/components/Input/Input";
import Image from "next/image";
import { useState } from "react";
import { useLogin } from "@/libs/hooks/useLogin";
import { useRouter } from "next/navigation";
import google from "@/public/image/google.png";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, mutate } = useLogin();

  const router = useRouter();

  const onClickPassword = () => {
    setShow((prev) => !prev);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },

      {
        onSuccess: () => {
          alert("로그인성공");
          router.push("/products");
        },
        onError: () => {
          alert("로그인실패");
        },
      },
    );
  };

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordValid = password.length >= 8 && /[a-zA-z]/.test(password);
  const isValid = emailRegex && passwordValid;
  return (
    <div className="px-4 w-full ">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p>이메일</p>
          <Input placeholder="이메일" value={email} onChange={onChangeEmail} />
        </div>

        <div>
          <div className="relative w-full flex flex-col gap-2">
            <p>비밀번호</p>
            <Input
              placeholder="비밀번호"
              type={show ? "text" : "password"}
              value={password}
              onChange={onChangePassword}
            />
            <Image
              src={show ? "/image/show.svg" : "/image/hidden.svg"}
              alt="보안"
              width={16}
              height={16}
              onClick={onClickPassword}
              className="absolute right-4  top-13 cursor-pointer"
            />
          </div>
        </div>

        <button
          className={`w-full h-[56px] rounded-[16px] ${isValid ? "bg-black text-white" : "bg-gray-300 text-white"} cursor-pointer`}
          type="submit"
          disabled={!isValid || isPending}
        >
          {isPending ? "처리중" : "로그인"}
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/oauth/google`;
          }}
          className="w-full h-[56px] rounded-[16px] flex justify-center items-center bg-gray-100 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Image src={google} alt="구글 로그인" width={24} height={24} />
        </button>
      </form>
    </div>
  );
}
