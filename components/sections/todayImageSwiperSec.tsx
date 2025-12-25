import { ChevronLeft, ChevronRight } from "lucide-react";
import FlashCounter from "../UI/flashCounter";
import ImageSwiper from "../UI/ImageSwiper";
import Button from "../common/Button";
const TodayImageSwiper = () => {
  return (
    <div>
      <div className="my-5">
        <p className="title-line">Today&apos;s</p>
        <div className="flex justify-between items-start lg:items-center ">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
            <p className="head-line">Falsh sales</p>
            <FlashCounter />
          </div>
          <div className="flex gap-3">
            <button
              aria-label="Previous"
              className={`today-swiper-prev p-2 rounded-full bg-gray-200 hover:bg-gray-300`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next"
              className={`today-swiper-next p-2 rounded-full bg-gray-200 hover:bg-gray-300`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
      <ImageSwiper />
      <div className="flex justify-center items-center">
       <Button Title='View All Products'/>
      </div>
    </div>
  );
};

export default TodayImageSwiper;
