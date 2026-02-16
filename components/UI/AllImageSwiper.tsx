// Import Swiper React components
"use client";
import { Navigation, Grid, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import Card from "../common/card";
import { useOurProducts } from "@/hooks/useOurProducts";
import { Product } from "@/lib/types";
export default function AllImageSwiper() {
  const {ourProducts , isLoading, error} = useOurProducts();
  if (isLoading) return <div>Loading...</div>;
  if (error) console.log(error);
  return (
    <Swiper
      modules={[Navigation, A11y, Grid]}
      navigation={{
        nextEl: ".ourProduct-swiper-next",
        prevEl: ".ourProduct-swiper-prev",
      }}
   
      freeMode
      breakpoints={{
       1280:{
          slidesPerView: 4,
          spaceBetween: 20,
          grid: {
            rows: 2,
            fill: "row"
          },
        },
        780:{
          slidesPerView: 2,
          spaceBetween: 15,
          grid: {
            rows: 2,
            fill: "row"
          },
        },
        640:{
          slidesPerView: 1,
          spaceBetween: 10,
          grid: {
            rows: 1,
            fill: "row"
          },
        },

      }}
    >
      {ourProducts.map((item: Product) => (
        <SwiperSlide key={item.id} className="py-5">
          <Card
            {...item}
            key={item.id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
