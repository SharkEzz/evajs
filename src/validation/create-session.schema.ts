import { z } from 'zod';

const createSessionSchema = z.object({
  date: z.string().datetime(),
  players: z.array(z.string()).min(2),
});

type CreateSessionSchema = z.infer<typeof createSessionSchema>;

export type { CreateSessionSchema };
export { createSessionSchema };
