'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

const CartDrawer = () => {
  const {
    cartItems,
    isOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCartStore();

  if (!isOpen) return null;

  return (
    // الحاوية الرئيسية: تغطي الشاشة بالكامل وتتحكم في الـ Z-Index
    <div className="fixed inset-0 z-[100] flex justify-end">
      
      {/* الخلفية المعتمة (Overlay) - تغلق القائمة عند الضغط عليها */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={toggleCart}
        aria-hidden="true"
      ></div>

      {/* جسم القائمة الجانبية - ينزلق من اليمين */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* 1. رأس القائمة (Header) */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Shopping Cart
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 2. جسم القائمة (قائمة المنتجات) */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {cartItems.length === 0 ? (
            // حالة السلة الفارغة
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCart className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button onClick={toggleCart} className="mt-6 btn btn-primary btn-sm rounded-full px-6">
                Continue Shopping
              </button>
            </div>
          ) : (
            // قائمة المنتجات
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
                  {/* صورة المنتج */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
                      <p className="text-sm font-bold text-primary mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* التحكم في الكمية والحذف */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-full bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-l-full disabled:opacity-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-r-full transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-50 rounded-full group transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 3. ذيل القائمة (Footer) - يظهر فقط إذا كانت السلة ممتلئة */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-medium text-gray-600">Subtotal:</span>
              <span className="text-2xl font-extrabold text-gray-900">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                className="btn btn-outline btn-block border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-700"
                onClick={toggleCart}
              >
                View Cart
              </Link>
              <button className="btn btn-primary btn-block">Checkout</button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-3">
              Shipping & taxes calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;