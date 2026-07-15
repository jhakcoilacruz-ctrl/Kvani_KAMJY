import crypto from "crypto";

// Autenticación simple para un solo usuario admin (dueño de la tienda).
// No hay tabla de usuarios: la contraseña vive en la variable de entorno
// ADMIN_PASSWORD y ADMIN_SESSION_SECRET firma la cookie de sesión.

const SESSION_COOKIE = "kvani_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 horas

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "Falta ADMIN_SESSION_SECRET en las variables de entorno (.env)"
    );
  }
  return secret;
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `admin:${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expectedSignature = sign(payload);
  const valid =
    signature.length === expectedSignature.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  if (!valid) return false;

  const [, expiresStr] = payload.split(":");
  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false;

  return true;
}

export function checkPassword(password) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) {
    throw new Error("Falta ADMIN_PASSWORD en las variables de entorno (.env)");
  }
  return password === real;
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
