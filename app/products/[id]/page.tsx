'use client';
import { useParams } from "next/navigation";
import Image from "next/image";
import { Heart, Truck, Star, ShoppingCart, Check, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import Link from "next/link";
import { useRef, useState, useMemo } from "react";
import { useSingleProducts } from "@/hooks/useSingleProduct";

const ProductPage = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const { product, isLoading, error } = useSingleProducts(id) ;
    
    const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });
    const imgRef = useRef<HTMLDivElement>(null);
    const [quantity, setQuantity] = useState(1);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<string | null>(null);

    const addToCart = useCartStore((state) => state.addToCart);
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const wishlist = useWishlistStore((state) => state.wishlist);

    // تعيين القيم الافتراضية عند تحميل المنتج
    useMemo(() => {
        if (product) {
            setSelectedColor(product.available_options.colors[0]?.id);
            setSelectedStorage(product.available_options.storage[0]?.id);
        }
    }, [product]);

    const activeVariant = useMemo(() => {
        if (!product) return null;
        return product.variants.find(
            (v: any) => v.color.id === selectedColor && v.storage.id === selectedStorage
        ) || product.variants[0];
    }, [product, selectedColor, selectedStorage]);

    const isLiked = wishlist.some((item) => item.id === product?.id);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!imgRef.current) return;
        const { left, top, width, height } = imgRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomStyle({
            display: 'block',
            backgroundPosition: `${x}% ${y}%`,
        });
    };

    if (isLoading) return <div className="p-20 text-center">Loading Product...</div>;

    if (error) return <div>Error loading product</div>;

    if (!product) {
        return (
            <div className="container mx-auto py-20 text-center min-h-screen flex flex-col items-center justify-center gap-3">
                <ShoppingCart size={200} className="text-gray-300 mb-6" />
                <h2 className="text-2xl font-bold">Product not found!</h2>
                <button className="btn btn-primary mt-4">
                    <Link href="/products">Back to Products</Link>
                </button>
            </div>
        );
    }

    // صورة المنتج (استخدام الصورة الرئيسية أو صورة من الصور المتاحة)
    const mainImage = product.images[0] || "/placeholder.png";

    return (
        <div className="container mx-auto px-4 py-10 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* 1. Images Section */}
                <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col gap-4 overflow-x-auto">
                        {(product.images.length > 0 ? product.images : [mainImage]).map((img: string, i: number) => (
                            <div key={i} className="w-20 h-20 bg-[#F5F5F5] rounded p-2 cursor-pointer border hover:border-primary shrink-0">
                                <Image src={img} alt="thumb" width={80} height={80} className="object-contain h-full w-full" />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 relative bg-[#F5F5F5] rounded-lg flex items-center justify-center p-6 cursor-zoom-in overflow-hidden group h-125"
                        ref={imgRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setZoomStyle({ ...zoomStyle, display: 'none' })}
                    >
                        <Image 
                            src={mainImage} 
                            alt={product.product_name} 
                            fill
                            className="object-contain p-10 transition-opacity group-hover:opacity-0" 
                        />
                        <div 
                            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                            style={{
                                ...zoomStyle,
                                backgroundImage: `url(${mainImage})`,
                                backgroundSize: '200%',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </div>
                </div>

                {/* 2. Product Info */}
                <div className="flex-1 flex flex-col gap-4">
                    <div className="space-y-1">
                        <span className="text-primary font-bold text-sm uppercase tracking-widest">{product.brand.name}</span>
                        <h1 className="text-3xl font-black text-gray-900">{product.product_name}</h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex text-[#FFAD33]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill={i < Math.floor(product.reviews.statistics.average_rating) ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm">({product.reviews.statistics.total_reviews} Reviews)</span>
                        {activeVariant?.in_stock ? (
                            <span className="text-emerald-500 text-sm font-bold border-l pl-4">In Stock ({activeVariant.stock_quantity})</span>
                        ) : (
                            <span className="text-rose-500 text-sm font-bold border-l pl-4">Out of Stock</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-3xl font-black text-gray-900">EGP {activeVariant?.final_price.toLocaleString()}</div>
                        {product.discount.has_discount && (
                            <div className="text-xl text-gray-400 line-through">EGP {activeVariant?.sale_price.toLocaleString()}</div>
                        )}
                    </div>

                    <p className="text-gray-600 leading-relaxed border-b pb-6">
                        {product.description}
                    </p>

                    {/* Colors Selection */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-lg">Colours:</h3>
                        <div className="flex gap-3">
                            {product.available_options.colors.map((color: any) => (
                                <button
                                    key={color.id}
                                    onClick={() => setSelectedColor(color.id)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color.id ? 'border-black scale-110' : 'border-transparent'}`}
                                    style={{ backgroundColor: color.hex }}
                                >
                                    {selectedColor === color.id && <Check size={14} className={color.hex === '#000000' ? 'text-white' : 'text-black'} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Storage Selection */}
                    <div className="space-y-3 mt-2">
                        <h3 className="font-bold text-lg">Storage:</h3>
                        <div className="flex gap-3">
                            {product.available_options.storage.map((st: any) => (
                                <button
                                    key={st.id}
                                    onClick={() => setSelectedStorage(st.id)}
                                    className={`px-4 py-2 border rounded-md font-bold transition-all ${selectedStorage === st.id ? 'bg-black text-white border-black' : 'hover:border-black'}`}
                                >
                                    {st.capacity}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="flex border rounded-md overflow-hidden border-gray-300">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-gray-100 border-r">-</button>
                            <div className="px-6 py-2 font-bold flex items-center">{quantity}</div>
                            <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 hover:bg-gray-100 border-l">+</button>
                        </div>
                        
                        <button 
                            disabled={!activeVariant?.in_stock}
                            onClick={() => addToCart( product)}
                            className="px-10 py-3 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-all active:scale-95 flex-1 disabled:bg-gray-400"
                        >
                            Add to Cart
                        </button>

                        <button 
                            onClick={() => toggleWishlist(product)}
                            className={`p-3 border rounded-md transition-all ${isLiked ? 'bg-rose-500 border-rose-500 text-white' : 'hover:border-rose-500 hover:text-rose-500'}`}
                        >
                            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                        </button>
                    </div>

                    {/* Features/Trust Badges */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-xl bg-gray-50">
                        <div className="flex gap-3 items-center">
                            <Truck className="text-primary" />
                            <div>
                                <p className="font-bold text-sm">Free Delivery</p>
                                <p className="text-xs text-gray-500">Available for your area</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <ShieldCheck className="text-primary" />
                            <div>
                                <p className="font-bold text-sm">{product.warranty_months} Months Warranty</p>
                                <p className="text-xs text-gray-500">Official Brand Warranty</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Specifications Table */}
            {/* <div className="mt-20">
                <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(product?.specifications).map(([key, value]: any) => (
                        value && typeof value !== 'object' && (
                            <div key={key} className="flex justify-between p-4 border-b">
                                <span className="text-gray-500 capitalize">{key.replace('_', ' ')}</span>
                                <span className="font-bold">{String(value)}</span>
                            </div>
                        )
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default ProductPage;