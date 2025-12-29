'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowLeft, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCartStore();

  const subtotal = totalPrice();
  const shipping = subtotal > 500 ? 0 : 50; // شحن مجاني إذا زاد الطلب عن 500
  const tax = subtotal * 0.14; // ضريبة 14% مثلاً
  const finalTotal = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="bg-gray-100 p-6 rounded-full inline-block">
            <Trash2 className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
          <p className="text-gray-500 max-w-xs mx-auto">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/" className="btn bg-[var(--primary-color)]/90 hover:bg-[var(--primary-color)] border text-white px-8 rounded-full">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 md:px-10 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* العودة للتسوق */}
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 group w-fit">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Continue Shopping</span>
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-10">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="table w-full">
                <thead className="hidden md:table-header-group bg-gray-50/50">
                  <tr className="text-gray-400 uppercase text-[10px] tracking-widest border-none">
                    <th className="py-4">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-none">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                            <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-1">{item.title}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-rose-500 font-medium hover:underline mt-1 flex items-center gap-1"
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell font-medium text-gray-600">
                        ${item.price.toFixed(2)}
                      </td>
                      <td>
                        <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-50 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="text-right font-black text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky z-1 top-32">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping Estimate</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-500' : 'text-gray-800'}`}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax Estimate (14%)</span>
                  <span className="font-semibold text-gray-800">${tax.toFixed(2)}</span>
                </div>
                <div className="divider opacity-50"></div>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-800">Order Total</span>
                  <span className="text-3xl font-black text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="btn bg-(--primary-color)/90 hover:bg-(--primary-color) border text-white btn-block rounded-xl h-14 text-lg">
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <label className="text-sm font-bold text-gray-800 block mb-2">Have a promo code?</label>
                <div className="flex gap-2">
                    <input type="text" placeholder="Enter code" className="input input-bordered flex-1 rounded-xl " />
                    <button className="btn btn-neutral rounded-xl">Apply</button>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}