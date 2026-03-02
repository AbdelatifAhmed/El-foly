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
  available_colors: [
    {
      name: string,
      hex_code: string,
    }
  ];
  available_storage: string[];
  brand: {
    id: string;
    name: string;
  };
  rating: {
    average: number,
    total_reviews: number
  };
}

export interface ProductDetails extends Product {
  images: string[];
  warranty_months: number;
  description: string;
  category: {
    id: string;
    name: string;
  };
  available_options: {
    colors: [
      {
        id: string;
        name: string;
        hex_code: string;
      }
    ];
    storage: [
      {
        id: string;
        capacity: string;
      }
    ];
  };
  variants: [
    {
      id: string;
      name: string;
      sku: string;
      color: {
        id: string;
        name: string;
        hex_code: string;
      };
      storage: {
        id: string;
        capacity: string;
      };
      sale_price: number;
      final_price: number;
      stock_quantity: number;
      in_stock: boolean;
      low_stock: boolean;
    }
  ];
  specifications: {
    type: string;
    display: {
      size: string;
      resolution: string;
      type: string;
    };
    processor: string;
    ram: string;
    camera: {
      main: string;
      front: string;
    };
    battery: {
      capacity: string;
      charging_type: string;
      charging_power: string;
    };
    operating_system: {
      name: string,
      version: string
    },
    connectivity: {
      sim_type: string,
      network: string
    },
    features: {
      waterproof: boolean,
      waterproof_rating: string,
      fingerprint: boolean,
      face_unlock: boolean,
      wireless_charging: boolean,
      nfc: boolean,
      headphone_jack: boolean
    }
  };
  discount: {
    has_discount: boolean,
    discount: number
  }
  reviews: {
            statistics: {
                average_rating: number,
                total_reviews: number,
                rating_distribution: {
                    five_star_count: string,
                    four_star_count: string,
                    three_star_count: string,
                    two_star_count: string,
                    one_star_count: string
                }
            },
            items: []
        }
}


export interface CartItem {
  id: string;
  title: string;
  price: number ;
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
  addToCart: (product: Product , price: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export interface Category {
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