"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false); // 👈 Evita el error de hidratación

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="h-[15vh] shadow">
      <div className="h-[100%] flex items-center border border-black">
        <nav className="w-[100%] flex justify-between gap-4 px-14">
          <div className="flex items-center">
            <img src="/images/logo.svg" className="w-12" alt="logo" />
            <Link href="/" className="text-white font-mono text-3xl">Click!</Link>
          </div>

          <div className="w-[40%] flex justify-around items-center">
            <Link
              href="/catalog"
              className={pathname?.startsWith("/catalog") ? "text-blue-600 font-medium" : "text-white"}
            >
              Catálogo
            </Link>
            <Link
              href="/orders"
              className={pathname?.startsWith("/orders") ? "text-blue-600 font-medium" : "text-white"}
            >
              Órdenes
            </Link>
          </div>

          <div className="flex items-center">
            <Link
              href="/cart"
              className="group flex items-center border-2 border-white rounded-xl px-4 py-1 gap-2 hover:border-blue-600 transition-colors"
            >
              <ShoppingCart
                size={28}
                className="text-white group-hover:text-blue-600 transition-colors"
              />
              {/* 👇 Evita el "Hydration failed" */}
              {mounted && (
                <span className="inline-block text-white rounded group-hover:text-blue-600 transition-colors">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
