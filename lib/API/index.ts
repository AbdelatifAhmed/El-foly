import api from "@/lib/axios";

export const getBanners = async () => {
  const res = await api.get("/banners");
  return res.data.data; 
};
export const getAllCategories = async () => {
  const res = await api.get("/categories");
  return res.data.data; 
};
export const getAllProducts = async (url : string = '') => {
  const res = await api.get(`/products/get-products${url ? `?${url}` : ''}`);
  return res.data.data; 
};
export const getOurProducts = async () => {
  const res = await api.get("/products/explore-our-products");
  return res.data.data; 
};
export const getBestSellingProducts = async () => {
  const res = await api.get("/products/best-selling-products");
  return res.data.data; 
};
export const getFlashSales = async () => {
  const res = await api.get("/discounts/flash-sales");
  return res.data.data; 
};
export const getSingleProduct = async (id : string) => {
  const res = await api.get(`/products/get-product/${id}`);
  return res.data.data; 
};
export const getCategories = async () => {
  const res = await api.get(`/categories`);
  return res.data.data; 
};
export const getBrands = async () => {
  const res = await api.get(`/brands`);
  return res.data.data; 
};







