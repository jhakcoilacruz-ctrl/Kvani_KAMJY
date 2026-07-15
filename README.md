# KVANI Store

Tienda e-commerce construida sobre tu diseño original (Tailwind + Next.js),
con carrito de compras, checkout que arma un pedido y lo manda por WhatsApp,
base de datos de pedidos y panel de administración.

## Qué incluye

- **Catálogo**: `data/products.json` — lo editas a mano, sin tocar código.
- **Carrito**: persistido en el navegador (localStorage), context de React.
- **Checkout**: crea el pedido en la base de datos y abre WhatsApp con el
  resumen ya escrito, listo para enviar.
- **Base de datos**: Prisma + SQLite en desarrollo (un solo archivo).
  Guarda únicamente los **pedidos** (no los productos).
- **Panel admin** en `/admin`: login con contraseña, lista de pedidos con
  filtro por estado, y detalle de cada pedido con cambio de estado
  (pendiente → confirmado → enviado → entregado / cancelado).

No pude ejecutar `npm install` en el entorno donde armé este proyecto
(no tiene acceso a internet), así que instala las dependencias tú mismo
siguiendo los pasos de abajo — el código está completo y listo para correr.

## 1. Instalación local

Necesitas [Node.js 18+](https://nodejs.org).

```bash
cd kvani-store
npm install
cp .env.example .env
```

Abre `.env` y cambia al menos:
- `ADMIN_PASSWORD`: la contraseña para entrar a `/admin/login`.
- `ADMIN_SESSION_SECRET`: cualquier cadena larga y aleatoria (por ejemplo,
  generada con `openssl rand -hex 32`).
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: el número real de WhatsApp de KVANI, en
  formato internacional sin "+" (ej. `51987654321`).

Crea la base de datos local:

```bash
npm run db:push
```

Corre el sitio:

```bash
npm run dev
```

Abre http://localhost:3000 para la tienda y http://localhost:3000/admin/login
para el panel de administración.

## 2. Editar productos

Abre `data/products.json`. Cada producto es un objeto:

```json
{
  "id": "hoodie-phantom-black",
  "name": "Hoodie Phantom Black",
  "category": "hoodies",
  "price": 120.0,
  "sizes": ["S", "M", "L", "XL"],
  "image": "https://...",
  "featured": true,
  "soldOut": false,
  "description": "..."
}
```

- `id` debe ser único (se usa en la URL y en los pedidos).
- `featured: true` hace que aparezca en "Los favoritos del barrio" en el home.
- `soldOut: true` desactiva el botón de compra y muestra "SOLD OUT".
- `image` acepta cualquier URL de imagen pública. **Importante:** las
  imágenes que dejé son placeholders tomados del diseño original — algunas
  son URLs reales de Google, otras inventadas para que no se rompa el build;
  reemplázalas todas por fotos reales de tus productos antes de publicar
  (puedes subirlas a Cloudinary, Imgur, o a la carpeta `/public` del proyecto
  y usar rutas locales como `/productos/hoodie.jpg`).

No hace falta reiniciar el servidor para ver los cambios en desarrollo.

## 3. Cómo funciona un pedido

1. El cliente añade productos al carrito (botón ⊕ en cada card).
2. En `/carrito`, llena su nombre, teléfono y dirección, y confirma.
3. Eso llama a `POST /api/checkout`, que valida los precios contra
   `products.json` (para que nadie manipule el total desde el navegador),
   crea el `Order` en la base de datos con estado `pendiente`, y devuelve
   un link de WhatsApp con el resumen del pedido.
4. El navegador abre ese link automáticamente — el cliente solo tiene que
   presionar "Enviar" en WhatsApp.
5. Tú ves el pedido en `/admin/dashboard` y vas actualizando su estado a
   medida que lo confirmas, envías y entregas.

## 4. Desplegar a producción

Recomendación: **Vercel** (gratis para este tamaño de proyecto) +
**Neon** o **Supabase** para la base de datos Postgres (SQLite no
persiste en Vercel porque el sistema de archivos es efímero).

Pasos:

1. Crea una base de datos Postgres gratis en [neon.tech](https://neon.tech)
   o [supabase.com](https://supabase.com) y copia su `DATABASE_URL`.
2. En `prisma/schema.prisma`, cambia:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Sube este proyecto a un repositorio de GitHub.
4. En [vercel.com](https://vercel.com), importa el repo.
5. En la configuración del proyecto en Vercel, agrega las variables de
   entorno: `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`,
   `NEXT_PUBLIC_WHATSAPP_NUMBER`.
6. Despliega. Antes de usarlo, corre una vez `npx prisma db push` apuntando
   a la `DATABASE_URL` de producción (puedes hacerlo desde tu máquina local
   con esa variable en `.env`, o agregar `prisma db push` a un build step).

Si prefieres no usar Vercel, cualquier servidor Node.js (un VPS, Railway,
Render) sirve igual — ahí sí puedes quedarte con SQLite si el disco persiste.

## 5. Seguridad del panel admin

Es un sistema de un solo usuario (el dueño de la tienda), pensado para ser
simple: una contraseña en variable de entorno y una cookie de sesión firmada
con HMAC (12 horas de duración). Si más adelante necesitas varios usuarios
o roles, hay que migrar a un sistema de autenticación con tabla de usuarios
(por ejemplo NextAuth) — puedo ayudarte con eso cuando lo necesites.

## Estructura del proyecto

```
app/
  page.js              → Home
  coleccion/page.js    → Catálogo completo con filtro por categoría
  carrito/page.js      → Carrito + checkout
  admin/login/         → Login del panel admin
  admin/dashboard/     → Lista de pedidos
  admin/pedidos/[id]/  → Detalle y cambio de estado de un pedido
  api/checkout/        → Crea pedidos
  api/admin/           → Login, logout, listar/actualizar pedidos
components/            → Navbar, ProductCard, CartDrawer, Footer, CartContext
lib/                   → prisma, auth, products, whatsapp (helpers)
data/products.json     → Catálogo editable
prisma/schema.prisma   → Modelos de base de datos (Order, OrderItem)
```
