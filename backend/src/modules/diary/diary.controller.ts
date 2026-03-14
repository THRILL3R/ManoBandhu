import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../../utils/response.js';
import * as diaryService from './diary.service.js';
import type { CreateDiaryInput, UpdateDiaryInput } from './diary.schemas.js';

// ── GET /diary ─────────────────────────────────────────────────────────────────
export async function getDiaryListController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const page  = Math.max(1, parseInt((req.query['page']  as string) || '1',  10));
    const limit = Math.min(100, Math.max(1, parseInt((req.query['limit'] as string) || '20', 10)));
    const result = await diaryService.getDiaryList(req.user!.userId, page, limit);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── POST /diary ────────────────────────────────────────────────────────────────
export async function createEntryController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const entry = await diaryService.createEntry(
      req.user!.userId,
      req.body as CreateDiaryInput
    );
    sendSuccess(res, { entry }, 201);
  } catch (err) { next(err); }
}

// ── GET /diary/:id ─────────────────────────────────────────────────────────────
export async function getEntryController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const entry = await diaryService.getEntry(
      req.user!.userId,
      req.params['id'] as string
    );
    sendSuccess(res, { entry });
  } catch (err) { next(err); }
}

// ── PATCH /diary/:id ───────────────────────────────────────────────────────────
export async function updateEntryController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const entry = await diaryService.updateEntry(
      req.user!.userId,
      req.params['id'] as string,
      req.body as UpdateDiaryInput
    );
    sendSuccess(res, { entry });
  } catch (err) { next(err); }
}

// ── DELETE /diary/:id ──────────────────────────────────────────────────────────
export async function deleteEntryController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await diaryService.deleteEntry(
      req.user!.userId,
      req.params['id'] as string
    );
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── GET /diary/media/upload-url ────────────────────────────────────────────────
export async function getMediaUploadUrlController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const ext = (req.query['ext'] as string) || 'bin';
    // Validate extension — alphanumeric, 1-10 chars only
    if (!/^[a-zA-Z0-9]{1,10}$/.test(ext)) {
      sendError(res, 'VALIDATION_ERROR', 'Invalid file extension', 400, 'ext');
      return;
    }
    const result = await diaryService.getMediaUploadUrl(req.user!.userId, ext);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── GET /diary/search ──────────────────────────────────────────────────────────
export async function searchEntriesController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const tagsRaw   = req.query['tags']       as string | undefined;
    const startDate = req.query['start_date'] as string | undefined;
    const endDate   = req.query['end_date']   as string | undefined;

    const tags = tagsRaw
      ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
      : undefined;

    const result = await diaryService.searchEntries(
      req.user!.userId,
      { tags, startDate, endDate }
    );
    sendSuccess(res, result);
  } catch (err) { next(err); }
}
