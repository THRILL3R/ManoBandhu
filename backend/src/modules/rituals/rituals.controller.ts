import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response.js';
import * as ritualsService from './rituals.service.js';
import type { CompleteMorningInput, CompleteNightInput } from './rituals.schemas.js';

export async function getMorningTodayController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await ritualsService.getMorningToday(req.user!.userId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function completeMorningController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await ritualsService.completeMorning(
      req.user!.userId, req.body as CompleteMorningInput
    );
    sendSuccess(res, result, 201);
  } catch (err) { next(err); }
}

export async function getNightTodayController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await ritualsService.getNightToday(req.user!.userId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function completeNightController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await ritualsService.completeNight(
      req.user!.userId, req.body as CompleteNightInput
    );
    sendSuccess(res, result, 201);
  } catch (err) { next(err); }
}

export async function getCompletionStatsController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const stats = await ritualsService.getCompletionStats(req.user!.userId);
    sendSuccess(res, { stats });
  } catch (err) { next(err); }
}
