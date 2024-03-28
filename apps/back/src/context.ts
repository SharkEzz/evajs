import { PrismaClient } from '@prisma/client';
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

function createContext({ req, res }: CreateFastifyContextOptions) {
  const prisma = new PrismaClient();

  return {
    prisma,
    req,
    res,
  };
}

export type Context = ReturnType<typeof createContext>;
export { createContext };
