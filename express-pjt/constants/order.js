// orderId: order.orderId,
//     amount: order.totalPrice,
//     orderName,
//     orderStatus: order.orderStatus,
//     deliveryStatus: order.deliveryStatus,

/**
 * @description 클라이언트로 반환할 order객체 키의 모음
 */
const ORDER_RESPONSE_KEYS = {
  ORDER_ID: "orderId",
  AMOUNT: "amount",
  ORDER_NAME: "orderName",
  ORDERSTATUS: "orderStatus",
  DELIVERYSTATUS: "deliveryStatus",
};

module.exports = { ORDER_RESPONSE_KEYS };
