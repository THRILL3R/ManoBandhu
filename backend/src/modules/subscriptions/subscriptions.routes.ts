import { Router } from 'express';
import express from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { validate }     from '../../middleware/validate.js';
import { CheckoutSchema } from './subscriptions.schemas.js';
import {
  getPlansController,
  createCheckoutController,
  handleWebhookController,
  getMySubscriptionController,
  cancelSubscriptionController,
} from './subscriptions.controller.js';

const router = Router();

// GET /api/v1/subscriptions/plans  — public, no auth required
router.get('/plans', getPlansController);

// POST /api/v1/subscriptions/checkout
router.post('/checkout', authenticate, validate(CheckoutSchema), createCheckoutController);

// POST /api/v1/subscriptions/webhook
// ⚠️  MUST use express.raw() to preserve the raw bytes needed for HMAC validation.
//     This middleware is scoped only to this route — other subscription routes
//     still receive JSON bodies from the global express.json() in index.ts.
//     NOTE: this router is mounted BEFORE express.json() in index.ts so that
//     the global parser never touches these bytes.
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhookController
);

// GET /api/v1/subscriptions/me
router.get('/me', authenticate, getMySubscriptionController);

// POST /api/v1/subscriptions/cancel
router.post('/cancel', authenticate, cancelSubscriptionController);

export default router;
