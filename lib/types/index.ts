import { LucideIcon } from "lucide-react";

// types/images.ts
export interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface Product {
    id: string;
    product_name: string;
    is_new: boolean;
    main_image: string;
    starting_price: number;
    has_discount: boolean;
    discount_type: string | null;
    save_amount: string;
    discount_value: string | null;
    is_flash_sale: boolean;
    total_variants: number;
    has_stock: boolean;
    stock_quantity: number;
    available_colors: string[];
    available_storage: string[];
    brand: {
        id: string;
        name: string;
    };
    category: {
        id: string;
        name: string;
    };
}


export interface CartItem {
    id: string;
    title: string; 
    price: number;
    image: string;
    quantity: number;
    color?: string;
    storage?: string;
}

export interface UserIcon {
  id: number;
  icon: LucideIcon;
  title: string;
  path?: string;
}


export interface CartStore {
    cartItems: CartItem[];
    isOpen: boolean;
    toggleCart: () => void;
    addToCart: (product: Product) => void; 
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
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
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string | number) => void;
  toggleWishlist: (product: Product) => void;
}


export type toastType = {
    message: string,
    type?: 'success' | 'error' 
}