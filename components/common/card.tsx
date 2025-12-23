'use client';
import { Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CardType } from "@/lib/types";
import { useCartStore } from "@/store/cart.store";

const Card = ({ id, title, price, image, isNew, vocher, rating, ratingCount }: CardType) => {
    const [isLiked, setIsLiked] = useState(false);
    
    const addToCart = useCartStore((state) => state.addToCart);
    const toggleCart = useCartStore((state) => state.toggleCart);

    const handleAddToCart = () => {
        addToCart({ id, title, price, image });
        toggleCart(); 
    };

  return (
    <div className="card card-compact bg-white w-full max-w-[350px] shadow-sm hover:shadow-md transition-shadow duration-300 group border border-gray-100">
\        <figure className="relative bg-slate-50 w-full h-64 overflow-hidden pt-4">
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

            <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full shadow-md transition-colors ${isLiked ? 'bg-rose-50 text-rose-500' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Eye size={18} />
                </button>
            </div>

            <button 
                onClick={handleAddToCart}
                className="absolute bottom-0 left-0 w-full bg-gray-900 text-white py-3 text-sm font-bold flex items-center justify-center gap-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary"
            >
                <ShoppingCart size={16} />
                Add to Cart
            </button>
        </figure>

        <div className="card-body p-4">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Electronics</h2>
            <h3 className="font-bold text-gray-800 text-lg truncate mb-1">{title}</h3>
            
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-black text-primary">${price}</span>
                {vocher && (
                    <span className="text-sm text-gray-400 line-through">
                        ${(price / (1 - vocher/100)).toFixed(0)}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2 mt-auto">
                <div className="rating rating-xs">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <input 
                            key={star}
                            type="radio" 
                            disabled
                            className={`mask mask-star-2 ${star <= Math.round(rating || 0) ? "bg-orange-400" : "bg-gray-200"}`} 
                        />
                    ))}
                </div>
                <span className="text-xs text-gray-400 font-medium">({ratingCount})</span>
            </div>
        </div>
    </div>
  );
};

export default Card;