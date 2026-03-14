import { z } from 'zod';

export const StartSessionSchema = z.object({
  emotion_selected: z.string().min(1, 'emotion_selected is required'),
});

export const UpdateStepSchema = z.object({
  control_response: z.enum(['yes', 'no', 'not_sure']).optional(),
  action_taken: z
    .enum(['small_action', 'break', 'conversation', 'let_go', 'more_time'])
    .optional(),
  closure_outcome: z.enum(['settled', 'processing', 'need_support']).optional(),
  help_screen_shown: z.boolean().optional(),
});

export const CompleteSessionSchema = z.object({
  closure_outcome: z.enum(['settled', 'processing', 'need_support']),
});

export type StartSessionInput = z.infer<typeof StartSessionSchema>;
export type UpdateStepInput = z.infer<typeof UpdateStepSchema>;
export type CompleteSessionInput = z.infer<typeof CompleteSessionSchema>;
