import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existent = state.items.find((i) => i.id === item.id);
          if (existent) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      updateItem: (id, quantity) =>
        set((state) => ({ items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)) })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    {
      name: "min-commerce-cart",
      getStorage: () => typeof window !== "undefined" ? localStorage : undefined,
    }
  )
);
