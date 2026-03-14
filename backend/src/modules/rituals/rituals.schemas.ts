import { z } from 'zod';

export const CompleteMorningSchema = z.object({
  ritual_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'ritual_date must be YYYY-MM-DD'),
  gratitude_json: z
    .array(z.string().min(1).max(200))
    .min(1, 'At least 1 gratitude item is required')
    .max(3, 'Maximum 3 gratitude items allowed'),
  intention: z.string().min(1).max(300),
  goals: z
    .array(z.string().min(1).max(200))
    .max(3, 'Maximum 3 goals allowed'),
});

export const CompleteNightSchema = z.object({
  ritual_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'ritual_date must be YYYY-MM-DD'),
  reflection: z.string().min(1).max(500),
  triggers_json: z.array(z.string().min(1).max(200)),
  mood_rating: z.number().int().min(1).max(5),
});

export type CompleteMorningInput = z.infer<typeof CompleteMorningSchema>;
export type CompleteNightInput = z.infer<typeof CompleteNightSchema>;
