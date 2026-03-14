import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { requirePlan } from '../../middleware/requirePlan.js';
import { validate } from '../../middleware/validate.js';
import { CompleteMorningSchema, CompleteNightSchema } from './rituals.schemas.js';
import {
  getMorningTodayController,
  completeMorningController,
  getNightTodayController,
  completeNightController,
  getCompletionStatsController,
} from './rituals.controller.js';

const router = Router();

// All ritual routes: authenticate + premium
router.use(authenticate, requirePlan('premium'));

// GET /rituals/morning/today
router.get('/morning/today', getMorningTodayController);

// POST /rituals/morning/complete
router.post('/morning/complete', validate(CompleteMorningSchema), completeMorningController);

// GET /rituals/night/today
router.get('/night/today', getNightTodayController);

// POST /rituals/night/complete
router.post('/night/complete', validate(CompleteNightSchema), completeNightController);

// GET /rituals/completion
router.get('/completion', getCompletionStatsController);

export default router;
