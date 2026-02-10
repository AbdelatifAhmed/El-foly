import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartStore } from '@/lib/types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }

        const newItem: CartItem = {
          id: product.id,
          title: product.product_name,
          price: product.starting_price,
          image: product.main_image,
          quantity: 1
        };

        return { cartItems: [...state.cartItems, newItem] };
      }),

      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id),
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),

      clearCart: () => set({ cartItems: [] }),

      totalItems: () => get().cartItems.reduce((total, item) => total + item.quantity, 0),

      totalPrice: () => get().cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);