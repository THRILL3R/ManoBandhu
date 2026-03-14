import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../../utils/response.js';
import * as trackerService from './tracker.service.js';
import type { LogEmotionInput } from './tracker.schemas.js';

export async function getGridController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const year = req.query.year
      ? parseInt(req.query.year as string, 10)
      : new Date().getFullYear();

    if (isNaN(year) || year < 2000 || year > 2100) {
      sendError(res, 'VALIDATION_ERROR', 'year must be a valid 4-digit year', 400, 'year');
      return;
    }

    const data = await trackerService.getGrid(req.user!.userId, year);
    sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
}

export async function logEmotionController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const log = await trackerService.logEmotion(
      req.user!.userId,
      req.body as LogEmotionInput
    );
    sendSuccess(res, { log }, 201);
  } catch (err) {
    next(err);
  }
}

export async function getLogByDateController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const date = req.params['date'] as string;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      sendError(res, 'VALIDATION_ERROR', 'date must be YYYY-MM-DD', 400, 'date');
      return;
    }

    const log = await trackerService.getLogByDate(req.user!.userId, date);
    sendSuccess(res, { log }); // log may be null — that's OK
  } catch (err) {
    next(err);
  }
}

export async function getStreakController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const streak = await trackerService.getStreak(req.user!.userId);
    sendSuccess(res, streak);
  } catch (err) {
    next(err);
  }
}

export async function getPatternsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const raw = req.query.days as string | undefined;
    const days = raw === '90' ? 90 : 30;

    const patterns = await trackerService.getPatterns(req.user!.userId, days);
    sendSuccess(res, patterns);
  } catch (err) {
    next(err);
  }
}
