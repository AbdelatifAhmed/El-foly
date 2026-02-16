import { useState, useEffect } from "react";
import {  getOurProducts } from '@/lib/API';

export const useFlashSales = () => {
  const [flashSales, setFlashSales ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getOurProducts();
        setFlashSales(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { flashSales, isLoading, error };
};