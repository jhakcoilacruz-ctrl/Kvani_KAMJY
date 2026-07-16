"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes?.[0] || null);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (product.soldOut) return;
    addItem(product, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="group bg-[#1A1A1A] border border-white/20 hover:border-primary-fixed transition-colors duration-300 flex flex-col h-full">
      <div className="relative aspect-[3/4] overflow-hidden w-full bg-surface-container-highest">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        {product.soldOut && (
          <div className="absolute top-sm right-sm bg-background border border-white/20 px-xs py-base font-label-caps text-[10px] text-tertiary uppercase">
            SOLD OUT
          </div>
        )}
      </div>
      <div className="p-sm flex flex-col flex-grow bg-background">
        <h3 className="font-headline-md text-[18px] leading-tight text-tertiary font-bold uppercase mb-xs">
          {product.name}
        </h3>

        {product.sizes && product.sizes.length > 1 ? (
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            disabled={product.soldOut}
            className="mb-md bg-transparent border border-white/20 text-secondary text-body-md px-xs py-base focus:border-primary-fixed outline-none disabled:opacity-40"
          >
            {product.sizes.map((s) => (
              <option key={s} value={s} className="bg-background">
                {s}
              </option>
            ))}
          </select>
        ) : (
          <p className="font-body-md text-body-md text-secondary mb-md">
            {product.sizes?.[0] || ""}
          </p>
        )}

        <div className="mt-auto flex justify-between items-center">
          <span className="font-label-caps text-label-caps text-tertiary tracking-widest">
            S/ {product.price.toFixed(2)}
          </span>
          {product.soldOut ? (
            <span className="material-symbols-outlined text-[24px] text-secondary opacity-50">block</span>
          ) : (
            <button
              onClick={handleAdd}
              aria-label={`Añadir ${product.name} al carrito`}
              className="text-primary-fixed hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">
                {added ? "check_circle" : "add_circle"}
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
