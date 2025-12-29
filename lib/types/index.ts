import { LucideIcon } from "lucide-react";

// types/images.ts
export interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export type CardType = {
  id:  number;
  title: string;
  price: number;
  image: string;
  isNew?: boolean;
  vocher?: number;
  rating?: number;
  ratingCount?: number;
  isWishlistPage?: boolean;
};

export interface UserIcon {
  id: number;
  icon: LucideIcon;
  title: string;
}

export interface CartItem {
  id: number ;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartStore {
  cartItems: CartItem[];
  isOpen: boolean;

  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;

  totalItems: () => number;
  totalPrice: () => number;
}

export interface Category  {
  id: string;
  name: string;
  Icon: LucideIcon;
};



export interface WishlistState {
  wishlist: CardType[];
  addToWishlist: (product: CardType) => void;
  removeFromWishlist: (id: string | number) => void;
  toggleWishlist: (product: CardType) => void;
}