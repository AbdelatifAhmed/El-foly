import { CardType } from "@/lib/types";
import {BestSellingProducts} from "../../constant/constants";
import Card from "../common/card";
import Button from "../common/Button";
const BestSellingSec = () => {
  return (
    <>
      <p className="title-line">This month</p>
      <div className="flex justify-between items-center">
        <p className="head-line">Best Selling Products</p>
        <Button Title="View All" />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-10 mt-5">
        {BestSellingProducts.map((item: CardType) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
          isNew={item.isNew}
          vocher={item.vocher}
          rating={item.rating}
          ratingCount={item.ratingCount}
        />
      ))}
      </div>
    </>
  );
};

export default BestSellingSec;
