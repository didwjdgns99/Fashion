const Order = require("../models/order.model");

async function cancelPendingOrders() {
  const result = await Order.updateMany(
    //여러개를 한 번에 수정한다
    //어떤 주문을 찾을 지  결제대기 이면서 현재 시간보다 30분 더 오래된 주문
    {
      orderStatus: "결제대기",
      createdAt: {
        $lte: new Date(Date.now() - 30 * 60 * 1000),
      },
    },
    {
      orderStatus: "반품/취소",
      deliveryStatus: "반품/취소",
    },
  );
  console.log("자동 취소된 주문 수:", result.modifiedCount);
}

async function markOrdersAsPreparing() {
  const result = await Order.updateMany(
    {
      orderStatus: "결제완료",
      createdAt: {
        $lte: new Date(Date.now() - 60 * 60 * 1000),
      },
    },
    {
      orderStatus: "상품 준비중",
    },
  );
  console.log("상품준비중 변경 주문 수:", result.modifiedCount);
}

async function markOrdersAsShipping() {
  const result = await Order.updateMany(
    {
      orderStatus: "상품 준비중",
      createdAt: {
        $lte: new Date(Date.now() - 60 * 60 * 1000),
      },
    },
    {
      orderStatus: "배송중",
      deliveryStatus: "배송중",
    },
  );
  console.log("배송중 주문 수:", result.modifiedCount);
}

async function markOrdersAsDelivered() {
  const result = await Order.updateMany(
    {
      orderStatus: "배송중",
      createdAt: {
        $lte: new Date(Date.now() - 60 * 60 * 1000),
      },
    },
    {
      orderStatus: "배송완료",
      deliveryStatus: "배송완료",
    },
  );
  console.log("배송완료 주문 수:", result.modifiedCount);
}

module.exports = {
  cancelPendingOrders,
  markOrdersAsPreparing,
  markOrdersAsShipping,
  markOrdersAsDelivered,
};
