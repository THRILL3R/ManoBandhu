import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  city: z.string().max(100).optional(),
  gender: z.enum(['male', 'female', 'non_binary', 'prefer_not_to_say', 'other']).optional(),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date_of_birth must be YYYY-MM-DD')
    .optional(),
  companion_name: z.string().max(50).optional(),
  timezone: z.string().max(50).optional(),
  notification_preferences: z.record(z.string(), z.unknown()).optional(),
});


export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
