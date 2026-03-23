const { products } = require("../mocks/products");

function getProducts({ size, cursor, keyword, category }) {
  let sorted = [...products];
  const searchKeyword = keyword?.toLowerCase() || "";

  if (searchKeyword) {
    sorted = sorted.filter((p) => p.name.toLowerCase().includes(searchKeyword));
  }

  if (category) {
    sorted = sorted.filter((p) => p.category === category);
  }

  let startIndex = 0;

  if (cursor) {
    const idx = sorted.findIndex((p) => p.id === Number(cursor));
    startIndex = idx >= 0 ? idx + 1 : 0;
  }

  const pageItem = sorted.slice(startIndex, startIndex + size);
  const lastItem = pageItem[pageItem.length - 1];
  const hasNext = startIndex + size < sorted.length;
  const nextCursor = hasNext && lastItem ? lastItem.id : null;

  return {
    products: pageItem,
    nextCursor,
    hasNext,
  };
}

function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

module.exports = {
  getProducts,
  getProductById,
};
