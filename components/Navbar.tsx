"use client";

import useCart from "@/lib/hooks/useCart";

import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {Howl}  from 'howler'
import Sound from "./Sound"

const playSound = () => {
  const sound = new Howl({
    src: ['/sounds/hover.mp3'], 
  });
  sound.play();
};


const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="sticky top-0 z-11 py-2 px-10 flex gap-2 justify-between items-center bg-brown-2 max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={150} height={120} />
      </Link>

      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          onMouseEnter={playSound}
          className={`hover:text-brown-2 text-brown-1 hover:border-brown-1 hover:bg-brown-1 rounded-lg px-3 py-2 border border-brown-1 
           ${
            pathname === "/" && "text-brown-1 hover:border-brown-1 hover:bg-brown-1 rounded-lg px-3 py-2 border border-brown-1"
          }`}
        >
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          onMouseEnter={playSound}
          className={`hover:text-brown-2 text-brown-1 border border-brown-1  hover:border-brown-1 hover:bg-brown-1 rounded-lg px-3 py-2 ${
            pathname === "/wishlist" && "text-brown-1"
          }`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          onMouseEnter={playSound}
          className={`hover:text-brown-2 text-brown-1 border border-brown-1 hover:border-brown-1 hover:bg-brown-1 rounded-lg px-3 py-2 ${
            pathname === "/orders" && "text-brown-1"
          }`}
        >
          Orders
        </Link>
      </div>

      <div className="flex gap-3 items-center rounded-lg overflow-hidden text-brown-1">
  <div className="relative flex-grow text-brown-1">
    <input
      className="outline-none w-full bg-brown-2 text-brown-1 border border-brown-1 px-3 py-1 rounded-lg transition-all duration-300"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>
  <button
    disabled={query === ""}
    onClick={() => router.push(`/search/${query}`)}
    className="flex items-center justify-center bg-brown-2 text-brown-1 border border-brown-1 rounded-lg transition-all duration-300 shadow-md hover:bg-brown-1 hover:text-white"
  >
    <Search className="cursor-pointer h-8 w-6" />
  </button>
</div>


      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          onMouseEnter={playSound}
          className="flex items-center gap-3 text-brown-1 border border-brown-1 rounded-lg px-2 py-1 hover:bg-brown-1 hover:text-brown-2 max-md:hidden  hover:border-brown-1 "
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden text-brown-1"
          onClick={() => setDropdownMenu(!dropdownMenu)}
          onMouseEnter={playSound}
        />

        {dropdownMenu && (
          <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border text-brown-1 bg-brown-2 text-base-bold lg:hidden ">
            <Link href="/" className="hover:text-brown-2 hover:bg-brown-1 rounded-lg px-3 py-2 border border-brown-1">
              
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-brown-2 hover:bg-brown-1 rounded-lg px-3 py-2 border border-brown-1"
              onMouseEnter={playSound}
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-brown-2 hover:bg-brown-1 rounded-lg px-3 py-2 border border-brown-1"
              onMouseEnter={playSound}
            >
              Orders
            </Link>
            <Link
              href="/cart"
              onMouseEnter={playSound}
              className="flex items-center gap-3 border border-brown-1 rounded-lg px-2 py-1 hover:text-brown-2 hover:bg-brown-1"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
              
            </Link>
          </div>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
