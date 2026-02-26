export const DualRangeSlider = ({ min, max, filters, setFilters }: any) => {
  
  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), filters.max_price - 500);
    setFilters((prev: any) => ({ ...prev, min_price: value }));
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), filters.min_price + 500);
    setFilters((prev: any) => ({ ...prev, max_price: value }));
  };

  return (
    <div className="flex flex-col w-full gap-4 py-4">
      <div className="relative w-full h-6">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-base-300 rounded-lg"></div>
        
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-primary rounded-lg z-10"
          style={{ 
            left: `${(filters.min_price / max) * 100}%`, 
            right: `${100 - (filters.max_price / max) * 100}%` 
          }}
        ></div>

        <input
          type="range" min={min} max={max} value={filters.min_price} onChange={handleMin}
          className="range-input  absolute top-0 w-full bg-transparent appearance-none pointer-events-none z-20 h-6 cursor-pointer"
        />
        <input
          type="range" min={min} max={max} value={filters.max_price} onChange={handleMax}
          className="range-input absolute top-0 w-full bg-transparent appearance-none pointer-events-none z-30 h-6 cursor-pointer"
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className="badge badge-sm badge-ghost p-3 font-mono">EGP {filters.min_price}</span>
        <span className="badge badge-sm badge-ghost p-3 font-mono">EGP {filters.max_price}</span>
      </div>

      <style jsx>{`
        .range-input::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 18px;
          height: 18px;
          background: #17a26a;
          border: 3px solid #17a26a; 
          border-radius: 50%;
        }
        .range-input::-moz-range-thumb {
          pointer-events: auto;
          width: 14px;
          height: 14px;
          background: #17a26a;
          border: 3px solid #17a26a;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};