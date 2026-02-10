'use client';

import Card from "@/components/common/card";
import { templateImages } from "@/constant/constants";
import { useAllProducts } from "@/hooks/useAllProducts";
import { Product } from "@/lib/types";


export default function ProductsPage() {
    const { products , isLoading , error} = useAllProducts()
    if(isLoading) {
        <div className="flex items-center justify-center mt-20">
            <div className="loading loading-ring loading-lg "></div>;
        </div>
    }

    if(error) {
        return <div>Error loading products</div>
    }
    products.map((item: any) => console.log(item))
    

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-400 mb-10">
                <span>Home / </span>
                <span className="text-black font-medium">All Products</span>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Sidebar Filters (Optional) */}
                <aside className="w-full md:w-64 hidden md:block">
                    <h3 className="font-bold text-lg mb-4 underline decoration-primary underline-offset-8">Categories</h3>
                    <ul className="space-y-3 text-gray-600">
                        <li className="hover:text-primary cursor-pointer transition-colors">Electronics</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Home & Lifestyle</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Medicine</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Sports & Outdoor</li>
                    </ul>
                </aside>

                {/* Products Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((item : Product) => (
                            <Card key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}