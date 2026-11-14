import MyInfo from "../../components/MyInfo/MyInfo";
import OrderState from "@/app/components/order/orderState";
import Logout from "@/app/components/Logout/Logout";
import RecentOrder from "@/app/components/order/recentOrder";
import { getMeAction } from "@/app/actions/getMe.action";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const result = await getMeAction();
  if (result?.user?.isDemo) redirect("/products");

  return (
    <div className="flex flex-col gap-2 bg-gray-100 h-[100vh]">
      <MyInfo />
      <OrderState />
      <div className="flex flex-col gap-4 p-5 bg-white">
        <h3>최근 주문내역</h3>
        <RecentOrder />
      </div>
      <Logout />
    </div>
  );
}
