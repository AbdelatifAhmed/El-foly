// components/CategorySlider.tsx
"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { categories } from "@/constant/constants";
import  { getWindowDimensions } from "@/hooks/useWindowDimensions ";


export default function CategorySlider() { 

  const { width } = getWindowDimensions();
  const [visibleCount, setVisibleCount] = useState<number>(5); // always show 5 items
  useEffect(() => {
    if (width < 780) {
      setVisibleCount(1);
    } else if (width < 1280) {
      setVisibleCount(3);
    } else {
      setVisibleCount(5);
    }
  }, [width]);
  const total = categories.length;
  const visible = Math.min(visibleCount, total);
  const centerSlot = Math.floor(visible / 2);
  const maxStart = Math.max(0, total - visible);

  const [start, setStart] = useState(0);
  const activeIndex = Math.min(total - 1, start + centerSlot);
  const itemWidthPercent = 100 / visible;

  const canPrev = start > 0;
  const canNext = start < maxStart;

  const prev = () => canPrev && setStart((s) => s - 1);
  const next = () => canNext && setStart((s) => s + 1);

  return (
    <div className="w-full ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="head-line ">Browse By Category</h2>
        <div className="flex gap-2">
          <button
            aria-label="Previous"
            onClick={prev}
            disabled={!canPrev}
            className={`p-2 rounded-full ${
              canPrev
                ? "bg-gray-200 hover:bg-gray-300"
                : "bg-gray-100 opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            disabled={!canNext}
            className={`p-2 rounded-full ${
              canNext
                ? "bg-gray-200 hover:bg-gray-300"
                : "bg-gray-100 opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${start * itemWidthPercent}%)` }}
        >
          {categories.map((cat, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={cat.id}
                style={{ flex: `0 0 ${itemWidthPercent}%` }}
                className="flex flex-col items-center justify-center p-4"
              >
                <div
                  className={`flex flex-col items-center justify-center w-36 h-36 rounded-full shadow-lg transition-all duration-300 ${
                    isActive
                      ? `bg-(--primary-color) text-white scale-110 -translate-y-2 ring-4 ring-green-200/40`
                      : "bg-white text-gray-700"
                  }`}
                >
                  <cat.Icon size={36} />
                  <p
                  className={`mt-3 transition-all ${
                    isActive
                      ? "text-white-600 text-md font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {cat.name}
                </p>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
