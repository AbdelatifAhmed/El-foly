import { useState, useEffect } from "react";
import {  getBestSellingProducts, getOurProducts } from '@/lib/API';

export const useBestSellings = () => {
  const [BestSelling, setBestSelling ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBestSellingProducts();
        setBestSelling(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { BestSelling, isLoading, error };
};