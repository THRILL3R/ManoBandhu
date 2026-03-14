import { z } from 'zod';

// ── Schemas ───────────────────────────────────────────────────────────────────
// No user-facing schema for insights (GET only, no request body)
// InsightReportJson shape validated from OpenAI response

export const InsightReportJsonSchema = z.object({
  dominant_emotion:          z.string(),
  emotion_distribution_pct:  z.record(z.string(), z.number()),
  trend_sentence:            z.string(),
  sessions_count:            z.number(),
  avg_recovery_sec:          z.number(),
  recovery_trend_sentence:   z.string(),
  morning_pct:               z.number(),
  night_pct:                 z.number(),
  gratitude_count:           z.number(),
  encouragement_sentence:    z.string(),
});

export type InsightReportJson = z.infer<typeof InsightReportJsonSchema>;
