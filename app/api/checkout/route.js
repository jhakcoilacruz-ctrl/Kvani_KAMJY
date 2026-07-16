import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildOrderWhatsAppLink } from "@/lib/whatsapp";
import { getProductById } from "@/lib/products";

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, phone, address, notes, items } = body;

    if (!customerName || !phone) {
      return NextResponse.json({ error: "Nombre y teléfono son obligatorios" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    // Revalidamos precios contra el catálogo real (no confiamos en lo que
    // manda el navegador) para evitar que alguien manipule el total.
    let total = 0;
    const validatedItems = items.map((it) => {
      const product = getProductById(it.productId);
      if (!product) throw new Error(`Producto no encontrado: ${it.productId}`);
      const quantity = Math.max(1, Number(it.quantity) || 1);
      total += product.price * quantity;
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        size: it.size || null,
        quantity,
      };
    });

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        address: address || null,
        notes: notes || null,
        total,
        items: { create: validatedItems },
      },
      include: { items: true },
    });

    const whatsappLink = buildOrderWhatsAppLink({
      order,
      items: validatedItems,
      customerName,
    });

    return NextResponse.json({ orderId: order.id, whatsappLink });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "No se pudo procesar el pedido" }, { status: 500 });
  }
}
