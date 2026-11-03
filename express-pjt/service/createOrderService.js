const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const { ORDER_RESPONSE_KEYS } = require("../constants/order");
const mongoose = require("mongoose");

async function createOrderService(userId, shippingAddress) {
  if (!shippingAddress || typeof shippingAddress !== "object") {
    const error = new Error("배송 정보를 입력해 주세요.");
    error.status = 400;
    throw error;
  }

  const normalizedShippingAddress = {
    recipientName:
      typeof shippingAddress.recipientName === "string"
        ? shippingAddress.recipientName.trim()
        : "",
    recipientPhone:
      typeof shippingAddress.recipientPhone === "string"
        ? shippingAddress.recipientPhone.trim()
        : "",
    postalCode:
      typeof shippingAddress.postalCode === "string"
        ? shippingAddress.postalCode.trim()
        : "",
    address:
      typeof shippingAddress.address === "string"
        ? shippingAddress.address.trim()
        : "",
    detailAddress:
      typeof shippingAddress.detailAddress === "string"
        ? shippingAddress.detailAddress.trim()
        : "",
    deliveryRequest:
      typeof shippingAddress.deliveryRequest === "string"
        ? shippingAddress.deliveryRequest.trim()
        : "",
  };

  if (
    !normalizedShippingAddress.recipientName ||
    !normalizedShippingAddress.recipientPhone ||
    !normalizedShippingAddress.postalCode ||
    !normalizedShippingAddress.address ||
    !normalizedShippingAddress.detailAddress
  ) {
    const error = new Error("받는 사람, 연락처, 주소와 상세 주소를 입력해 주세요.");
    error.status = 400;
    throw error;
  }

  if (!/^\d{5}$/.test(normalizedShippingAddress.postalCode)) {
    const error = new Error("유효한 우편번호를 입력해 주세요.");
    error.status = 400;
    throw error;
  }

  const phoneDigits = normalizedShippingAddress.recipientPhone.replace(
    /\D/g,
    "",
  );
  if (phoneDigits.length < 9 || phoneDigits.length > 11) {
    const error = new Error("유효한 연락처를 입력해 주세요.");
    error.status = 400;
    throw error;
  }

  if (normalizedShippingAddress.deliveryRequest.length > 100) {
    const error = new Error("배송 요청사항은 100자 이내로 입력해 주세요.");
    error.status = 400;
    throw error;
  }

  //유저아이디 받아서 카트를 찾음
  const cart = await Cart.findOne({ userId }).populate(
    //cart는 productId의 name price imageUrl을 참조하여 productId가 바뀌어도 항상 최신 데이터를 받는다.
    "items.productId",
    "name price imageUrl",
  );

  //req로 온 userId와 items로 확인
  if (!cart || cart.items.length === 0) {
    //Cart + 참조한 데이터가 없으면 에러처리
    // order로 들어온 items가 없으면 에러처리
    const error = new Error("주문 상품이 없습니다.");
    error.status = 400;
    throw error;
  }

  //장바구니 목록들 중 items 객체의 productId를 편하게 사용하기 위해 product로 치환
  const orderItems = cart.items.map((item) => {
    const product = item.productId;

    if (!product) {
      const error = new Error("존재하지 않는 상품이 포함되어 있습니다.");
      error.status = 404;
      throw error;
    }
    return {
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: item.size,
      quantity: item.quantity,
    };
  });

  //총가격 코드
  const totalPrice = orderItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  //주문번호 생성
  //유니크 설정
  const now = new Date();
  const date =
    `${now.getFullYear()}` +
    `${String(now.getMonth() + 1).padStart(2, "0")}` +
    `${String(now.getDate()).padStart(2, "0")}`;

  const random = Math.floor(Math.random() * 100000);

  const orderId = `${date}_${random}`;
  //트렌젝션
  // 상품 이름 생성

  const orderName =
    orderItems.length === 1
      ? orderItems[0].name
      : `${orderItems[0].name} 외 ${orderItems.length - 1}개`;

  const session = await mongoose.startSession(); //트렌젝션으로 하나로 묶을 과정들의 중간 저장매체

  try {
    session.startTransaction(); //여기서부터 작업을 묶겠다.
    //몽고디비에 저장
    //insertMany 스타일 질문
    const order = await Order.create(
      //몽고디비Order에 배열안에 객체형태를 저장한걸 order라고 하겠다 즉 order는 배열형태
      [
        {
          orderId,
          userId,
          items: orderItems,
          totalPrice,
          shippingAddress: normalizedShippingAddress,
        },
      ],
      { session }, //여기서 세션적은게 이 행위를 저장하기 위해?
    );

    await session.commitTransaction(); //여기까지 작업이 완료되면 커밋하겠다

    // 브라우저에게 반환할 데이터
    //토스가 필요한 데이터
    const responseData = {
      [ORDER_RESPONSE_KEYS.ORDER_ID]: order[0].orderId,
      [ORDER_RESPONSE_KEYS.AMOUNT]: order[0].totalPrice,
      [ORDER_RESPONSE_KEYS.ORDER_NAME]: orderName,
      [ORDER_RESPONSE_KEYS.ORDERSTATUS]: order[0].orderStatus,
      [ORDER_RESPONSE_KEYS.DELIVERYSTATUS]: order[0].deliveryStatus,
    };

    console.log("생성된 주문 응답", responseData);

    return responseData;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction(); //트렌젝션 실패 abort하기
    }

    throw error;
  } finally {
    session.endSession(); //실패하든 성공하든 저장매체 없애기
  }
}

async function getOrderService(userId) {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });

  return orders;
}

async function updateOrderActionService({ userId, orderId, action }) {
  console.info("[주문 서비스] 처리 시작", { orderId, action });

  if (action !== "cancel" && action !== "return") {
    const error = new Error("지원하지 않는 주문 처리 요청입니다.");
    error.status = 400;
    throw error;
  }

  const order = await Order.findOne({ userId, orderId });
  if (!order) {
    const error = new Error("주문 정보를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }
  console.info("[주문 서비스] 주문 조회 완료", {
    orderId,
    deliveryStatus: order.deliveryStatus,
  });

  if (action === "cancel") {
    if (order.deliveryStatus !== "상품 준비중") {
      const error = new Error("상품 준비중인 주문만 취소할 수 있습니다.");
      error.status = 409;
      throw error;
    }

    if (!order.paymentKey) {
      const error = new Error("결제 정보를 찾을 수 없어 주문을 취소할 수 없습니다.");
      error.status = 409;
      throw error;
    }

    const secretKey = process.env.TOSS_SECRET_KEY;
    if (!secretKey) {
      const error = new Error("토스 시크릿 키가 설정되어 있지 않습니다.");
      error.status = 500;
      throw error;
    }

    const encodedSecretKey = Buffer.from(`${secretKey}:`).toString("base64");
    const tossResponse = await fetch(
      `https://api.tosspayments.com/v1/payments/${encodeURIComponent(order.paymentKey)}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cancelReason: "고객 요청에 의한 주문 취소" }),
      },
    );
    const tossResult = await tossResponse.json();
    console.info("[주문 서비스] 결제 취소 API 응답", {
      orderId,
      status: tossResponse.status,
      ok: tossResponse.ok,
    });

    if (!tossResponse.ok) {
      const error = new Error(
        tossResult.message || "결제 취소 요청을 완료하지 못했습니다.",
      );
      error.status = tossResponse.status;
      throw error;
    }

    const canceledOrder = await Order.findOneAndUpdate(
      {
        _id: order._id,
        userId,
        deliveryStatus: "상품 준비중",
      },
      {
        orderStatus: "반품/취소",
        deliveryStatus: "반품/취소",
      },
      { new: true },
    );

    if (!canceledOrder) {
      const error = new Error("주문 상태가 변경되어 취소 결과를 확인할 수 없습니다.");
      error.status = 409;
      throw error;
    }

    return canceledOrder;
  }

  if (
    order.deliveryStatus !== "배송중" &&
    order.deliveryStatus !== "배송완료"
  ) {
    const error = new Error("배송중 또는 배송완료 상태에서만 반품을 요청할 수 있습니다.");
    error.status = 409;
    throw error;
  }

  if (order.returnRequestedAt) {
    const error = new Error("이미 반품 요청이 접수된 주문입니다.");
    error.status = 409;
    throw error;
  }

  const returnedOrder = await Order.findOneAndUpdate(
    {
      _id: order._id,
      userId,
      deliveryStatus: order.deliveryStatus,
      returnRequestedAt: null,
    },
    {
      returnRequestedAt: new Date(),
      returnReason: "고객 요청",
    },
    { new: true },
  );

  if (!returnedOrder) {
    const error = new Error("주문 상태가 변경되었거나 이미 반품 요청된 주문입니다.");
    error.status = 409;
    throw error;
  }

  console.info("[주문 서비스] 반품 요청 저장 완료", { orderId });
  return returnedOrder;
}

module.exports = {
  createOrderService,
  getOrderService,
  updateOrderActionService,
};
//데모결제 완성 후 setTimeout으로 status바뀌도록
