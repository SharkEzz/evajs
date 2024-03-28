import { z } from 'zod';

const createPlayerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  playerTag: z.string().min(1).nullable(),
  isJVS: z.boolean().default(false),
  bestDamageInflicted: z.number().int().min(0).default(0),
  bestKillStreak: z.number().int().min(0).default(0),
});

export type CreatePlayerSchema = z.infer<typeof createPlayerSchema>;
export { createPlayerSchema };
