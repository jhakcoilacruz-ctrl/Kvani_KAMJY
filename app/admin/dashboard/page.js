"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STATUS_COLORS = {
  pendiente: "text-yellow-400",
  confirmado: "text-blue-400",
  enviado: "text-purple-400",
  entregado: "text-primary-fixed",
  cancelado: "text-error",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          throw new Error("No autorizado");
        }
        return res.json();
      })
      .then((data) => setOrders(data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = filter === "todos" ? orders : orders.filter((o) => o.status === filter);

  return (
    <main className="min-h-screen bg-background px-margin-mobile md:px-margin-desktop py-lg">
      <div className="flex justify-between items-center mb-lg">
        <h1 className="font-headline-md text-headline-md text-tertiary font-black uppercase tracking-tighter">
          Pedidos
        </h1>
        <button onClick={handleLogout} className="text-secondary hover:text-tertiary text-[13px] underline">
          Cerrar sesión
        </button>
      </div>

      <div className="flex flex-wrap gap-xs mb-md font-label-caps text-[11px] uppercase">
        {["todos", "pendiente", "confirmado", "enviado", "entregado", "cancelado"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-sm py-xs border ${filter === s ? "border-primary-fixed text-primary-fixed" : "border-white/20 text-secondary"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-secondary">Cargando pedidos...</p>
      ) : filtered.length === 0 ? (
        <p className="text-secondary">No hay pedidos {filter !== "todos" ? `en estado "${filter}"` : "todavía"}.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-secondary text-[12px] uppercase">
                <th className="py-sm pr-md">Pedido</th>
                <th className="py-sm pr-md">Cliente</th>
                <th className="py-sm pr-md">Teléfono</th>
                <th className="py-sm pr-md">Total</th>
                <th className="py-sm pr-md">Estado</th>
                <th className="py-sm pr-md">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-white/10 hover:bg-surface-container-lowest">
                  <td className="py-sm pr-md">
                    <Link href={`/admin/pedidos/${o.id}`} className="text-primary-fixed underline">
                      #{o.id.slice(-6).toUpperCase()}
                    </Link>
                  </td>
                  <td className="py-sm pr-md text-tertiary">{o.customerName}</td>
                  <td className="py-sm pr-md text-secondary">{o.phone}</td>
                  <td className="py-sm pr-md text-tertiary">S/ {o.total.toFixed(2)}</td>
                  <td className={`py-sm pr-md uppercase text-[12px] font-bold ${STATUS_COLORS[o.status] || ""}`}>
                    {o.status}
                  </td>
                  <td className="py-sm pr-md text-secondary text-[12px]">
                    {new Date(o.createdAt).toLocaleString("es-PE")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
