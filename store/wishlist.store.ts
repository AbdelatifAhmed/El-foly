import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {  Product } from '@/lib/types';

interface WishlistState {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (product) => {
        const isExist = get().wishlist.some((item) => item.id === product.id);
        if (isExist) {
          set({ wishlist: get().wishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...get().wishlist, product] });
        }
      },
      removeFromWishlist: (id) =>
        set({ wishlist: get().wishlist.filter((item) => item.id !== id) }),
    }),
    { name: 'wishlist-storage' }
  )
);