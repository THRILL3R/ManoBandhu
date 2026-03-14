import { Router } from 'express';
import { joinWaitlistController, getPilotWaitlistController } from './waitlist.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { requireRole } from '../../middleware/requireRole.js';

const router = Router();

/** POST /api/v1/waitlist — public, no auth */
router.post('/', joinWaitlistController);

/** GET /api/v1/waitlist — admin only */
router.get('/', authenticate, requireRole('admin'), getPilotWaitlistController);

export default router;
