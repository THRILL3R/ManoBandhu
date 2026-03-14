import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import { UpdateProfileSchema } from './users.schemas.js';
import {
  getMeController,
  updateMeController,
  deleteMeController,
  getStatsController,
} from './users.controller.js';

const router = Router();

// All users routes require authentication
router.use(authenticate);

// GET /users/me
router.get('/me', getMeController);

// PATCH /users/me
router.patch('/me', validate(UpdateProfileSchema), updateMeController);

// DELETE /users/me
router.delete('/me', deleteMeController);

// GET /users/me/stats
router.get('/me/stats', getStatsController);

export default router;
