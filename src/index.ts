import Fastify from 'fastify';
import { getPlayer, getPlayers } from './handlers/players.handler.js';
import { createSession, getSession, getSessions, registerSessionGame } from './handlers/sessions.handler.js';
import { prisma } from './database.js';

process.on('SIGINT', () => {
  fastify
    .close()
    .then(() => {
      throw new Error('Stopped');
    })
    .catch((error: unknown) => {
      console.error(error);
    });
});

const fastify = Fastify({ logger: true });

fastify.get('/players', getPlayers);
fastify.get('/players/:id', getPlayer);

fastify.get('/sessions', getSessions);
fastify.post('/sessions', createSession);
fastify.post('/sessions/:id/game', registerSessionGame);
fastify.get('/sessions/:id', getSession);

fastify.addHook('onClose', async () => {
  await prisma.$disconnect();
});

await fastify.listen({ port: 8000 });
