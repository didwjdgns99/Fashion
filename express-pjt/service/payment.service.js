const Order = require("../models/order.model");

async function confirmPaymentService({ paymentKey, orderId, amount }) {
  if (!paymentKey || !orderId || !amount) {
    const error = new Error("결제 승인에 필요한 값이 부족합니다.");
    error.status = 400;
    throw error;
  }

  const order = await Order.findOne({ orderId });

  if (!order) {
    const error = new Error("주문 정보를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }
  //어마운트 이미 넘버일수도 있음0
  if (order.totalPrice !== Number(amount)) {
    const error = new Error("결제 금액이 주문 금액과 일치하지 않습니다.");
    error.status = 400;
    throw error;
  }

  const secretKey = process.env.TOSS_SECRET_KEY;

  if (!secretKey) {
    const error = new Error("토스 시크릿 키가 설정되어 있지 않습니다.");
    error.status = 500;
    throw error;
  }
  //아이디: 비밀번호
  const encodedSecretKey = Buffer.from(`${secretKey}:`).toString("base64");

  const tossResponse = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        //Basic 인증방식
        Authorization: `Basic ${encodedSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(amount),
      }),
    },
  );

  const payment = await tossResponse.json();

  // 토스 승인 요청이 실패한 경우
  if (!tossResponse.ok) {
    // 토스가 보내준 에러 메시지가 있으면 그걸 사용한다.
    const error = new Error(payment.message || "토스 결제 승인 실패");

    // 토스 응답 상태코드를 그대로 사용한다.
    error.status = tossResponse.status;

    // 컨트롤러로 에러를 던진다.
    throw error;
  }

  const updateOrder = await Order.findOneAndUpdate(
    { orderId },
    {
      orderStatus: "결제완료",
      paymentKey,
    },
    { new: true },
  );

  return {
    order: updateOrder,
    payment,
  };
}

module.exports = {
  confirmPaymentService,
};
