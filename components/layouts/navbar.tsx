"use client";
import { userIconList } from "@/constant/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Heart, ShoppingCart, Menu } from "lucide-react"; // استخدام أيقونات متناسقة

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    // 1. تغيير px-32 إلى px-4 في الموبايل و px-32 في الشاشات الكبيرة
    <nav className="navbar fixed top-0 left-0 right-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-4 md:px-10 lg:px-32 transition-all">
      
      {/* --- الجزء الأيسر: Mobile Menu + Logo --- */}
      <div className="navbar-start gap-2">
        {/* زر المنيو للموبايل - يظهر فقط في lg:hidden */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Menu className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-gray-100"
          >
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/signup">Sign Up</Link></li>
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/elfoly-logo.svg"
            alt="Logo"
            width={60} 
            height={60}
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </Link>
      </div>

      {/* --- الجزء الأوسط: Links (Desktop Only) --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-8 font-medium">
          <li>
            <Link href="/" className={`hover:text-primary transition-colors ${pathname === "/" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={`hover:text-primary transition-colors ${pathname === "/about" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`hover:text-primary transition-colors ${pathname === "/contact" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/signup" className={`hover:text-primary transition-colors ${pathname === "/signup" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2 md:gap-4">
  {/* 1. منطقة البحث - تأخذ المساحة المتاحة وتدفع الأيقونات لليمين */}
  <div className="hidden sm:flex items-center relative flex-1 justify-end max-w-md">
    <div className="relative w-full max-w-[280px]">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="input input-bordered input-sm w-full rounded-full pl-10 bg-gray-50 focus:bg-white transition-all"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-1" />
    </div>
  </div>

  <div className="flex items-center gap-1 md:gap-3 bg-gray-100/50 p-1 rounded-full px-2 md:px-4">
    
    {/* Wishlist */}
    <div className="indicator cursor-pointer p-2 hover:bg-white rounded-full transition-colors group">
      <Heart className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-primary" />
      <span className="badge badge-secondary badge-xs px-1 indicator-item">0</span>
    </div>

    {/* Cart */}
    <div className="indicator cursor-pointer p-2 hover:bg-white rounded-full transition-colors group">
      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-primary" />
      <span className="badge badge-primary badge-xs px-1 indicator-item">3</span>
    </div>

    {/* divider */}
    <div className="w-[1px] h-6 bg-gray-300 mx-1 hidden md:block"></div>

    {/* Profile */}
    <div className="relative">
      <div 
        className="avatar cursor-pointer hover:ring-2 ring-primary ring-offset-2 rounded-full transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full">
          <Image 
             src="/icons/user-circle-fill.svg" 
             alt="User" 
             width={40} 
             height={40} 
          />
        </div>
      </div>
      {isOpen && (
            <ul className="absolute top-full right-0 mt-4 p-2 shadow-2xl bg-white border border-gray-100 rounded-xl w-56 z-[60] animate-in fade-in zoom-in duration-200">
              {userIconList.map((item) => (
                <li key={item.id} className="list-none">
                  <a className={`flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors
                    ${item.title === "Logout" ? "text-red-500 hover:bg-red-50" : "text-gray-700"}`}>
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform"/>
                    <span className="text-sm font-medium">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
    </div>
  </div>
</div>
    </nav>
  );
};

export default Navbar;