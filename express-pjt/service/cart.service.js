const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

async function getPopulatedCart(userId) {
  let cart = await Cart.findOne({ userId }).populate(
    "items.productId",
    "name price imageUrl",
  );

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
    });
  }
  return cart;
}

async function addCartService(userId, item) {
  const { productId, size, quantity = 1 } = item;

  const product = await Product.findById(productId);

  if (!product) {
    return null; //이런 에러처리는 컨트롤러에서 해야하는거 아냐?
  }

  let cart = await Cart.findOne({ userId }); //카트에 재할당 위해

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (cartItem) =>
      cartItem.productId.toString() === productId && cartItem.size === size,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      size,
      quantity,
    });
  }

  await cart.save();

  return await getPopulatedCart(userId);
}

async function patchCartService(userId, productId, size, quantity) {
  const cart = await Cart.findOne({ userId });

  if (!cart) return null;

  const patchItem = cart.items.find(
    (item) => item.productId.toString() === productId && item.size === size,
  );

  if (!patchItem || quantity < 1) return null;

  patchItem.quantity = quantity;

  await cart.save();

  return await getPopulatedCart(userId);
}

async function deleteCartService(userId, productId, size) {
  const cart = await Cart.findOne({ userId });

  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) => !(item.productId.toString() === productId && item.size === size),
  );

  await cart.save();
  return await getPopulatedCart(userId);
}

module.exports = {
  getPopulatedCart,
  addCartService,
  deleteCartService,
  patchCartService,
};
