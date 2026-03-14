import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { env } from './config/env.js';
import { pool, connectDB } from './config/db.js';
import { redis, connectRedis } from './config/redis.js';
import { logger } from './utils/logger.js';
import { sendError } from './utils/response.js';
import router from './routes/index.js';
import subscriptionRoutes from './modules/subscriptions/subscriptions.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { aiInsightsWorker, mediaCleanupWorker, notificationsWorker } from './jobs/workers.js';
import { scheduleWeeklyInsights } from './jobs/scheduler.js';

const app = express();

// ── 1. Security headers ───────────────────────────────────────────────────────
app.use(helmet());

// ── 2. CORS ───────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin:      env.FRONTEND_URL,
    credentials: true,
  })
);

// ── 3. Raw body parser for Razorpay webhook (MUST come BEFORE express.json) ──
// The /webhook route inside subscriptionRoutes applies its own express.raw()
// scoped only to that path; all other subscription routes still get JSON.
app.use('/api/v1/subscriptions', subscriptionRoutes);

// ── 4. JSON + URL-encoded body parsers ───────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── 5. HTTP request logging ───────────────────────────────────────────────────
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── 6. Response compression ───────────────────────────────────────────────────
app.use(compression() as express.RequestHandler);

// ── 7. Health check — tests DB (SELECT 1) and Redis (PING) live ──────────────
app.get('/api/health', async (_req, res) => {
  let dbStatus    = 'connected';
  let redisStatus = 'connected';

  try { await pool.query('SELECT 1'); }
  catch { dbStatus = 'error'; }

  try { await redis.ping(); }
  catch { redisStatus = 'error'; }

  const overall = dbStatus === 'connected' && redisStatus === 'connected' ? 'ok' : 'degraded';

  res.status(overall === 'ok' ? 200 : 503).json({
    success: overall === 'ok',
    data: {
      status:      overall,
      db:          dbStatus,
      redis:       redisStatus,
      version:     '1.0.0',
      environment: env.NODE_ENV,
      timestamp:   new Date().toISOString(),
    },
  });
});

// ── 8. Module routes ──────────────────────────────────────────────────────────
app.use('/api/v1', router);

// ── 9. 404 catch-all ─────────────────────────────────────────────────────────
app.use((_req, res) => {
  sendError(res, 'NOT_FOUND', 'Route not found', 404);
});

// ── 10. Global error handler — MUST be last ───────────────────────────────────
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────────────────────
async function start() {
  try {
    await connectDB();
    await connectRedis();

    // Workers self-register on import; reference them to keep alive + enable shutdown
    logger.info(
      `🔧 Workers: ${[aiInsightsWorker.name, mediaCleanupWorker.name, notificationsWorker.name].join(', ')}`
    );
    await scheduleWeeklyInsights();

    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 ManoBandhu API running on port ${env.PORT} [${env.NODE_ENV}]`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      logger.warn(`${signal} received — shutting down gracefully...`);
      server.close(async () => {
        await Promise.allSettled([
          aiInsightsWorker.close(),
          mediaCleanupWorker.close(),
          notificationsWorker.close(),
        ]);
        await pool.end();
        await redis.quit();
        logger.info('Server, DB pool, Redis, and workers closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT',  () => shutdown('SIGINT'));
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
