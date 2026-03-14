import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  plan_type: z.enum(['free', 'premium', 'premium_plus']).optional().default('free'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const OtpSendSchema = z.object({
  // Indian mobile: optional +91 prefix then 10 digits starting with 6-9
  phone: z
    .string()
    .regex(/^(?:\+91)?[6-9]\d{9}$/, 'Invalid Indian mobile number'),
});

export const OtpVerifySchema = z.object({
  phone: z
    .string()
    .regex(/^(?:\+91)?[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must be numeric'),
});

export const RefreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type OtpSendInput = z.infer<typeof OtpSendSchema>;
export type OtpVerifyInput = z.infer<typeof OtpVerifySchema>;
export type RefreshInput = z.infer<typeof RefreshSchema>;
