'use client';
import { useParams } from "next/navigation";
import { templateImages } from "@/constant/constants"; 
import Image from "next/image";
import { Heart, Truck, RotateCcw, Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import Link from "next/link";
import { useRef, useState } from "react";

const ProductPage = () => {
    const params = useParams();
    const id = params.id; 

    const product = templateImages.find((item) => item.id === Number(id));
    const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });
    const imgRef = useRef<HTMLDivElement>(null);
    const [quantity, setQuantity] = useState(1);

    const addToCart = useCartStore((state) => state.addToCart);
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const wishlist = useWishlistStore((state) => state.wishlist);

    const isLiked = wishlist.some((item) => item.id === product?.id);
    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    // 3. منطق تكبير الصورة عند الهوفر
    const handleMouseMove = (e: React.MouseEvent) => {
        const { left, top, width, height } = imgRef.current!.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomStyle({
            display: 'block',
            backgroundPosition: `${x}% ${y}%`,
        });
    };

    if (!product) {
        return (
            <div className="container mx-auto py-20 text-center min-h-screen flex flex-col items-center justify-center gap-3">
                <ShoppingCart size={300} className="text-gray-300 mb-6" />
                <h2 className="text-2xl font-bold">Product not found!</h2>
                <p>
                    The product you are looking for does not exist or has been removed.
                </p>
                <button className="btn bg-[var(--primary-color)]/90 hover:bg-transparent border border-[var(--primary-color)] hover:text-[var(--primary-color)] text-white px-8">
                    <Link href="/products">Back to Products</Link>
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20 lg:py-32">
            <div className="flex flex-col lg:flex-row gap-12">
                
                <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col gap-4 overflow-x-auto">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-24 h-24 bg-[#F5F5F5] rounded p-2 cursor-pointer border hover:border-primary shrink-0">
                                <Image src={product.image} alt="thumb" width={80} height={80} className="object-contain h-full w-full" />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row gap-4">
                    <div 
                        className="relative bg-[#F5F5F5] rounded-lg flex items-center justify-center p-10 cursor-zoom-in overflow-hidden group"
                        ref={imgRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setZoomStyle({ ...zoomStyle, display: 'none' })}
                    >
                        <Image 
                            src={product.image} 
                            alt={product.title} 
                            width={450} height={450} 
                            className="object-contain transition-opacity group-hover:opacity-0" 
                        />
                        
                        {/* عدسة التكبير الخلفية */}
                        <div 
                            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                            style={{
                                ...zoomStyle,
                                backgroundImage: `url(${product.image})`,
                                backgroundSize: '180%', // نسبة التكبير
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </div>
                </div>
                </div>

                {/* 2. Product Info */}
                <div className="flex-1 flex flex-col gap-6">
                    <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                    
                    <div className="flex items-center gap-4 border-b pb-4">
                        <div className="flex text-[#FFAD33]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm">({product.ratingCount} Reviews)</span>
                        <span className="text-[#00FF66] text-sm border-l pl-4 font-medium">In Stock</span>
                    </div>

                    <div className="text-2xl font-semibold">${product.price}</div>
                    
                    <p className="text-sm text-gray-700 leading-relaxed italic">
                        The ultimate experience in high-quality sound and comfort. Designed for long hours of use with premium materials.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex border rounded-md overflow-hidden border-black/30">
                            <button className="px-4 py-2 hover:bg-primary hover:text-white transition-colors border-r border-black/30">-</button>
                            <div className="px-6 py-2 font-bold flex items-center">1</div>
                            <button className="px-4 py-2 hover:bg-primary hover:text-white transition-colors border-l border-black/30">+</button>
                        </div>
                        
                        <button 
                            onClick={() => addToCart(product)}
                            className="px-10 py-3 bg-(--primary-color) text-white font-bold rounded-md hover:bg-opacity-90 transition-all active:scale-95 flex-1 md:flex-none"
                        >
                            Buy Now
                        </button>

                        <button 
                            onClick={() => toggleWishlist(product)}
                            className={`p-3 border rounded-md transition-all group ${isLiked ? 'bg-primary border-primary text-white' : 'border-black/30 hover:border-primary'}`}
                        >
                            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-10 border border-black/30 rounded-md divide-y divide-black/30">
                        <div className="p-5 flex gap-4 items-center">
                            <Truck size={35} />
                            <div>
                                <h4 className="font-bold text-base">Free Delivery</h4>
                                <p className="text-xs font-medium underline cursor-pointer">Enter your postal code for Delivery Availability</p>
                            </div>
                        </div>
                        <div className="p-5 flex gap-4 items-center">
                            <RotateCcw size={35} />
                            <div>
                                <h4 className="font-bold text-base">Return Delivery</h4>
                                <p className="text-xs font-medium">Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;