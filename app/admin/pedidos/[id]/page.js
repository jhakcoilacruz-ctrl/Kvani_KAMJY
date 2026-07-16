"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const STATUSES = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"];

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          throw new Error("No autorizado");
        }
        return res.json();
      })
      .then((data) => setOrder(data.order))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, router]);

  async function updateStatus(status) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) setOrder(data.order);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="min-h-screen bg-background px-margin-mobile py-lg text-secondary">Cargando...</main>;
  if (!order) return <main className="min-h-screen bg-background px-margin-mobile py-lg text-secondary">Pedido no encontrado.</main>;

  return (
    <main className="min-h-screen bg-background px-margin-mobile md:px-margin-desktop py-lg max-w-2xl mx-auto">
      <Link href="/admin/dashboard" className="text-secondary hover:text-tertiary text-[13px] underline mb-md inline-block">
        ← Volver a pedidos
      </Link>

      <h1 className="font-headline-md text-headline-md text-tertiary font-black uppercase tracking-tighter mb-sm">
        Pedido #{order.id.slice(-6).toUpperCase()}
      </h1>
      <p className="text-secondary text-[13px] mb-lg">
        {new Date(order.createdAt).toLocaleString("es-PE")}
      </p>

      <div className="border border-white/10 p-md mb-md">
        <h2 className="font-label-caps text-label-caps text-secondary uppercase mb-xs">Cliente</h2>
        <p className="text-tertiary font-bold">{order.customerName}</p>
        <p className="text-secondary">{order.phone}</p>
        {order.address && <p className="text-secondary">{order.address}</p>}
        {order.notes && <p className="text-secondary italic mt-xs">"{order.notes}"</p>}
      </div>

      <div className="border border-white/10 p-md mb-md">
        <h2 className="font-label-caps text-label-caps text-secondary uppercase mb-sm">Productos</h2>
        {order.items.map((it) => (
          <div key={it.id} className="flex justify-between border-b border-white/10 py-xs">
            <span className="text-tertiary">
              {it.name} {it.size ? `(${it.size})` : ""} x{it.quantity}
            </span>
            <span className="text-tertiary">S/ {(it.price * it.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between pt-sm font-bold text-tertiary uppercase tracking-widest">
          <span>Total</span>
          <span>S/ {order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border border-white/10 p-md">
        <h2 className="font-label-caps text-label-caps text-secondary uppercase mb-sm">Estado del pedido</h2>
        <div className="flex flex-wrap gap-xs">
          {STATUSES.map((s) => (
            <button
              key={s}
              disabled={saving}
              onClick={() => updateStatus(s)}
              className={`px-sm py-xs border uppercase text-[12px] font-label-caps disabled:opacity-50 ${
                order.status === s ? "border-primary-fixed text-primary-fixed" : "border-white/20 text-secondary hover:text-tertiary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
