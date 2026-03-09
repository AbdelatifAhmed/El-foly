'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, Package, ShoppingCart, Heart } from 'lucide-react';


const MobileDock = () => {
  const pathname = usePathname();
 
  return (
    <div className="dock dock-md fixed bottom-0 left-0 right-0 z-100 lg:hidden bg-white/90 backdrop-blur-md border-t border-base-200 shadow-2xl">

      {/* Offers */}
      <Link href="/offers" className={pathname === '/offers' ? 'border-b-2 border-(--primary-) rounded' : ''}>
        <Tag size={22} stroke={`${pathname === '/offers' ? 'var(--primary-color)': 'currentColor'}`} />
        <span className={`dock-label  ${pathname === '/offers' ? 'text-(--primary-color) font-bold'  : ''}`}>Offers</span>
      </Link>

      {/* Products */}
      <Link href="/products" className={pathname === '/products' ? ' border-b-2 border-(--primary-color) rounded' : ''}>
        <Package size={22}  stroke={`${pathname === '/products' ? 'var(--primary-color)' : 'currentColor'}`}/>
        <span className={`dock-label  ${pathname === '/products' ? 'text-(--primary-color) font-bold' : ''}`}>Products</span>
      </Link>

      {/* Home */}
      <Link href="/" className={pathname === '/' ? 'border-b-2 border-(--primary-color) rounded' : ''}>
        <Home size={22} className="transition-all duration-300" stroke={`${pathname === '/' ? 'var(--primary-color)' : 'currentColor'}`}/>
        <span className={`dock-label  ${pathname === '/' ? 'text-(--primary-color) font-bold' : ''}`}>Home</span>
      </Link>

      <Link href="/wishlist" className={pathname === '/wishlist' ? 'border-b-2 border-(--primary-color) rounded' : ''}>
          <Heart size={22} stroke={`${pathname === '/wishlist' ? 'var(--primary-color)' : 'currentColor'}`}/>
        <span className={`dock-label ${pathname === '/wishlist' ? 'text-(--primary-color) font-bold' : ''}`}>Wishlist</span>
      </Link>

      <Link href="/cart" className={pathname === '/cart' ? 'border-b-2 border-(--primary-color) rounded' : ''}>
        <ShoppingCart size={22} stroke={`${pathname === '/cart' ? 'var(--primary-color)' : 'currentColor'}`}/>
        <span className={`dock-label ${pathname === '/cart' ? 'text-(--primary-color) font-bold ' : ''}`}>Cart</span>
      </Link>

    </div>
  );
};

export default MobileDock;