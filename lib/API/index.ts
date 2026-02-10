import api from "@/lib/axios";

export const getBanners = async () => {
  const res = await api.get("/banners");
  return res.data.data; 
};
export const getAllCategories = async () => {
  const res = await api.get("/categories");
  return res.data.data; 
};
export const getAllProducts = async () => {
  const res = await api.get("/products/get-products");
  return res.data.data; 
};


