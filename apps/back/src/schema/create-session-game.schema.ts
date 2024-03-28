import { z } from 'zod';

const createSessionGameSchema = z.object({
  sessionId: z.number().positive(),
  map: z.string(),
  playersResults: z
    .array(
      z.object({
        playerUsername: z.string().min(1),
        hasWon: z.boolean(),
        kills: z.number().positive(),
        deaths: z.number().positive(),
        assists: z.number().positive(),
      }),
    )
    .min(2),
});

type CreateSessionSchema = z.infer<typeof createSessionGameSchema>;

export type { CreateSessionSchema };
export { createSessionGameSchema };
