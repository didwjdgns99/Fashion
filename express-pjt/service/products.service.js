const Product = require("../models/product.model");

async function getProducts({ size, cursor, keyword, category }) {
  const query = {}; //몽고DB에 전달할 조건 객체 일단은 빈 객체 값

  // 검색어 필터
  if (keyword) {
    query.name = { $regex: keyword, $options: "i" };
  }

  // 카테고리 필터
  if (category) {
    query.category = category;
  }

  // 커서 이후 데이터 조회
  if (cursor) {
    query._id = { $gt: cursor }; // gt = greater than 보다 큰
  }

  const items = await Product.find(query)
    .sort({ _id: 1 }) // -1 은 내림차순
    .limit(size + 1) // hasNext확인
    .lean(); //몽구스 객체가 아닌 javascript 객체로 변환

  const hasNext = items.length > size; //item가져온 갯수가 size보다 크면 hasNext = true

  // 실제 반환할 데이터는 size개까지만
  const pagedItems = hasNext ? items.slice(0, size) : items; // hasNext가 true면 가져온 items중 0부터 size까지만 잘라내기 그렇지 않으면 가져온items 전부 다

  // 프론트에서 product.id 로 쓸 수 있게 변환
  const convertedProducts = pagedItems.map((product) => ({
    ...product,
    id: product._id.toString(),
  }));

  const lastItem = convertedProducts[convertedProducts.length - 1];
  const nextCursor = hasNext && lastItem ? lastItem.id : null;

  return {
    products: convertedProducts,
    nextCursor,
    hasNext,
  };
}

async function getProductById(id) {
  const product = await Product.findById(id).lean();

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
