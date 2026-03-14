import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { requirePlan } from '../../middleware/requirePlan.js';
import { validate } from '../../middleware/validate.js';
import {
  StartSessionSchema,
  UpdateStepSchema,
  CompleteSessionSchema,
} from './regulation.schemas.js';
import {
  startSessionController,
  updateStepController,
  completeSessionController,
  getHistoryController,
  getStatsController,
} from './regulation.controller.js';

const router = Router();

// All regulation routes require authentication + premium plan
router.use(authenticate, requirePlan('premium'));

// POST /regulation/start
router.post('/start', validate(StartSessionSchema), startSessionController);

// PATCH /regulation/:id/step
router.patch('/:id/step', validate(UpdateStepSchema), updateStepController);

// POST /regulation/:id/complete
router.post('/:id/complete', validate(CompleteSessionSchema), completeSessionController);

// GET /regulation/history?page=1&limit=10
router.get('/history', getHistoryController);

// GET /regulation/stats
router.get('/stats', getStatsController);

export default router;
