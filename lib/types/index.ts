import { LucideIcon } from "lucide-react";

// types/images.ts
export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export type CardType = {
  id?: string;
  title: string;
  price: number;
  image: string;
  isNew?: boolean;
  vocher?: string;
  rating?: number;
  ratingCount?: number;
};

export interface UserIcon {
  id: number;
  icon: LucideIcon;
  title: string;
}

export interface CartItem {
  id: number;
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
