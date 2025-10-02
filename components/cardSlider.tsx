"use client";

import { useState } from "react";
import Card from "./card";
import { CardType } from "./card";

type CardSliderProps = {
  cards: CardType[];
};

export default function CardSlider({ cards }: CardSliderProps) {
  const visibleCount = 4; // ✅ always 4 per viewport
  const [currentIndex, setCurrentIndex] = useState(0);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < cards?.length - visibleCount;

  const prev = () => canPrev && setCurrentIndex((i) => i - 1);
  const next = () => canNext && setCurrentIndex((i) => i + 1);

  return (
    <div className="w-full px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Browse Products</h2>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={!canPrev}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={next}
            disabled={!canNext}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(100 / visibleCount) * currentIndex}%)`,
            width: `${(cards.length / visibleCount) * 100}%`,
          }}
        >
          {cards?.map((card) => (
            <div key={card.id} className="w-1/4 px-2"> 
              {/* ✅ w-1/4 ensures exactly 4 cards fit in 100% width */}
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>

      {/* View all button */}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg">
          View All Products
        </button>
      </div>
    </div>
  );
}
