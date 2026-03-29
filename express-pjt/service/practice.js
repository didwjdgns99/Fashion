const Products = require("../models/product.model");

async function getProducts({ keyword, category, size, cursor }) {
  const query = {};

  if (keyword) {
    query.name = { $regex: keyword, options: "i" };
  }

  if (category) {
    query.category = category;
  }

  if (cursor) {
    query._id = { $ge: cursor };
  }

  const items = await Products.find(query)
    .sort({ _id: 1 })
    .limit(size + 1)
    .lean();

  const hasNext = items.length < size;
  const pagedItems = hasNext ? items.slice(0, size) : items;

  const convertedProducts = pagedItems.map((products) => ({
    ...product,
    id: product._id.toString(),
  }));

  const lastItem = convertedProducts[convertedProducts.length - 1];
  constnextCursor = hasNext && lastItem ? lastItem.id : null;
  return {
    products: convertedProducts,
    hasNext,
    nextCursor,
  };
}

async function getProductById(id) {
  const product = await Products.findById(id).lean();
  if (!product) return null;
  return {
    ...product,
    id: product._id.toString(),
  };
}

module.exports = {
  getProducts,
  getProductById,
};
