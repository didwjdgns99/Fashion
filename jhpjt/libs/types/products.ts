export type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  meta?: { heart: number; review: number };
  imageUrl: string;
  size: string[];
  onClick?: () => void;
};

export type ProductsCursorResponse = {
  products: ProductCardProps[];
  nextCursor: string | null; //다음시작 위치
  hasNext: boolean;
};

//클라이언트가 서버에 보낼 요청 파라미터
export type ProductsRequestParams = {
  cursor?: string | null;
  size?: number;
  keyword?: string;
  category?: string;
};
