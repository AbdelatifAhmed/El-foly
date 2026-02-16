import Card from "../common/card";
import Button from "../common/Button";
import { useBestSellings } from "@/hooks/useBestSellings";
import { Product } from "@/lib/types";
const BestSellingSec = () => {
  const {BestSelling , isLoading , error } = useBestSellings()
  if (isLoading) return <p>Loading...</p>;
  if (error) console.log(error);
  
  return (
    <>
      <p className="title-line">This month</p>
      <div className="flex justify-between items-center">
        <p className="head-line">Best Selling Products</p>
        <Button Title="View All" />
      </div>
      <div className="grid grid-cols-2 lg:flex lg:flex-nowrap gap-1 mt-5">
        {BestSelling.map((item: Product) => (
        <Card
          {...item}
          key={item.id}
        />
      ))}
      </div>
    </>
  );
};

export default BestSellingSec;
