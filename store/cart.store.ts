import { create } from 'zustand';
import { CartStore  } from '@/lib/types';
// تعريف شكل المنتج داخل السلة


export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [], // الحالة الأولية: سلة فارغة
  isOpen: false, // الحالة الأولية: القائمة مغلقة

  // فتح وإغلاق القائمة
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  // إضافة منتج للسلة
  addToCart: (newItem) => set((state) => {
    const existingItem = state.cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      // إذا المنتج موجود، قم بزيادة الكمية
      return {
        cartItems: state.cartItems.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    } else {
      // إذا منتج جديد، أضفه بكمية 1
      return {
        cartItems: [...state.cartItems, { ...newItem, quantity: 1 }],
      };
    }
  }),

  // حذف منتج من السلة
  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== id),
  })),

  // تحديث كمية منتج معين
  updateQuantity: (id, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item // لا نسمح بأن تكون الكمية أقل من 1
    ),
  })),

  // تفريغ السلة بالكامل
  clearCart: () => set({ cartItems: [] }),

  // حساب إجمالي عدد العناصر في السلة
  totalItems: () => get().cartItems.reduce((total, item) => total + item.quantity, 0),

  // حساب السعر الإجمالي
  totalPrice: () => get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
}));