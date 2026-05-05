type OrderState = "결제완료" | "배송중" | "배송완료" | "취소/반품";

type OrderStateItem = {
  state: OrderState;
  orderQuantity: number;
};

type OrderStateProps = {
  states: OrderStateItem[];
};

export default function OrderState({ states }: OrderStateProps) {
  return (
    <div className="flex flex-col gap-4 px-8 bg-white py-4">
      <h3 className="font-bold text-md">주문 배송</h3>
      <div className="flex justify-between">
        {states.map((item) => (
          <div key={item.state} className="flex flex-col items-center gap-1">
            <p className="flex justify-center items-center bg-black rounded-full text-white w-12 h-12 mb-1 font-bold">
              {item.orderQuantity ?? 0}
            </p>
            <p className="text-sm">{item.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
