import { create } from "zustand";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addCart: (item: CartItem) => void;
  removeCart: (productId: string, size: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),
  removeCart: (productId, size) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    })),
}));
