import { z } from 'zod';

// ── EventFilterSchema (query params) ─────────────────────────────────────────
export const EventFilterSchema = z.object({
  city:       z.string().optional(),
  category:   z.string().optional(),   // maps to event_type
  date_from:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date_from must be YYYY-MM-DD').optional(),
  date_to:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date_to must be YYYY-MM-DD').optional(),
  radius_km:  z.coerce.number().positive().optional(),
  lat:        z.coerce.number().optional(),
  lng:        z.coerce.number().optional(),
  page:       z.coerce.number().int().positive().default(1),
  limit:      z.coerce.number().int().positive().max(50).default(20),
});

// ── CreateEventSchema ─────────────────────────────────────────────────────────
export const CreateEventSchema = z.object({
  title:          z.string().min(3).max(255),
  description:    z.string().optional(),
  organiser_name: z.string().min(2).max(150),
  event_type:     z.enum(['workshop', 'webinar', 'retreat', 'meetup', 'class', 'other']),
  city:           z.string().max(100).optional(),
  address:        z.string().optional(),
  start_datetime: z.string().datetime({ message: 'start_datetime must be ISO 8601' }),
  end_datetime:   z.string().datetime({ message: 'end_datetime must be ISO 8601' }),
  price_inr:      z.number().nonnegative().optional().default(0),
  total_capacity: z.number().int().positive(),
  banner_url:     z.string().url().optional(),
  tags:           z.array(z.string().max(30)).max(10).optional().default([]),
}).refine(
  (d) => new Date(d.end_datetime) > new Date(d.start_datetime),
  { message: 'end_datetime must be after start_datetime', path: ['end_datetime'] }
);

// ── BookEventSchema ───────────────────────────────────────────────────────────
export const BookEventSchema = z.object({
  event_id: z.string().uuid('event_id must be a valid UUID'),
});

// ── Types ─────────────────────────────────────────────────────────────────────
export type EventFilterInput  = z.infer<typeof EventFilterSchema>;
export type CreateEventInput  = z.infer<typeof CreateEventSchema>;
export type BookEventInput    = z.infer<typeof BookEventSchema>;
