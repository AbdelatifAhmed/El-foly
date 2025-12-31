import {ProductCardSkeleton} from "@/components/common/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="skeleton h-8 w-48 mb-10"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}