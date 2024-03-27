import type { FastifyRequest } from 'fastify';
import { prisma } from '../database.js';

function getPlayers() {
  return prisma.player.findMany();
}

function getPlayer(req: FastifyRequest<{ Params: { id: string } }>) {
  const { id } = req.params;

  return prisma.player.findFirstOrThrow({ where: { id: +id } });
}

export { getPlayers, getPlayer };
