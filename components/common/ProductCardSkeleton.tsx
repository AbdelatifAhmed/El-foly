export const ProductCardSkeleton = () => {
  return (
    <div className="card card-compact bg-white w-full max-w-87 border border-gray-100 shadow-sm">
      <div className="skeleton w-full h-64 rounded-none rounded-t-lg"></div>
      <div className="card-body p-4 gap-3">
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-6 w-1/4"></div>
      </div>
    </div>
  );
};