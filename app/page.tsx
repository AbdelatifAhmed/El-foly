import SliderCategory from "@/components/sections/sliderCategorySec";
import Carousel from "@/components/sections/carouselSec";
import TodayImageSwiper from "@/components/sections/todayImageSwiperSec";
import BestSellingSec from "@/components/sections/BestSellingSec";
import OurProductSec from "@/components/sections/OurProductSec";
import Services from "@/components/common/services";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="mt-30 px-40">
        <Carousel />
      </section>
      {/* Categories */}
      <section className="px-40">
        <div className="mt-5">
          <p className="title-line">Categories</p>
          <SliderCategory />
        </div>
      </section>
      {/* Today's Flash Sales */}
      <section className="px-40">
        <TodayImageSwiper />
      </section>

      <section>
       
      </section>
      {/* Best Selling Products */}
      <section className="px-40 mb-5">
        <BestSellingSec />
      </section>
      {/* Our Products */}
      <section className=" px-40 mb-5">
        <OurProductSec />
      </section>

      <section className="px-40">
        <Services />
      </section>
    </main>
  );
}
