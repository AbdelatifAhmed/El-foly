import { Category, UserIcon } from "@/lib/types";
import { Camera, Headphones, Laptop, LogOut, Package, ShoppingBasket, Smartphone, Tablet, UserRoundPen, Watch } from "lucide-react";

export const userIconList: UserIcon[] = [
   {
      id: 1,
      icon: UserRoundPen,
      title: 'Profile',
      path: '/profile'
   },
   {
      id: 2,
      icon: ShoppingBasket,
      title: 'My Orders',
      path: '/my-orders'
   },
   {
      id: 3,
      icon: LogOut,
      title: 'Logout'
   }
];

export const categories: Category[] = [
   { id: "phones", name: "Phones", Icon: Smartphone },
   { id: "computers", name: "Computers", Icon: Laptop },
   { id: "watches", name: "Smart Watches", Icon: Watch },
   { id: "headphones", name: "Headphones", Icon: Headphones },
   { id: "accessories", name: "Accessories", Icon: Package },
   { id: "cameras", name: "Cameras", Icon: Camera },
   { id: "tablets", name: "Tablets", Icon: Tablet },
];
