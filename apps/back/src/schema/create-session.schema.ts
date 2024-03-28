import { z } from 'zod';

const createSessionSchema = z.object({
  date: z.string().datetime(),
});

type CreateSessionSchema = z.infer<typeof createSessionSchema>;

export type { CreateSessionSchema };
export { createSessionSchema };
