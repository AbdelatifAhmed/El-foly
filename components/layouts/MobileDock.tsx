'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, Package, ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';

const MobileDock = () => {
  const pathname = usePathname();
  const { cartItems } = useCartStore(); // جلب العربة للتحقق من وجود منتجات
  const wishlist = useWishlistStore((state) => state.wishlist);

  // تحقق مما إذا كانت العربة أو المفضلة تحتوي على عناصر
  const hasCartItems = cartItems.length > 0;
  const hasWishlistItems = wishlist.length > 0;

  return (
    <div className="dock dock-md fixed bottom-0 left-0 right-0 z-100 lg:hidden bg-white/90 backdrop-blur-md border-t border-base-200 shadow-2xl">

      {/* Offers */}
      <Link href="/offers" className={pathname === '/offers' ? 'dock-active' : ''}>
        <Tag size={22} />
        <span className="dock-label">Offers</span>
      </Link>

      {/* Products */}
      <Link href="/products" className={pathname === '/products' ? 'dock-active' : ''}>
        <Package size={22} />
        <span className="dock-label">Products</span>
      </Link>

      {/* Home */}
      <Link href="/" className={pathname === '/' ? 'dock-active' : ''}>
        <Home size={22} className="transition-all duration-300" />
        <span className="dock-label">Home</span>
      </Link>

      {/* Wishlist - مع حالة (Status Dot) */}
      <Link href="/wishlist" className={pathname === '/wishlist' ? 'dock-active text-primary' : ''}>
          <Heart size={22} />
        <span className="dock-label">Wishlist</span>
      </Link>

      {/* Cart - تحول إلى Link مع حالة (Status Dot) */}
      <Link href="/cart" className={pathname === '/cart' ? 'dock-active text-primary' : ''}>
        <ShoppingCart size={22} />
        <span className="dock-label">Cart</span>
      </Link>

    </div>
  );
};

export default MobileDock;