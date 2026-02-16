'use client';
import Button from "@/components/common/Button";
import Card from "@/components/common/card";
import { useWishlistStore } from "@/store/wishlist.store";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
    const { wishlist } = useWishlistStore();

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen mt-5 ">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl font-bold font-poppins">Wishlist ({wishlist.length})</h1>
                <Link href="/">
                    <Button Title="Back to Shop" />
                </Link>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-20">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-6">Your wishlist is empty.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <Card 
                            key={product.id} 
                            {...product} 
                            isWishlistPage={true} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}