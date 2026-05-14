const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const { ORDER_RESPONSE_KEYS } = require("../constants/order");
const mongoose = require("mongoose");

async function createOrderService(userId) {
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
    const order = await Order.create(
      //몽고디비Order에 배열안에 객체형태를 저장한걸 order라고 하겠다 즉 order는 배열형태
      [
        {
          orderId,
          userId,
          items: orderItems,
          totalPrice,
        },
      ],
      { session }, //여기서 세션적은게 이 행위를 저장하기 위해?
    );

    cart.items = []; //배열 비우기
    await cart.save({ session }); // 카트비운거 저장 이 행위도 저장 그렇다면 cart.items = []은 왜 session안하지? 몽고디비와의 통신이 아니여서?

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

module.exports = { createOrderService, getOrderService };
//데모결제 완성 후 setTimeout으로 status바뀌도록
