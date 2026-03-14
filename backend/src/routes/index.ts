import { Router } from 'express';
import authRoutes          from '../modules/auth/auth.routes.js';
import usersRoutes         from '../modules/users/users.routes.js';
import trackerRoutes       from '../modules/tracker/tracker.routes.js';
import regulationRoutes    from '../modules/regulation/regulation.routes.js';
import ritualsRoutes       from '../modules/rituals/rituals.routes.js';
import circlesRoutes       from '../modules/circles/circles.routes.js';
import diaryRoutes         from '../modules/diary/diary.routes.js';
import eventsRoutes        from '../modules/events/events.routes.js';
import insightsRoutes      from '../modules/insights/insights.routes.js';
import waitlistRoutes      from '../modules/waitlist/waitlist.routes.js';
// subscriptionsRoutes is mounted BEFORE express.json() in index.ts (webhook raw body requirement)


const router = Router();

// ── Module Routes ────────────────────────────────────────────────────────────
router.use('/auth',       authRoutes);
router.use('/users',      usersRoutes);
router.use('/tracker',    trackerRoutes);
router.use('/regulation', regulationRoutes);
router.use('/rituals',    ritualsRoutes);
router.use('/circles',    circlesRoutes);
router.use('/diary',      diaryRoutes);
router.use('/events',     eventsRoutes);
router.use('/insights',   insightsRoutes);
router.use('/waitlist',   waitlistRoutes);

export default router;
