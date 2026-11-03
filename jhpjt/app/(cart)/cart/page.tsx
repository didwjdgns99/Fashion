import CartCard from "@/app/components/cartCard/CartCard";
import { redirect } from "next/navigation";
import { getMeAction } from "@/app/actions/getMe.action";
import CartBotSheet from "@/app/components/bottomSheet/cartBotSheet";

export default async function CartPage() {
  try {
    const user = await getMeAction();
    if (!user) {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }
  return (
    <div className="px-4 pb-72">
      <CartCard />
      <CartBotSheet />
    </div>
  );
}
