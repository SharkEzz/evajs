import { createTRPCReact, httpBatchLink, loggerLink } from '@trpc/react-query';
import type { AppRouter } from '../../back/src/index';

const trpc = createTRPCReact<AppRouter>();
const client = trpc.createClient({
  links: [
    loggerLink({
      enabled: () => process.env.NODE_ENV !== 'production',
    }),
    httpBatchLink({
      url: 'http://localhost:8000/trpc',
    }),
  ],
});

export { trpc, client };
