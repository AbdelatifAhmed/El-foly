"use client";
import React, { useEffect, useState } from "react";

const FlashCounter = () => {
  const [isClient, setIsClient] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsClient(true);
    const target = localStorage.getItem("flash-sale-end");

    let targetDate: number;
    if (target) {
      targetDate = parseInt(target, 10);
    } else {
      targetDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem("flash-sale-end", targetDate.toString());
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return <div className="h-16"></div>;

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-start">
      <span className="text-[10px] md:text-xs font-bold text-black mb-1">{label}</span>
      <span className="countdown font-inter font-bold text-2xl md:text-3xl lg:text-4xl">
        <span style={{ "--value": value } as React.CSSProperties}></span>
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-3 md:gap-5 lg:gap-8">
      <TimeUnit label="Days" value={timeLeft.days} />
      
      <div className="text-xl md:text-2xl text-[#E07575] self-end mb-1 md:mb-2">:</div>
      
      <TimeUnit label="Hours" value={timeLeft.hours} />
      
      <div className="text-xl md:text-2xl text-[#E07575] self-end mb-1 md:mb-2">:</div>
      
      <TimeUnit label="Minutes" value={timeLeft.minutes} />
      
      <div className="text-xl md:text-2xl text-[#E07575] self-end mb-1 md:mb-2">:</div>
      
      <TimeUnit label="Seconds" value={timeLeft.seconds} />
    </div>
  );
};

export default FlashCounter;