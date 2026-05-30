import SignupForm from "@/app/containers/Signup/SignupForm";
import Image from "next/image";
import Heading_1 from "@/public/image/Heading_1.svg";
import Link from "next/link";

export default function SignupPage() {
  //회원가입 버튼(폼 제출)

  return (
    <div className="flex flex-col items-center px-4 max-w-[480px] mt-[40px] gap-6 m-auto">
      <Link href="/products">
        <Image src={Heading_1} alt="로고" width={180} height={180} />
      </Link>
      <SignupForm />
    </div>
  );
}
