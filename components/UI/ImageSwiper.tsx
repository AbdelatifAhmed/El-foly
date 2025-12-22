// Import Swiper React components
"use client";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Card from "../common/card";
import { templateImages } from "../../constant/constants";
export default function ImageSwiper() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, A11y]}
      spaceBetween={20}
      slidesPerView={4}
      navigation={{
        nextEl: ".today-swiper-next",
        prevEl: ".today-swiper-prev",
      }}
      freeMode
    >
      {templateImages.map((item) => (
        <SwiperSlide key={item.id} className="py-5">
          <Card
            title={item.title}
            price={item.price}
            image={item.image}
            isNew={item.isNew}
            vocher={item.vocher}
            rating={item.rating}
            ratingCount={item.ratingCount}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
