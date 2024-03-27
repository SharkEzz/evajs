import type { FastifyRequest } from 'fastify';
import { prisma } from '../database.js';
import { createSessionSchema } from '../validation/create-session.schema.js';
import { createSessionGameSchema } from '../validation/create-session-game.schema.js';

function getSessions() {
  return prisma.session.findMany();
}

async function createSession(req: FastifyRequest) {
  const data = await createSessionSchema.parseAsync(req.body);

  return prisma.session.create({
    data: {
      date: data.date,
    },
  });
}

async function registerSessionGame(req: FastifyRequest<{ Params: { id: string } }>) {
  const { id } = req.params;
  const data = await createSessionGameSchema.parseAsync(req.body);

  const sessionGame = await prisma.sessionGame.create({ data: { map: data.map, sessionId: +id } });

  for (const playerResult of data.playersResults) {
    await prisma.playerSessionGameResult.create({
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

  return prisma.sessionGame.findUniqueOrThrow({
    where: { id: sessionGame.id },
    include: { PlayerSessionGameResult: { include: { player: true } }, session: { include: { players: true } } },
  });
}

function getSession(req: FastifyRequest<{ Params: { id: string } }>) {
  const { id } = req.params;
  const idNumber = Number.parseInt(id, 10);

  return prisma.session.findFirstOrThrow({
    where: { id: idNumber },
    include: { players: { include: { player: true } }, sessionGames: { include: { PlayerSessionGameResult: true } } },
  });
}

export { getSession, getSessions, createSession, registerSessionGame };
