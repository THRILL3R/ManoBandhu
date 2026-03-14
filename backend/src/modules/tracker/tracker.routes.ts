import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { requirePlan } from '../../middleware/requirePlan.js';
import { validate } from '../../middleware/validate.js';
import { LogEmotionSchema } from './tracker.schemas.js';
import {
  getGridController,
  logEmotionController,
  getLogByDateController,
  getStreakController,
  getPatternsController,
} from './tracker.controller.js';

const router = Router();

// All tracker routes require authentication
router.use(authenticate);

// GET /tracker/grid?year=2025
router.get('/grid', getGridController);

// POST /tracker/log
router.post('/log', validate(LogEmotionSchema), logEmotionController);

// GET /tracker/log/:date
router.get('/log/:date', getLogByDateController);

// GET /tracker/streak
router.get('/streak', getStreakController);

// GET /tracker/patterns?days=30|90 — Premium only
router.get('/patterns', requirePlan('premium'), getPatternsController);

export default router;
