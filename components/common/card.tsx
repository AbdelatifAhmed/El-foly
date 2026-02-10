'use client';
import { Eye, Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types"; // استيراد النوع الجديد من ملفك
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";

interface CardProps extends Product {
  isWishlistPage?: boolean;
}

const Card = (props: CardProps) => {
  const {
    id,
    product_name,
    starting_price,
    main_image,
    is_new,
    has_discount,
    discount_value,
    save_amount,
    brand,
    isWishlistPage
  } = props;

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { toggleWishlist, wishlist } = useWishlistStore();

  const isLiked = wishlist.some((item) => item.id === id);

  return (
    <div className="card card-compact bg-white w-full shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100 rounded-2xl overflow-hidden">
      <figure className="relative bg-slate-50 w-full h-64 overflow-hidden pt-4">
        <Image
          src={main_image || "/images/placeholder.png"}
          alt={product_name}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {is_new && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase rounded px-2 py-1 shadow-sm">
              New
            </span>
          )}
          {has_discount && discount_value && (
            <span className="bg-rose-500 text-white text-[10px] font-bold uppercase rounded px-2 py-1 shadow-sm">
              -{discount_value}%
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 z-10
          lg:transform lg:translate-x-12 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
          <button
            onClick={() => toggleWishlist(props)}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isLiked ? 'bg-rose-50 text-rose-500' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {isWishlistPage ? <Trash2 size={18} /> : <Heart size={18} fill={isLiked ? "currentColor" : "none"} />}
          </button>
          
          {!isWishlistPage && (
            <Link 
              href={`/products/${id}`}
              className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Eye size={18} />
            </Link>
          )}
        </div>

        {/* Quick Add to Cart Button */}
        <button
          onClick={() => { addToCart(props); toggleCart(); }}
          className="absolute bottom-0 left-0 w-full bg-gray-900 text-white py-3 text-sm font-bold flex items-center justify-center gap-2 transition-transform duration-300 hover:bg-primary z-10
            lg:transform lg:translate-y-full lg:group-hover:translate-y-0"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </figure>

      {/* تفاصيل المنتج */}
      <div className="p-4">
        <div className="mb-1 text-[10px] uppercase tracking-wider text-gray-400 font-bold">
          {brand?.name || "Generic"}
        </div>
        
        <h3 className="font-bold text-gray-800 text-base truncate mb-1 group-hover:text-primary transition-colors">
          {product_name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-gray-900">
            EGP {starting_price}
          </span>
          {has_discount && (
            <span className="text-sm text-gray-400 line-through font-medium">
              EGP {(starting_price + parseFloat(save_amount))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;