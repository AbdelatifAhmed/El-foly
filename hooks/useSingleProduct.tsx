import { useState, useEffect } from "react";
import { getSingleProduct } from "@/lib/API";
import { ProductDetails } from "@/lib/types";

export const useSingleProducts = (id: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true); 
      try {
        const data = await getSingleProduct(id);
        
        setProduct(data); 
        
        setError(null);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  return { product, isLoading, error };
};