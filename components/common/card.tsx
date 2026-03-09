"use client";
import {
  Eye,
  Heart,
  ShoppingCart,
  Trash2,
  Star
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
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
    has_stock,
    available_colors,
    available_storage,
    isWishlistPage,
    rating,
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

        <div className="absolute top-3 left-3 flex flex-col items-start gap-2 z-10">
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

        <div
          className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 z-10
          lg:transform lg:translate-x-12 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100"
        >
          <button
            onClick={() => toggleWishlist(props)}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isLiked
                ? "bg-rose-50 text-rose-500"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {isWishlistPage ? (
              <Trash2 size={18} />
            ) : (
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            )}
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
          disabled={!has_stock}
          onClick={() => {
            addToCart(props, props.starting_price, 1, props.main_image);
            toggleCart();
          }}
          className={`absolute bottom-0 left-0 w-full bg-gray-900 text-white py-3 text-sm font-bold flex items-center justify-center gap-2 transition-transform duration-300 hover:bg-primary z-10
            lg:transform lg:translate-y-full lg:group-hover:translate-y-0 ${!has_stock ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </figure>

      <div className="px-4 pt-3 pb-4 space-y-3">
        {/* Brand + Stock Badge */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
            {brand?.name || "Generic"}
          </span>
          <span
            className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              has_stock
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                has_stock ? "bg-emerald-500" : "bg-red-400"
              }`}
            />
            {has_stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Product Name */}
        <h3 title={product_name} className="font-bold truncate text-gray-900 text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product_name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={12}
                className={
                  i <= Math.round(rating.average)
                    ? "fill-amber-400 stroke-amber-400"
                    : "fill-gray-200 stroke-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-700">
            {rating.average}
          </span>
          <span className="text-xs text-gray-400">
            ({rating.total_reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-col md:flex-row items-baseline gap-2">
          <span className="text-xl font-black text-gray-900 tracking-tight">
            {starting_price?.toLocaleString()} EGP
          </span>
          <span >
            {has_discount && (
              <span className="text-sm text-gray-400 line-through">
                {(starting_price + parseFloat(save_amount)).toLocaleString()}{" "}
                EGP
              </span>
            )}
            {has_discount && (
              <span className="ml-auto text-[11px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                -
                {Math.round(
                  (parseFloat(save_amount) /
                    (starting_price + parseFloat(save_amount))) *
                    100,
                )}
                %
              </span>
            )}
          </span>
        </div>

        {/* Colors */}
        {available_colors?.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-500 font-medium">Color</span>
            <div className="flex gap-1.5">
              {available_colors.map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200 cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    backgroundColor:
                      color.hex_code === "#ffffff" ? "#f1f1f1" : color.hex_code,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Storage */}
        {available_storage?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gray-500 font-medium">
              Storage
            </span>
            {available_storage.map((storage) => (
              <span
                key={storage}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700"
              >
                {storage}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
