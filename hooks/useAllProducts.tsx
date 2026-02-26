import { useState, useEffect } from "react";
import { getAllProducts } from "@/lib/API";
import { Product } from "@/lib/types";

type Filter = {
  brand_id: string;
  category_id: string;
  in_stock: boolean;
  is_new: boolean;
  has_discount: boolean;
  min_price: number;
  max_price: number;
  sort_by: string;
  sort_order: string;
}

export const useAllProducts = (filters: Filter) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null); 
      
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== "" && value !== null && value !== undefined && value !== false) {
            params.append(key, value.toString());
          } else if (typeof value === 'boolean' && value ) {
            params.append(key, '1'); 
          }
        });


        
        const data = await getAllProducts(params.toString());
        setProducts(data || []); 
      } catch (err: any) {
        setError(err.response.data.message); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, isLoading, error };
};