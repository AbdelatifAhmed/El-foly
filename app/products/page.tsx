'use client';
import { useState } from "react";
import Card from "@/components/common/card";
import { useAllProducts } from "@/hooks/useAllProducts";
import { Product } from "@/lib/types";
import { FilterContent } from "@/components/UI/FilterContent";
import { SlidersHorizontal, X } from "lucide-react";


export default function ProductsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand_id: "",
    category_id: "",
    in_stock: false,
    is_new: false,
    has_discount: false,
    min_price: 0,
    max_price: 100000,
    sort_by: "created_at",
    sort_order: "desc"
  });

  const { products, isLoading, error } = useAllProducts(filters);

  return (
    <div className="container mx-auto px-4 py-10 lg:py-20 min-h-screen lg:mt-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
           <div className="text-sm text-gray-400 mb-2">Home / <span className="text-black font-medium">All Products</span></div>
           <h1 className="text-2xl font-black uppercase tracking-tighter">Explore Our Products</h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium texte-slate-400 whitespace-nowrap hidden md:block">Sort By:</span>
          <select 
            className="select select-bordered select-sm w-full md:w-auto font-medium"
            onChange={(e) => {
              const [by, order] = e.target.value.split('-');
              setFilters({ ...filters, sort_by: by, sort_order: order });
            }}
          >
            <option value="created_at-desc">Newest Arrivals</option>
            <option value="created_at-asc">Oldest First</option>
            <option value="product_name-asc">Name (A-Z)</option>
            <option value="product_name-desc">Name (Z-A)</option>
            <option value="rating-desc">Best Rating</option>
            <option value="rating-asc">Lowest Rating</option>
          </select>
          
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="btn btn-sm lg:hidden bg-(--primary-color) border-none text-white flex items-center gap-2"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        <aside className="hidden lg:block w-72 shrink-0 sticky top-24 h-fit  px-5 py-2 rounded-2xl">
          <FilterContent filters={filters} setFilters={setFilters} />
        </aside>

        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
               {[...Array(8)].map((_, i) => (
                 <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-2xl"></div>
               ))}
            </div>
          ) : error ? (
            <div className=" min-h-screen flex items-center justify-center">{error}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products?.map((item: Product) => (
                <Card key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`fixed inset-0 z-100 lg:hidden transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} mb-14`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsDrawerOpen(false)}></div>
        <div className="absolute left-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black">FILTERS</h2>
            <button onClick={() => setIsDrawerOpen(false)}><X /></button>
          </div>
          <FilterContent filters={filters} setFilters={setFilters} />
        </div>
      </div>

    </div>
  );
}