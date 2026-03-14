import { Router } from 'express';
import { authenticate }  from '../../middleware/authenticate.js';
import { requirePlan }   from '../../middleware/requirePlan.js';
import { requireRole }   from '../../middleware/requireRole.js';
import {
  getLatestWeeklyInsightController,
  getWeeklyInsightByIdController,
  getMonthlyInsightController,
  triggerInsightGenerationController,
} from './insights.controller.js';

const router = Router();

// GET /api/v1/insights/weekly — most recent completed insight
router.get('/weekly', authenticate, requirePlan('premium'), getLatestWeeklyInsightController);

// GET /api/v1/insights/weekly/:weekId — specific insight by ID
router.get('/weekly/:weekId', authenticate, requirePlan('premium'), getWeeklyInsightByIdController);

// GET /api/v1/insights/monthly — 4-week aggregate
router.get('/monthly', authenticate, requirePlan('premium'), getMonthlyInsightController);

// POST /api/v1/insights/generate — admin: manually trigger generation
router.post('/generate', authenticate, requireRole('admin'), triggerInsightGenerationController);

export default router;
