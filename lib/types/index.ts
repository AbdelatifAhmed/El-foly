import { LucideIcon } from "lucide-react";

// types/images.ts
export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export type CardType = {
    id?: string;
    title: string;
    price: number;
    image: string;
    isNew?: boolean;
    vocher?: string;
    rating?: number;
    ratingCount?: number;
};

export interface UserIcon {
    id: number;
    icon: LucideIcon;
    title: string;
}