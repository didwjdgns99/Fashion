import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: string;
  imageUrl?: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addCart: (item: CartItem) => void;
  removeCart: (productId: string, size: string) => void;
  increaseQuantity: (productId: string, size: string) => void;
  decreaseQuantity: (productId: string, size: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) =>
              cartItem.productId === item.productId &&
              cartItem.size === item.size,
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.productId === item.productId &&
                cartItem.size === item.size
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, item],
          };
        }),

      removeCart: (productId, size) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item.productId === productId && item.size === size),
          ),
        })),
      // 수량 증가
      increaseQuantity: (productId, size) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      // 수량 감소
      decreaseQuantity: (productId, size) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.productId === productId &&
            item.size === size &&
            item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),
    }),
    {
      name: "cart-storage", // localStorage key 이름
    },
  ),
);
