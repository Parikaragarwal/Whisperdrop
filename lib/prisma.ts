import { PrismaClient } from "@prisma/client";

// TypeScript-safe global declaration
declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma ?? new PrismaClient();

// In dev (hot reload), store it globally so we don't create multiple instances
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
