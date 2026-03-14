import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response.js';
import * as subscriptionsService from './subscriptions.service.js';
import type { CheckoutInput } from './subscriptions.schemas.js';

// ── GET /subscriptions/plans ──────────────────────────────────────────────────
export async function getPlansController(
  _req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = subscriptionsService.getPlans();
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── POST /subscriptions/checkout ──────────────────────────────────────────────
export async function createCheckoutController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await subscriptionsService.createCheckout(
      req.user!.userId,
      req.body as CheckoutInput
    );
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── POST /subscriptions/webhook ───────────────────────────────────────────────
export async function handleWebhookController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const signature = req.headers['x-razorpay-signature'] as string | undefined;
    if (!signature) {
      res.status(400).json({ error: 'Missing x-razorpay-signature header' });
      return;
    }
    // req.body is a Buffer here (express.raw middleware applied in routes)
    const rawBody = req.body as Buffer;
    const result  = await subscriptionsService.handleWebhook(rawBody, signature);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── GET /subscriptions/me ─────────────────────────────────────────────────────
export async function getMySubscriptionController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await subscriptionsService.getMySubscription(req.user!.userId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── POST /subscriptions/cancel ────────────────────────────────────────────────
export async function cancelSubscriptionController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await subscriptionsService.cancelSubscription(req.user!.userId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}
