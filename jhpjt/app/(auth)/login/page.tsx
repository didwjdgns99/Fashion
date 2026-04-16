import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/app/containers/LoginForm/LoginForm";
import Heading_1 from "@/public/image/Heading_1.svg";

type LoginPageProps = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirect = params.redirect || "/products";
  return (
    <div className="flex flex-col items-center px-4 max-w-[480px] mt-[40px] gap-6 m-auto">
      <Link href="/products">
        <Image src={Heading_1} alt="로고" width={150} height={150} />
      </Link>

      <LoginForm redirect={redirect} />
    </div>
  );
}
