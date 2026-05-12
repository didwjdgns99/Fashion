const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const { ORDER_RESPONSE_KEYS } = require("../constants/order");
const mongoose = require("mongoose");

async function createOrderService(userId) {
  const cart = await Cart.findOne({ userId }).populate(
    "items.productId",
    "name price imageUrl",
  );

  //req로 온 userId와 items로 확인
  if (!cart || cart.items.length === 0) {
    // order로 들어온 items가 없으면 에러처리
    const error = new Error("주문 상품이 없습니다.");
    error.status = 400;
    throw error;
  }

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
  const orderId = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  //트렌젝션
  // 상품 이름 생성
  const orderName =
    orderItems.length === 1
      ? orderItems[0].name
      : `${orderItems[0].name} 외 ${orderItems.length - 1}개`;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //몽고디비에 저장
    const order = await Order.create(
      [
        {
          orderId,
          userId,
          items: orderItems,
          totalPrice,
        },
      ],
      { session },
    );

    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();

    // 브라우저에게 반환할 데이터
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
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

module.exports = { createOrderService };
//데모결제 완성 후 setTimeout으로 status바뀌도록
