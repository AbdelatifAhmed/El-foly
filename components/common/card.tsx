'use client';
import { Eye, Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { CardType } from "@/lib/types";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import Link from "next/link";



const Card = (props: CardType) => {
    const { id, title, price, image, isNew, vocher, rating, ratingCount, isWishlistPage } = props;

    // Zustand Stores
    const addToCart = useCartStore((state) => state.addToCart);
    const toggleCart = useCartStore((state) => state.toggleCart);
    const { toggleWishlist, wishlist } = useWishlistStore();

    const isLiked = wishlist.some((item) => item.id === id);

    const handleAddToCart = () => {
        addToCart({ id, title, price, image });
        toggleCart();
    };

    return (
        <div className="card card-compact bg-white w-full max-w-87 shadow-sm hover:shadow-md transition-shadow duration-300 group border border-gray-100">
            <figure className="relative bg-slate-50 w-full h-64 overflow-hidden pt-4">
                <Image
                    src={image || "/placeholder.png"}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {isNew && <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase rounded px-2 py-1 shadow-sm">New</span>}
                    {vocher && <span className="bg-rose-500 text-white text-[10px] font-bold uppercase rounded px-2 py-1 shadow-sm">-{vocher}%</span>}
                </div>

                <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 
                    lg:transform lg:translate-x-12 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100
                    ${/* تظهر دائماً في الموبايل */ 'transform-none opacity-100'}`}>
                    <button
                        onClick={() => toggleWishlist(props)}
                        className={`p-2 rounded-full shadow-md transition-colors ${isLiked ? 'bg-rose-50 text-rose-500' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        {isWishlistPage ? <Trash2 size={18} /> : <Heart size={18} fill={isLiked ? "currentColor" : "none"} />}
                    </button>
                    {!isWishlistPage && (
                        <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                            <Link href={`/products/${id}`}>
                                <Eye size={18} />
                            </Link>
                        </button>
                    )}
                </div>

                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-0 left-0 w-full bg-gray-900 text-white py-3 text-sm font-bold flex items-center justify-center gap-2 transition-transform duration-300 hover:bg-primary
                                lg:transform lg:translate-y-full lg:group-hover:translate-y-0 
                                transform-none translate-y-0"
                                 >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </figure>   

            <div className="card-body p-4">
                <h3 className="font-bold text-gray-800 text-lg truncate mb-1">{title}</h3>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-black text-primary">${price}</span>
                    {vocher && (
                        <span className="text-sm text-gray-400 line-through">
                            ${(price / (1 - vocher / 100)).toFixed(0)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;