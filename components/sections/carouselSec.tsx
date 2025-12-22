import { inter, poppins } from "@/app/layout";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Carousel = () => {
  return (
    <div className="carousel rounded-box w-full h-[400px] ">
      <div className="carousel-item w-full bg-black flex justify-between">
        <div className="w-1/2 flex flex-col justify-center items-start px-20 text-white space-y-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/apple-logo.svg"
              alt="Apple Logo"
              className="text-white"
              width={100}
              height={100}
            />
            <span
              className={`text-white ${poppins.variable} text-bold text-lg`}
            >
              IPhone 14 series
            </span>
          </div>
          <div className={`pl-4 ${inter.variable}`}>
            <h1 className="text-5xl font-bold leading-snug">
              Up to 10% <br />
              off voucher
            </h1>
          </div>
          <div className="pl-4">
            <div className=" underline underline-offset-8 text-white  border-0 group">
              <Link
                href="#"
                className="flex items-center px-4 py-2 font-medium text-lg group-hover:translate-x-2 transition-all duration-150"
              >
                <span className="mr-3">Shop Now</span>
                <span>
                  <ArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className=" w-1/2 flex items-center justify-center">
          <Image
            src="/images/iphone-hero.png"
            className=""
            alt="iphone Hero"
            width={600}
            height={300}
          />
        </div>
      </div>

      <div className="carousel-item w-full bg-black flex-row-reverse justify-between">
        <div className="w-1/2 flex flex-col justify-center items-start px-20 text-white space-y-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/apple-logo.svg"
              alt="Apple Logo"
              className="text-white"
              width={100}
              height={100}
            />
            <span
              className={`text-white ${poppins.variable} text-bold text-lg`}
            >
              IPhone 14 series
            </span>
          </div>
          <div className={`pl-4 ${inter.variable}`}>
            <h1 className="text-5xl font-bold leading-snug">
              All colors you want  <br />
              in one place
            </h1>
          </div>
          <div className="pl-4">
            <div className=" underline underline-offset-8 text-white  border-0 group">
              <Link
                href="#"
                className="flex items-center px-4 py-2 font-medium text-lg group-hover:translate-x-2 transition-all duration-150"
              >
                <span className="mr-3">Shop Now</span>
                <span>
                  <ArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className=" w-1/2 flex items-center justify-center">
          <Image
            src="/images/iphone-hero2.png"
            className=""
            alt="iphone Hero"
            width={800}
            height={400}
          />
        </div>
      </div>


      <div className="carousel-item w-full bg-black flex justify-between">
        <div className="w-1/2 flex flex-col justify-center items-start px-20 text-white space-y-3">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/samsung-logo.svg"
              alt="Samsung Logo"
              width={200}
              height={200}
            />
            <span
              className={`text-white ${poppins.variable} text-bold text-lg`}
            >
                Galaxy S series
            </span>
          </div>
          <div className={`pl-4 ${inter.variable}`}>
            <h1 className="text-5xl font-bold leading-snug">
              Up to 10% <br />
              off voucher
            </h1>
          </div>
          <div className="pl-4">
            <div className=" underline underline-offset-8 text-white  border-0 group">
              <Link
                href="#"
                className="flex items-center px-4 py-2 font-medium text-lg group-hover:translate-x-2 transition-all duration-150"
              >
                <span className="mr-3">Shop Now</span>
                <span>
                  <ArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className=" w-1/2 flex items-center justify-center">
          <Image
            src="/images/samsung-hero.png"
            className=""
            alt="Samsung Hero"
            width={900}
            height={1200}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
