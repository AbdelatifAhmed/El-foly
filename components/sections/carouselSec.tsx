'use client';
import { useBanners } from "@/hooks/useBanners";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Carousel = () => {
  const { banners, isLoading, error } = useBanners();

  if (isLoading) return <div className="flex items-center justify-center mt-20"><div className="loading loading-ring loading-lg "></div>;</div>;
  if (error) return <div>Error loading banners</div>;

  console.log(banners);
  return (
    <div className="carousel rounded-box w-full h-75 md:h-100 lg:h-112 shadow-xl">
      
      {[
        { id: 1, title: "IPhone 14 series", img: "/images/iphone-hero.png", logo: "/images/apple-logo.svg", text: "Up to 10% off voucher", reverse: false },
        { id: 2, title: "IPhone 14 series", img: "/images/iphone-hero2.png", logo: "/images/apple-logo.svg", text: "All colors you want in one place", reverse: true },
        { id: 3, title: "Galaxy S series", img: "/images/samsung-hero.png", logo: "/images/samsung-logo.svg", text: "Up to 10% off voucher", reverse: false },
      ].map((slide) => (
        <div 
          key={slide.id} 
          className={`carousel-item w-full bg-black flex flex-col md:flex-row ${slide.reverse ? 'md:flex-row-reverse' : ''} justify-between overflow-hidden`}
        >
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-6 md:px-12 lg:px-20 text-white space-y-4 md:space-y-6 py-8 md:py-0">
            <div className="flex items-center gap-3">
              <Image
                src={slide.logo}
                alt="Brand Logo"
                width={40} 
                height={40}
                className="w-8 h-8 md:w-12 md:h-12 object-contain"
              />
              <span className={`text-white font-medium text-sm md:text-lg`}>
                {slide.title}
              </span>
            </div>
            
            <div className={`text-center md:text-left`}>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight md:leading-snug">
                {slide.text.split('  ').map((t, i) => <React.Fragment key={i}>{t} <br className="hidden md:block" /></React.Fragment>)}
              </h1>
            </div>

            <div className="flex justify-center md:justify-start">
              <Link
                href="#"
                className="flex items-center group border-b border-white pb-1 hover:text-white transition-all duration-150"
              >
                <span className="mr-2 font-medium text-sm md:text-lg">Shop Now</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
            <div className="relative w-full h-full max-h-50 md:max-h-full flex justify-center">
              <Image
                src={slide.img}
                alt="Hero Product"
                width={600}
                height={400}
                className="object-contain w-auto h-full"
                priority
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;