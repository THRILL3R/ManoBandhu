import { z } from 'zod';

// ── Plan pricing config (amounts in paise = INR × 100) ────────────────────────
export const PLAN_PRICES = {
  premium_monthly:      49900,
  premium_yearly:      449900,
  premium_plus_monthly: 89900,
  premium_plus_yearly: 799900,
} as const;

export type PlanKey = keyof typeof PLAN_PRICES;

// ── Schemas ───────────────────────────────────────────────────────────────────
export const CheckoutSchema = z.object({
  plan_type:     z.enum(['premium', 'premium_plus']),
  billing_cycle: z.enum(['monthly', 'yearly']),
});

export const CancelSchema = z.object({
  reason: z.string().max(500).optional(),
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;
export type CancelInput   = z.infer<typeof CancelSchema>;
