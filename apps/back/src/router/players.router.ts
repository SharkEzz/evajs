import { createPlayerSchema } from '../schema/create-player.schema.js';
import { t } from '../trpc.js';
import { z } from 'zod';

export const playersRouter = t.router({
  findAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.player.findMany();
  }),
  findOne: t.procedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.player.findUniqueOrThrow({ where: { username: input } });
  }),
  create: t.procedure.input(createPlayerSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.player.create({ data: input });
  }),
});
