const Order = require("../models/order.model");

async function cleanupPendingOrders() {
  const result = await Order.updateMany(
    //여러개를 한 번에 수정한다
    {
      orderStatus: "결제대기", //orderStatus가 "결제대기"면서
      createdAt: {
        $lt: new Date(Date.now() - 30 * 60 * 1000),
      },
    },
    {
      orderStatus: "반품/취소",
      deliveryStatus: "반품/취소",
    },
  );
  console.log("자동 취소된 주문 수:", result.modifiedCount);
}
module.exports = {
  cleanupPendingOrders,
};
