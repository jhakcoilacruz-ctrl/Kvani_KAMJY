"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <aside className="relative w-full max-w-sm h-full bg-surface-container-lowest border-l border-white/10 flex flex-col">
        <div className="flex items-center justify-between p-md border-b border-white/10">
          <h2 className="font-headline-md text-[20px] text-tertiary font-bold uppercase">
            Tu carrito
          </h2>
          <button onClick={() => setIsOpen(false)} aria-label="Cerrar carrito" className="text-tertiary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-md flex flex-col gap-md">
          {items.length === 0 && (
            <p className="text-secondary text-body-md">
              Tu carrito está vacío. Explora la colección y añade lo que te guste.
            </p>
          )}
          {items.map((it) => (
            <div key={`${it.productId}-${it.size}`} className="flex gap-sm border-b border-white/10 pb-md">
              <div className="flex-grow">
                <p className="text-tertiary font-bold uppercase text-[14px]">{it.name}</p>
                <p className="text-secondary text-[12px] mb-xs">{it.size || "Talla única"}</p>
                <div className="flex items-center gap-xs">
                  <button
                    onClick={() => updateQuantity(it.productId, it.size, it.quantity - 1)}
                    className="w-6 h-6 border border-white/20 text-tertiary flex items-center justify-center"
                    aria-label="Restar cantidad"
                  >
                    −
                  </button>
                  <span className="text-tertiary text-[14px] w-4 text-center">{it.quantity}</span>
                  <button
                    onClick={() => updateQuantity(it.productId, it.size, it.quantity + 1)}
                    className="w-6 h-6 border border-white/20 text-tertiary flex items-center justify-center"
                    aria-label="Sumar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="text-tertiary text-[14px] font-bold">
                  S/ {(it.price * it.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(it.productId, it.size)}
                  className="text-secondary hover:text-error text-[12px] underline"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-md border-t border-white/10">
          <div className="flex justify-between mb-md text-tertiary font-bold uppercase tracking-widest">
            <span>Subtotal</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/carrito"
            onClick={() => setIsOpen(false)}
            className={`block text-center bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps px-md py-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 ${
              items.length === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            Finalizar pedido
          </Link>
        </div>
      </aside>
    </div>
  );
}
