import { useState, useEffect } from "react";
import {  getOurProducts } from '@/lib/API';

export const useOurProducts = () => {
  const [ourProducts, setOurProducts ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getOurProducts();
        setOurProducts(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { ourProducts, isLoading, error };
};