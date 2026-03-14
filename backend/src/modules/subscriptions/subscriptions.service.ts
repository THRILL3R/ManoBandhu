import crypto from 'node:crypto';
import Razorpay from 'razorpay';
import { pool } from '../../config/db.js';
import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';
import { PLAN_PRICES } from './subscriptions.schemas.js';
import type { CheckoutInput } from './subscriptions.schemas.js';

// ── Razorpay client ───────────────────────────────────────────────────────────
const razorpay = new Razorpay({
  key_id:     env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

// ── Plan metadata (features, savings) ─────────────────────────────────────────
const PLAN_FEATURES = {
  free: [
    'Emotion tracker (basic)',
    'Morning & night rituals',
    'Community circles (read-only)',
  ],
  premium: [
    'Everything in Free',
    'Private self-diary (encrypted)',
    'Emotion patterns & insights',
    'Regulation sessions',
    'Community circles (full access)',
    'Priority support',
  ],
  premium_plus: [
    'Everything in Premium',
    'AI companion (ManoBandhu GPT)',
    'Unlimited wellness events',
    'Advanced analytics dashboard',
    'Family plan (up to 3 members)',
    'Dedicated wellness coach',
  ],
};

// ── getPlans ──────────────────────────────────────────────────────────────────
export function getPlans() {
  const monthlyPremium     = PLAN_PRICES.premium_monthly;
  const yearlyPremium      = PLAN_PRICES.premium_yearly;
  const monthlyPremiumPlus = PLAN_PRICES.premium_plus_monthly;
  const yearlyPremiumPlus  = PLAN_PRICES.premium_plus_yearly;

  const premiumMonthlySavings     = 0;
  const premiumYearlySavings      = Math.round((1 - yearlyPremium / (monthlyPremium * 12)) * 100);
  const premiumPlusMonthlySavings = 0;
  const premiumPlusYearlySavings  = Math.round((1 - yearlyPremiumPlus / (monthlyPremiumPlus * 12)) * 100);

  return {
    plans: [
      {
        plan_type:    'free',
        display_name: 'Free',
        price_inr:    0,
        billing:      null,
        features:     PLAN_FEATURES.free,
      },
      {
        plan_type:    'premium',
        display_name: 'Premium',
        prices: {
          monthly: { amount_inr: monthlyPremium / 100, amount_paise: monthlyPremium, savings_pct: premiumMonthlySavings },
          yearly:  { amount_inr: yearlyPremium  / 100, amount_paise: yearlyPremium,  savings_pct: premiumYearlySavings  },
        },
        features: PLAN_FEATURES.premium,
      },
      {
        plan_type:    'premium_plus',
        display_name: 'Premium Plus',
        prices: {
          monthly: { amount_inr: monthlyPremiumPlus / 100, amount_paise: monthlyPremiumPlus, savings_pct: premiumPlusMonthlySavings },
          yearly:  { amount_inr: yearlyPremiumPlus  / 100, amount_paise: yearlyPremiumPlus,  savings_pct: premiumPlusYearlySavings  },
        },
        features: PLAN_FEATURES.premium_plus,
      },
    ],
  };
}

// ── createCheckout ────────────────────────────────────────────────────────────
export async function createCheckout(userId: string, data: CheckoutInput) {
  const priceKey = `${data.plan_type}_${data.billing_cycle}` as keyof typeof PLAN_PRICES;
  const amount   = PLAN_PRICES[priceKey]; // in paise

  // Fetch user name/email for Razorpay prefill
  const { rows: userRows } = await pool.query<{ name: string; email: string }>(
    `SELECT name, email FROM users WHERE id = $1`,
    [userId]
  );
  const user = userRows[0];
  if (!user) {
    const err = new Error('User not found');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }

  // Create Razorpay order
  const order = await razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt:  `sub_${userId.slice(0, 8)}_${Date.now()}`,
    notes:    { userId, plan_type: data.plan_type, billing_cycle: data.billing_cycle },
  });

  // Compute subscription period dates
  const startedAt = new Date();
  const periodEnd = new Date(startedAt);
  if (data.billing_cycle === 'monthly') {
    periodEnd.setMonth(periodEnd.getMonth() + 1);
  } else {
    periodEnd.setFullYear(periodEnd.getFullYear() + 1);
  }

  // Insert pending subscription record
  await pool.query(
    `INSERT INTO subscriptions
       (user_id, plan_type, status, billing_cycle,
        razorpay_subscription_id, razorpay_plan_id,
        current_period_start, current_period_end)
     VALUES ($1, $2, 'pending', $3, $4, $5, $6, $7)
     ON CONFLICT DO NOTHING`,
    [
      userId,
      data.plan_type,
      data.billing_cycle,
      order.id,           // razorpay_subscription_id → store orderId for MVP
      null,               // razorpay_plan_id (set when Razorpay plan object is created in Phase 2)
      startedAt,
      periodEnd,
    ]
  );

  return {
    orderId:  order.id,
    amount,
    currency: 'INR' as const,
    keyId:    env.RAZORPAY_KEY_ID,
    prefill:  { name: user.name, email: user.email },
  };
}

// ── handleWebhook ─────────────────────────────────────────────────────────────
export async function handleWebhook(rawBody: Buffer, signature: string) {
  // 1. Validate HMAC-SHA256 signature
  const expectedSig = crypto
    .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  if (expectedSig !== signature) {
    const err = new Error('Invalid webhook signature');
    (err as { statusCode?: number }).statusCode = 401;
    throw err;
  }

  // 2. Parse payload
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody.toString('utf8')) as Record<string, unknown>;
  } catch {
    const err = new Error('Invalid JSON payload');
    (err as { statusCode?: number }).statusCode = 400;
    throw err;
  }

  const event = payload['event'] as string | undefined;

  // 3. Process events asynchronously (fire-and-forget after signature validation)
  setImmediate(() => {
    processWebhookEvent(event, payload).catch((err: unknown) => {
      logger.error('Webhook processing error:', err);
    });
  });

  return { received: true };
}

async function processWebhookEvent(
  event:   string | undefined,
  payload: Record<string, unknown>
) {
  try {
    if (event === 'payment.captured') {
      const paymentEntity = ((payload['payload'] as Record<string, unknown>)?.['payment'] as Record<string, unknown>)?.['entity'] as Record<string, unknown> | undefined;
      const orderId       = paymentEntity?.['order_id'] as string | undefined;
      if (!orderId) return;

      // Idempotent: check subscription exists for this orderId
      const { rows } = await pool.query<{ id: string; user_id: string; plan_type: string }>(
        `SELECT id, user_id, plan_type FROM subscriptions WHERE razorpay_subscription_id = $1`,
        [orderId]
      );
      const sub = rows[0];
      if (!sub || sub.plan_type === 'free') return; // already processed or invalid

      await pool.query(
        `UPDATE subscriptions SET status = 'active', updated_at = NOW()
         WHERE razorpay_subscription_id = $1 AND status = 'pending'`,
        [orderId]
      );

      await pool.query(
        `UPDATE users SET plan_type = $1, updated_at = NOW() WHERE id = $2`,
        [sub.plan_type, sub.user_id]
      );

      logger.info(`[Webhook] payment.captured — user ${sub.user_id} upgraded to ${sub.plan_type}`);

    } else if (event === 'subscription.cancelled') {
      const subEntity = ((payload['payload'] as Record<string, unknown>)?.['subscription'] as Record<string, unknown>)?.['entity'] as Record<string, unknown> | undefined;
      const razorSubId = subEntity?.['id'] as string | undefined;
      if (!razorSubId) return;

      await pool.query(
        `UPDATE subscriptions SET status = 'cancelled', cancelled_at = NOW(), updated_at = NOW()
         WHERE razorpay_subscription_id = $1 AND status NOT IN ('cancelled','expired')`,
        [razorSubId]
      );

      logger.info(`[Webhook] subscription.cancelled — ${razorSubId}`);

    } else if (event === 'refund.created') {
      const paymentEntity = ((payload['payload'] as Record<string, unknown>)?.['refund'] as Record<string, unknown>)?.['entity'] as Record<string, unknown> | undefined;
      const paymentId     = paymentEntity?.['payment_id'] as string | undefined;
      if (!paymentId) return;

      // Find subscription via payment (best-effort for MVP: look up by any active sub for this refund)
      const { rows } = await pool.query<{ id: string; user_id: string }>(
        `SELECT s.id, s.user_id FROM subscriptions s
         WHERE s.status IN ('active','cancelling')
         ORDER BY s.created_at DESC LIMIT 1`
      );
      const sub = rows[0];
      if (!sub) return;

      await pool.query(
        `UPDATE subscriptions SET status = 'cancelled', cancelled_at = NOW(), updated_at = NOW()
         WHERE id = $1`,
        [sub.id]
      );
      await pool.query(
        `UPDATE users SET plan_type = 'free', updated_at = NOW() WHERE id = $1`,
        [sub.user_id]
      );

      logger.info(`[Webhook] refund.created — user ${sub.user_id} reverted to free`);
    }
  } catch (err) {
    logger.error('[Webhook] processWebhookEvent error:', err);
  }
}

// ── getMySubscription ─────────────────────────────────────────────────────────
export async function getMySubscription(userId: string) {
  const { rows } = await pool.query(
    `SELECT id, plan_type, status, billing_cycle,
            started_at, current_period_start, current_period_end, cancelled_at
     FROM subscriptions
     WHERE user_id = $1
       AND status IN ('active', 'cancelling')
     ORDER BY created_at DESC
     LIMIT 1`,
    [userId]
  );

  if (rows.length === 0) {
    return { plan: 'free', status: 'none' };
  }

  return rows[0];
}

// ── cancelSubscription ────────────────────────────────────────────────────────
export async function cancelSubscription(userId: string) {
  const { rows } = await pool.query<{
    id: string; razorpay_subscription_id: string; current_period_end: Date;
  }>(
    `SELECT id, razorpay_subscription_id, current_period_end
     FROM subscriptions
     WHERE user_id = $1 AND status = 'active'
     ORDER BY created_at DESC LIMIT 1`,
    [userId]
  );

  const sub = rows[0];
  if (!sub) {
    const err = new Error('No active subscription found');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }

  // Attempt to cancel on Razorpay (best-effort; Phase 2 will have a real subscription ID)
  try {
    if (sub.razorpay_subscription_id?.startsWith('sub_')) {
      // Only real Razorpay subscription IDs (not order IDs) can be cancelled here
      await razorpay.subscriptions.cancel(sub.razorpay_subscription_id, true);
    }
  } catch (err) {
    // Log but don't block — we still update our own DB record
    logger.warn('[cancelSubscription] Razorpay cancel failed (MVP order-mode):', err);
  }

  await pool.query(
    `UPDATE subscriptions SET status = 'cancelling', updated_at = NOW() WHERE id = $1`,
    [sub.id]
  );

  return {
    message:    'Your subscription will be cancelled at the end of the current billing period.',
    cancelDate: sub.current_period_end,
  };
}
