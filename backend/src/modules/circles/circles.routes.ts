import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { requirePlan } from '../../middleware/requirePlan.js';
import { validate } from '../../middleware/validate.js';
import { SaveCircleSchema } from './circles.schemas.js';
import {
  getTodayCircleController,
  saveTodayCircleController,
  getHistoryController,
  getTrendsController,
} from './circles.controller.js';

const router = Router();

// All circles routes: authenticate + premium
router.use(authenticate, requirePlan('premium'));

// GET /circles/today
router.get('/today', getTodayCircleController);

// POST /circles/today
router.post('/today', validate(SaveCircleSchema), saveTodayCircleController);

// GET /circles/history?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
router.get('/history', getHistoryController);

// GET /circles/trends
router.get('/trends', getTrendsController);

export default router;
