'use client';
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CardType } from "@/lib/types";

const Card = ({ title, price, image, isNew, vocher, rating, ratingCount }: CardType) => {
    const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="card card-lg bg-base-100 w-96 shadow-sm  static">
        <figure className="relative group bg-slate-100 w-full h-64 overflow-hidden">
            <Image
                src={image}
                alt={title || 'Product Image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
        <div className="card-actions w-full h-12 p-2 bg-[var(--secondary-color)] text-white text-xl hidden group-hover:flex justify-center items-center absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out group-hover:cursor-pointer">
                    Add to cart
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-3 ">
            {isLiked ? (
                <Heart
                    className="bg-white rounded-full w-10 h-10 p-2 cursor-pointer"
                    fill="red"
                    color="red"
                    onClick={() => setIsLiked(false)}
                />
            ) : (
                <Heart
                    className="bg-white rounded-full w-10 h-10 p-2 cursor-pointer"
                    onClick={() => setIsLiked(true)}
                />
            )}
            <Eye className="bg-white rounded-full w-10 h-10 p-2" />
        </div>
        <div className="absolute top-2 left-2 flex ">
            {isNew && <span  className="bg-green-600 text-white rounded-md px-2 py-1">New</span>}
            {vocher && <span  className="bg-red-600 text-white rounded-md px-2 py-1 ml-2">{vocher} off</span>}
        </div>    
        </figure >
            <div className="card-body relative">
                    <h2 className="card-title">{title}</h2>
                    <div className="flex justify-start items-center gap-3">
                        <span className="text-lg font-bold text-[var(--primary-color)]">${price}</span>
                        <span className="text-md text-gray-500 line-through">$1099</span>
                    </div>
                    <div>
                        <div className="rating rating-sm">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({ratingCount})</span>
                    </div>
            </div>
    </div>
  );
};

export default Card;
