import { z } from 'zod';

// ── CreateDiarySchema ─────────────────────────────────────────────────────────
export const CreateDiarySchema = z.object({
  entry_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'entry_date must be YYYY-MM-DD'),

  content_type: z.enum(['text', 'voice', 'drawing', 'image', 'mixed']),

  text_content: z.string().optional(),

  media_url: z.string().url('media_url must be a valid URL').optional(),

  media_key: z.string().optional(),

  tags: z
    .array(z.string().min(1).max(30, 'Each tag must be ≤ 30 characters'))
    .max(10, 'Maximum 10 tags allowed')
    .optional()
    .default([]),
});

// ── UpdateDiarySchema ─────────────────────────────────────────────────────────
export const UpdateDiarySchema = z.object({
  text_content: z.string().optional(),

  tags: z
    .array(z.string().min(1).max(30, 'Each tag must be ≤ 30 characters'))
    .max(10, 'Maximum 10 tags allowed')
    .optional(),
});

// ── Types ─────────────────────────────────────────────────────────────────────
export type CreateDiaryInput = z.infer<typeof CreateDiarySchema>;
export type UpdateDiaryInput = z.infer<typeof UpdateDiarySchema>;
