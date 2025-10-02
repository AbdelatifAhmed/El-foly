"use client";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="navbar bg-base-100 flex justify-between items-center fixed top-0 left-0 right-0 w-full z-50 px-32">
      <div className="pl-2">
        <div className="dropdown hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <div>
          <Link href={"/"} className="cursor-pointer">
            <Image src="/images/elfoly-logo.svg" alt="Logo" width={80} height={80} />
          </Link>
        </div>
      </div>

      <ul className="flex items-center gap-8 ">
        <li>
          <Link
            href="/"
            className={`navbar-text ${pathname === "/" ? "active-link" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`navbar-text ${
              pathname === "/about" ? "active-link" : ""
            } `}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`navbar-text ${
              pathname === "/contact" ? "active-link" : ""
            }`}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`navbar-text ${
              pathname === "/contact" ? "active-link" : ""
            }`}
          >
            Sign Up
          </Link>
        </li>
      </ul>

      <div className="flex justify-around items-center gap-2">
        {/* search bar */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="what are you looking for?"
            className="input input-bordered input-sm w-24 md:w-auto bg-base-300"
          />
          <div className="badge badge-xl badge-soft px-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />{" "}
            </svg>
          </div>
        </div>
        {/* wishlist */}
        <div className="flex items-center gap-1">
          <Image src='/icons/heart.svg' alt='Cart' width={24} height={24} />
          <span className="text-lg text-bold">wishList</span>
        </div>
        <div className="divider divider-horizontal"></div>
        {/* cart */}
        <div className="flex items-center justify-around gap-2">
          <Image src='/icons/shopping-cart.svg' alt='Cart' width={24} height={24} />
          <span className="text-lg text-bold">Cart</span>
        </div>
        <div className="divider divider-horizontal"></div>
        {/* user profile */}
        <div className=" items-center gap-1 flex ">
          <Image src='/icons/user-circle-fill.svg' alt='Cart' width={30} height={30} />          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
