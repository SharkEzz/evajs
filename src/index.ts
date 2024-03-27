import Fastify from 'fastify';
import { getPlayer, getPlayers } from './handlers/players.handler.js';
import { createSession, getSession, getSessions, registerSessionGame } from './handlers/sessions.handler.js';

const fastify = Fastify({ logger: true });

fastify.get('/players', getPlayers);
fastify.get('/players/:id', getPlayer);

fastify.get('/sessions', getSessions);
fastify.post('/sessions', createSession);
fastify.post('/sessions/:id/game', registerSessionGame);
fastify.get('/sessions/:id', getSession);

await fastify.listen({ port: 8000 });
