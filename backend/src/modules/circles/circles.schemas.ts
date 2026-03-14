import { z } from 'zod';

export const SaveCircleSchema = z.object({
  entry_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'entry_date must be YYYY-MM-DD'),
  entries: z
    .array(
      z.object({
        person_name: z.string().min(1).max(100),
        circle_level: z.number().int().min(0).max(4),
        emotion_linked: z.string().max(50).optional(),
      })
    )
    .min(1, 'At least one entry is required'),
});

export type SaveCircleInput = z.infer<typeof SaveCircleSchema>;
