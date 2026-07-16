"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/coleccion", label: "Colección" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-background text-primary-fixed fixed top-0 w-full z-50 border-b border-white/20">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop w-full max-w-full">
        <Link href="/" className="font-headline-md text-headline-md font-black tracking-tighter text-tertiary">
          KVANI
        </Link>

        <div className="hidden md:flex gap-md items-center font-label-caps text-label-caps">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-tertiary font-medium hover:text-primary-fixed transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-sm items-center">
          <button
            aria-label="Abrir carrito"
            onClick={() => setIsOpen(true)}
            className="relative active:scale-95 transition-transform text-tertiary hover:text-primary-fixed"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Abrir menú"
            className="md:hidden text-tertiary"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-sm px-margin-mobile pb-md font-label-caps text-label-caps border-t border-white/10">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-tertiary py-xs hover:text-primary-fixed transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
