"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CarritoPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleCheckout(e) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo crear el pedido");

      clearCart();
      window.location.href = data.whatsappLink;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 px-margin-mobile md:px-margin-desktop w-full max-w-3xl mx-auto pb-xl">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-tertiary font-black uppercase tracking-tighter mb-lg">
          Tu Carrito
        </h1>

        {items.length === 0 ? (
          <p className="text-secondary text-body-md">
            Tu carrito está vacío. <a href="/coleccion" className="text-primary-fixed underline">Explora la colección</a>.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-md mb-lg">
              {items.map((it) => (
                <div key={`${it.productId}-${it.size}`} className="flex justify-between items-center border-b border-white/10 pb-sm">
                  <div>
                    <p className="text-tertiary font-bold uppercase">{it.name}</p>
                    <p className="text-secondary text-[13px]">{it.size || "Talla única"}</p>
                    <div className="flex items-center gap-xs mt-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(it.productId, it.size, it.quantity - 1)}
                        className="w-6 h-6 border border-white/20 text-tertiary"
                      >
                        −
                      </button>
                      <span className="text-tertiary w-4 text-center">{it.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(it.productId, it.size, it.quantity + 1)}
                        className="w-6 h-6 border border-white/20 text-tertiary"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(it.productId, it.size)}
                        className="ml-sm text-secondary hover:text-error text-[12px] underline"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                  <span className="text-tertiary font-bold">S/ {(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mb-lg text-tertiary font-bold uppercase tracking-widest text-[20px]">
              <span>Total</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>

            <form onSubmit={handleCheckout} className="flex flex-col gap-sm">
              <h2 className="font-headline-md text-[18px] text-tertiary font-bold uppercase mb-xs">
                Datos de entrega
              </h2>
              <input
                required
                name="customerName"
                placeholder="Nombre completo"
                value={form.customerName}
                onChange={handleChange}
                className="bg-transparent border border-white/20 text-tertiary px-sm py-sm focus:border-primary-fixed outline-none"
              />
              <input
                required
                name="phone"
                placeholder="Teléfono / WhatsApp"
                value={form.phone}
                onChange={handleChange}
                className="bg-transparent border border-white/20 text-tertiary px-sm py-sm focus:border-primary-fixed outline-none"
              />
              <input
                name="address"
                placeholder="Dirección de entrega (opcional)"
                value={form.address}
                onChange={handleChange}
                className="bg-transparent border border-white/20 text-tertiary px-sm py-sm focus:border-primary-fixed outline-none"
              />
              <textarea
                name="notes"
                placeholder="Notas adicionales (opcional)"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="bg-transparent border border-white/20 text-tertiary px-sm py-sm focus:border-primary-fixed outline-none"
              />

              {error && <p className="text-error text-[13px]">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-sm bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps px-md py-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? "Creando pedido..." : "Confirmar y enviar por WhatsApp"}
              </button>
              <p className="text-secondary text-[12px]">
                Se creará tu pedido y se abrirá WhatsApp con el resumen listo para enviar.
              </p>
            </form>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
