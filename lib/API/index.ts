import api from "@/lib/axios";

export const getBanners = async () => {
  const res = await api.get("/banners");
  return res.data.data; 
};