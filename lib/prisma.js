import { PrismaClient } from "@prisma/client";

// Evita crear múltiples instancias de PrismaClient en desarrollo
// (Next.js recarga módulos en caliente).
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
