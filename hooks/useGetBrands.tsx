import { useState, useEffect } from "react";
import {  getBrands } from '@/lib/API';

export const useGetBrands = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    FetchBrands();
  }, []);

  return { brands, isLoading, error };
};