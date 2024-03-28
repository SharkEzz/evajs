import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '../../back/src/index';

const trpc = createTRPCReact<AppRouter>();
const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:8000/trpc',
    }),
  ],
});

export { trpc, client };
