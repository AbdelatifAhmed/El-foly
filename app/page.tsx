import Card from "@/components/card";
import CardSlider from "@/components/cardSlider";
import FlashCounter from "@/components/flashCounter";
import SliderCategory from "@/components/sliderCategory";
import Carousel from "@/UI/carousel";
import Footer from "@/UI/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
    <section className="mt-30 px-32">
      <Carousel />
    </section>
    {/* Categories */}
    <section className="px-32">
      <div className="mt-5">
        <p className="title-line">Categories</p>
        <SliderCategory />
      </div> 
    </section>
    {/* Flash Sales */}
    <section className="px-32">
      <div className="mt-5">
        <p className="title-line">Today&apos;s</p>
        <div className="flex justify-between items-center mb-5">
        <p className="head-line">Falsh sales</p>
        <FlashCounter />
        </div>
    
        <CardSlider />
      
      </div> 
    </section>
    <Footer />
    
    </main>
  );
}
