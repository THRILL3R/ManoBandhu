import { Router } from 'express';
import { authenticate }  from '../../middleware/authenticate.js';
import { requirePlan }   from '../../middleware/requirePlan.js';
import { validate }      from '../../middleware/validate.js';
import { CreateDiarySchema, UpdateDiarySchema } from './diary.schemas.js';
import {
  getDiaryListController,
  createEntryController,
  getMediaUploadUrlController,
  searchEntriesController,
  getEntryController,
  updateEntryController,
  deleteEntryController,
} from './diary.controller.js';

const router = Router();

// All diary routes require authentication and a premium plan
router.use(authenticate, requirePlan('premium'));

// GET /api/v1/diary?page=1&limit=20
router.get('/', getDiaryListController);

// POST /api/v1/diary
router.post('/', validate(CreateDiarySchema), createEntryController);

// ⚠️  Static sub-routes MUST be declared BEFORE /:id to prevent Express
//     treating "media" or "search" as a path parameter value.

// GET /api/v1/diary/media/upload-url?ext=jpg
router.get('/media/upload-url', getMediaUploadUrlController);

// GET /api/v1/diary/search?tags=tag1,tag2&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
router.get('/search', searchEntriesController);

// GET /api/v1/diary/:id
router.get('/:id', getEntryController);

// PATCH /api/v1/diary/:id
router.patch('/:id', validate(UpdateDiarySchema), updateEntryController);

// DELETE /api/v1/diary/:id
router.delete('/:id', deleteEntryController);

export default router;
