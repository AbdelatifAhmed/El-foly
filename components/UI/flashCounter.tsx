"use client";
import React, { useEffect, useState } from "react";

const FlashCounter = () => {
  // State for countdown values
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Check if we already have a target date in localStorage
    const target = localStorage.getItem("flash-sale-end");

    let targetDate: number;
    if (target) {
      targetDate = parseInt(target, 10);
    } else {
      // Default: 3 days from now (for testing)
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
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-flow-col gap-5 text-center justify-center items-center">
      <div className="flex flex-col p-2 bg-white rounded-box ">
        Days
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeLeft.days } as React.CSSProperties}
          ></span>
        </span>
      </div>

        <div className="text-3xl text-red-700">:</div>
      <div className="flex flex-col p-2 bg-white rounded-box ">
        Hours
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeLeft.hours } as React.CSSProperties}
          ></span>
        </span>
        
      </div>
        <div className="text-3xl text-red-700">:</div>
      <div className="flex flex-col p-2 bg-white rounded-box ">
        Minute
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeLeft.minutes } as React.CSSProperties}
          ></span>
        </span>
        
      </div>
        <div className="text-3xl text-red-700">:</div>

      <div className="flex flex-col p-2 bg-white rounded-box font-weight-bold">
        Seconds
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeLeft.seconds } as React.CSSProperties}
          ></span>
        </span>
        
      </div>
    </div>
  );
};

export default FlashCounter;
