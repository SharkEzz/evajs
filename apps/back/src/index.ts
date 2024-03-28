import Fastify from 'fastify';
import { fastifyTRPCPlugin, type FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify';
import { createContext } from './context.js';
import { t } from './trpc.js';
import { playersRouter } from './router/players.router.js';
import { sessionsRouter } from './router/sessions.router.js';
import cors from '@fastify/cors';

process.on('SIGINT', () => {
  fastify.close().catch((error: unknown) => {
    console.error(error);
  });
});

const appRouter = t.router({
  players: playersRouter,
  sessions: sessionsRouter,
});
type AppRouter = typeof appRouter;

const fastify = Fastify({ logger: true, maxParamLength: 5000 });

await fastify.register(cors, { origin: '*', allowedHeaders: '*', methods: '*' });
await fastify.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    createContext,
    router: appRouter,
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

await fastify.listen({ port: 8000 });

export type { AppRouter };
