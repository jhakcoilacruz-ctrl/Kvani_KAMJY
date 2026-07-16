"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "kvani_cart_v1";

function cartKey(item) {
  return `${item.productId}__${item.size || "unico"}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar carrito guardado al montar (solo en el navegador)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("No se pudo leer el carrito guardado", e);
    }
    setHydrated(true);
  }, []);

  // Guardar cada vez que cambia
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(product, size, quantity = 1) {
    setItems((prev) => {
      const key = cartKey({ productId: product.id, size });
      const existing = prev.find((it) => cartKey(it) === key);
      if (existing) {
        return prev.map((it) =>
          cartKey(it) === key ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          size: size || null,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  }

  function updateQuantity(productId, size, quantity) {
    setItems((prev) =>
      prev
        .map((it) =>
          cartKey(it) === cartKey({ productId, size })
            ? { ...it, quantity: Math.max(1, quantity) }
            : it
        )
        .filter((it) => it.quantity > 0)
    );
  }

  function removeItem(productId, size) {
    setItems((prev) => prev.filter((it) => cartKey(it) !== cartKey({ productId, size })));
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const count = items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        count,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
