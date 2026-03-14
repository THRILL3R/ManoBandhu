import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authLimiter, otpLimiter } from '../../middleware/rateLimiter.js';
import {
  RegisterSchema,
  LoginSchema,
  OtpSendSchema,
  OtpVerifySchema,
  RefreshSchema,
} from './auth.schemas.js';
import {
  registerController,
  loginController,
  sendOtpController,
  verifyOtpController,
  refreshController,
  logoutController,
} from './auth.controller.js';

const router = Router();

// POST /auth/register
router.post('/register', validate(RegisterSchema), registerController);

// POST /auth/login — stricter IP-based rate limit
router.post('/login', authLimiter, validate(LoginSchema), loginController);

// POST /auth/otp/send — Redis-backed 3/10min per phone limit
router.post('/otp/send', otpLimiter, validate(OtpSendSchema), sendOtpController);

// POST /auth/otp/verify
router.post('/otp/verify', validate(OtpVerifySchema), verifyOtpController);

// POST /auth/refresh — token rotation
router.post('/refresh', validate(RefreshSchema), refreshController);

// POST /auth/logout — requires valid access token
router.post('/logout', authenticate, logoutController);

export default router;
