// Import Swiper React components
"use client";
import { Navigation, Grid, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import Card from "../common/card";
import { templateImages } from "../../constant/constants";
export default function AllImageSwiper() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, A11y, Grid]}
      spaceBetween={20}
      slidesPerView={4}
      navigation={{
        nextEl: ".ourProduct-swiper-next",
        prevEl: ".ourProduct-swiper-prev",
      }}
      grid={{
        rows: 2,
        fill: "row",
      }}
      freeMode
    >
      {templateImages.map((item) => (
        <SwiperSlide key={item.id} className="py-5">
          <Card
            id={item.id}
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
