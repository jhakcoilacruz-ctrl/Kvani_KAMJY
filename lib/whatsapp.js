// Número de WhatsApp de la tienda (formato internacional, sin "+" ni espacios).
// Cámbialo por el número real de KVANI.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999";

export function buildOrderWhatsAppLink({ order, items, customerName }) {
  const lines = [
    `Hola KVANI! Quiero confirmar mi pedido *#${order.id.slice(-6).toUpperCase()}*`,
    "",
    ...items.map(
      (it) => `• ${it.name} (${it.size || "Talla única"}) x${it.quantity} — S/ ${(it.price * it.quantity).toFixed(2)}`
    ),
    "",
    `Total: S/ ${order.total.toFixed(2)}`,
    `Nombre: ${customerName}`,
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildProductWhatsAppLink(productName) {
  const text = encodeURIComponent(`Hola Kvani, quiero info sobre: ${productName}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
