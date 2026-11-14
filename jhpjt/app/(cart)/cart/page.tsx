import CartCard from "@/app/components/cartCard/CartCard";
import { redirect } from "next/navigation";
import { getMeAction } from "@/app/actions/getMe.action";
import CartBotSheet from "@/app/components/bottomSheet/cartBotSheet";
import { cookies } from "next/headers";

export default async function CartPage() {
  const isDemo = (await cookies()).get("demo-mode")?.value === "1";
  if (!isDemo) {
    let user;
    try {
      user = await getMeAction();
    } catch {
      redirect("/login");
    }
    if (!user?.user) redirect("/login");
  }

  return (
    <div className="px-4 pb-72">
      <CartCard />
      <CartBotSheet />
    </div>
  );
}
