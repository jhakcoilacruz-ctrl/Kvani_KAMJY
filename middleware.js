import { NextResponse } from "next/server";

// No podemos usar Node's crypto dentro del Edge Runtime del middleware,
// así que aquí solo comprobamos que la cookie EXISTA. La verificación
// criptográfica real (firma + expiración) se hace en cada API route con
// verifySessionToken(). Esto evita que alguien sin cookie llegue siquiera
// a ver el HTML del dashboard.
const SESSION_COOKIE_NAME = "kvani_admin_session";

export function middleware(request) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/pedidos/:path*"],
};
