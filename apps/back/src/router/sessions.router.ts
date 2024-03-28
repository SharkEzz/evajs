import { t } from '../trpc.js';
import { z } from 'zod';
import { createSessionSchema } from '../schema/create-session.schema.js';
import { createSessionGameSchema } from '../schema/create-session-game.schema.js';

export const sessionsRouter = t.router({
  findAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.session.findMany({ include: { players: true } });
  }),
  findOne: t.procedure.input(z.number().positive()).query(({ ctx, input }) => {
    return ctx.prisma.session.findFirstOrThrow({
      where: { id: input },
      include: {
        players: { include: { player: true } },
        sessionGames: { include: { PlayerSessionGameResult: true } },
      },
    });
  }),
  findPastSessions: t.procedure.query(({ ctx }) => {
    return ctx.prisma.session.findMany({
      where: { date: { lte: new Date() } },
      include: { players: true },
    });
  }),
  findIncomingSessions: t.procedure.query(({ ctx }) => {
    return ctx.prisma.session.findMany({
      where: { date: { gt: new Date() } },
      include: { players: true },
    });
  }),
  create: t.procedure.input(createSessionSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.session.create({ data: input });
  }),
  createSessionGame: t.procedure.input(createSessionGameSchema).mutation(async ({ ctx, input }) => {
    const sessionGame = await ctx.prisma.sessionGame.create({ data: { map: input.map, sessionId: input.sessionId } });

    for (const playerResult of input.playersResults) {
      await ctx.prisma.playerSessionGameResult.create({
        data: {
          sessionGameId: sessionGame.id,
          playerUsername: playerResult.playerUsername,
          kills: playerResult.kills,
          deaths: playerResult.deaths,
          assists: playerResult.assists,
          hasWon: playerResult.hasWon,
        },
        include: {
          player: true,
          sessionGame: { include: { session: true } },
        },
      });
    }

    return ctx.prisma.sessionGame.findUniqueOrThrow({
      where: { id: sessionGame.id },
      include: { PlayerSessionGameResult: { include: { player: true } }, session: { include: { players: true } } },
    });
  }),
});
