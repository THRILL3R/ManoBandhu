import { z } from 'zod';

// Indian mobile: 10 digits optionally prefixed with +91 or 91
const indianMobile = z
  .string()
  .regex(
    /^(\+91|91)?[6-9]\d{9}$/,
    'Enter a valid Indian mobile number (e.g. 9876543210 or +919876543210)'
  );

export const WaitlistSchema = z.object({
  full_name:  z.string().min(2).max(100).trim(),
  email:      z.string().email().toLowerCase().trim(),
  mobile:     indianMobile,
  occupation: z.string().max(100).trim().optional(),
  city:       z.string().max(100).trim().optional(),
});

export type WaitlistInput = z.infer<typeof WaitlistSchema>;
