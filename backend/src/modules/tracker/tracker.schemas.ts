import { z } from 'zod';

export const EMOTION_CATEGORIES = [
  'calm', 'anxious', 'sad', 'happy', 'overwhelmed',
  'angry', 'grateful', 'numb', 'other',
] as const;

export const LogEmotionSchema = z.object({
  log_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'log_date must be YYYY-MM-DD'),
  emotion_category: z.enum(EMOTION_CATEGORIES),
  intensity: z.number().int().min(1).max(10),
  note: z.string().max(500).optional(),
  source: z
    .enum(['manual', 'ritual', 'regulation_flow'])
    .optional()
    .default('manual'),
});

export type LogEmotionInput = z.infer<typeof LogEmotionSchema>;
