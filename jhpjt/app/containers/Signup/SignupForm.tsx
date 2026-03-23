"use client";

import Image from "next/image";
import Input from "@/app/components/Input/Input";
import { useState } from "react";
import { useSignup } from "@/libs/hooks/useSignup";
import { useRouter } from "next/navigation";
import google from "@/public/image/google.png";

export default function SignupForm() {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);

  const [value, setValue] = useState({
    email: "",
    nickName: "",
    password: "",
    passwordConfirm: "",
  });

  const { mutate, isPending } = useSignup();
  const router = useRouter();

  //비밀번호 보안
  const onClickPassword = () => {
    setShow((prev) => !prev);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    setIsEmailValid(emailValid.test(value));
  };

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password, nickName },
      {
        onSuccess: (data) => {
          console.log("응답:", data);
          alert("회원가입 성공");
          router.push("/products");
        },
        onError: (err) => {
          console.log(err);
          alert("가입 실패");
        },
      },
    );
  };
  const nickValid = nickName.length >= 3;
  const enValid = /[a-zA-Z]/.test(password);
  const numValid = /[0-9]/.test(password);
  const lengthValid = password.length >= 8;
  const passwordValid =
    passwordConfirm.length >= 8 && password === passwordConfirm;
  const isValid =
    enValid &&
    numValid &&
    lengthValid &&
    passwordValid &&
    nickValid &&
    isEmailValid;
  return (
    <div className="w-full relative ">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <Input placeholder="이메일" value={email} onChange={onChangeEmail} />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="닉네임"
            value={nickName}
            onChange={onChangeNickName}
          />
          <div className="flex gap-2 text-[12px] pl-4">
            <span
              className={` px-2 py-[2px] rounded-2xl ${nickValid ? "bg-blue-400 text-white" : "bg-gray-200"}`}
            >
              3자 이상
            </span>
          </div>
          {value.nickName && (
            <p className="text-[13px] text-gray-700 font-bold pl-6">
              {value.nickName}
            </p>
          )}
        </div>

        <div>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="비밀번호"
              type={show ? "text" : "password"}
              value={password}
              onChange={onChangePassword}
            />
            <div className="flex gap-2 text-[12px] pl-4">
              <span
                className={` px-2 py-[2px] rounded-2xl ${enValid ? "bg-blue-400 text-white" : "bg-gray-200"}`}
              >
                영문 ✔
              </span>
              <span
                className={` px-2 py-[2px] rounded-2xl ${numValid ? "bg-blue-400 text-white" : "bg-gray-200"}`}
              >
                숫자 ✔
              </span>
              <span
                className={` px-2 py-[2px] rounded-2xl ${lengthValid ? "bg-blue-400 text-white" : "bg-gray-200"}`}
              >
                8자 이상 ✔
              </span>
            </div>
            <Image
              src={show ? "/image/show.svg" : "/image/hidden.svg"}
              alt="보안"
              width={16}
              height={16}
              onClick={onClickPassword}
              className="absolute right-4 top-49 cursor-pointer"
            />
          </div>
          {value.password && (
            <p className="text-[13px] text-gray-700 font-bold pl-6">
              {value.password}
            </p>
          )}
        </div>

        <div>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="비밀번호 확인"
              type="password"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
            <div className="flex gap-2 text-[12px] pl-4">
              <span
                className={` px-2 py-[2px] rounded-2xl ${passwordValid ? "bg-blue-400 text-white" : "bg-gray-200"}`}
              >
                확인
              </span>
            </div>
          </div>
          {value.passwordConfirm && (
            <p className="text-[13px] text-gray-700 font-bold pl-6">
              {value.passwordConfirm}
            </p>
          )}
        </div>

        <button
          className={`w-full h-[56px] rounded-[16px] ${isValid ? "bg-black text-white" : "bg-gray-300 text-white"} cursor-pointer bg-gray-100 shadow-inner shadow-md hover:shadow-lg transition-shadow mt-10`}
          type="submit"
          onSubmit={onSubmit}
          disabled={!isValid || isPending}
        >
          {isPending ? "처리중" : "회원가입"}
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
