import MyInfo from "../../components/MyInfo/MyInfo";
import OrderState from "@/app/components/order/orderState";
import Logout from "@/app/components/Logout/Logout";
import RecentOrder from "@/app/components/order/recentOrder";

export default function MyPage() {
  return (
    <div className="flex flex-col gap-2 bg-gray-100 h-[100vh]">
      <MyInfo />
      <OrderState
        states={[
          { state: "결제완료", orderQuantity: 2 },
          { state: "배송중", orderQuantity: 1 },
          { state: "배송완료", orderQuantity: 3 },
          { state: "반품/교환", orderQuantity: 0 },
        ]}
      />
      <div className="flex flex-col gap-4 p-5 bg-white">
        <h3>최근 주문내역</h3>
        <RecentOrder />
      </div>
      <Logout />
    </div>
  );
}
