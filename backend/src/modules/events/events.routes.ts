import { Router } from 'express';
import { authenticate }   from '../../middleware/authenticate.js';
import { optionalAuth }   from '../../middleware/optionalAuth.js';
import { requireRole }    from '../../middleware/requireRole.js';
import { validate }       from '../../middleware/validate.js';
import { EventFilterSchema, CreateEventSchema } from './events.schemas.js';
import {
  listEventsController,
  getMyBookingsController,
  getEventByIdController,
  bookEventController,
  createEventController,
  submitListingRequestController,
} from './events.controller.js';

const router = Router();

// GET /api/v1/events?city=...&category=...&date_from=...
router.get('/', optionalAuth, validate(EventFilterSchema, 'query'), listEventsController);

// ⚠️  Static sub-routes MUST be declared BEFORE /:id to avoid param collision

// GET /api/v1/events/my-bookings
router.get('/my-bookings', authenticate, getMyBookingsController);

// POST /api/v1/events/listing-request
router.post('/listing-request', authenticate, validate(CreateEventSchema), submitListingRequestController);

// POST /api/v1/events (admin only — create published event)
router.post('/', authenticate, requireRole('admin'), validate(CreateEventSchema), createEventController);

// GET /api/v1/events/:id
router.get('/:id', optionalAuth, getEventByIdController);

// POST /api/v1/events/:id/book
router.post('/:id/book', authenticate, bookEventController);

export default router;
