// Import Swiper React components
"use client";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Card from "../common/card";
import { useFlashSales } from "@/hooks/useFlashSales";
import { Product } from "@/lib/types";

export default function ImageSwiper() {
  const { flashSales , isLoading, error} = useFlashSales();
  if (isLoading) return <div>Loading...</div>;
  if (error) console.log(error);
  return (
    <Swiper
      modules={[Navigation, A11y]}
      navigation={{
        nextEl: ".today-swiper-next",
        prevEl: ".today-swiper-prev",
      }}
      freeMode
      breakpoints={{
        1280:{
          slidesPerView: 4,
          spaceBetween: 20,
        },
        780:{
          slidesPerView: 2,
          spaceBetween: 15,
        },
        640:{
          slidesPerView: 1,
          spaceBetween: 10,
        },

      }}
    >
      {flashSales.map((item : Product) => (
        <SwiperSlide key={item.id} className="py-5">
          <Card
            {...item}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
