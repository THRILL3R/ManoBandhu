import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response.js';
import * as insightsService from './insights.service.js';

// ── GET /insights/weekly ───────────────────────────────────────────────────────
export async function getLatestWeeklyInsightController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await insightsService.getLatestWeeklyInsight(req.user!.userId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── GET /insights/weekly/:weekId ───────────────────────────────────────────────
export async function getWeeklyInsightByIdController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await insightsService.getWeeklyInsightById(
      req.user!.userId,
      req.params['weekId'] as string
    );
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── GET /insights/monthly ─────────────────────────────────────────────────────
export async function getMonthlyInsightController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await insightsService.getMonthlyInsight(req.user!.userId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── POST /insights/generate ───────────────────────────────────────────────────
export async function triggerInsightGenerationController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const targetUserId = req.body?.userId as string | undefined;
    const result = await insightsService.triggerInsightGeneration(
      req.user!.userId,
      targetUserId
    );
    sendSuccess(res, result, 202);
  } catch (err) { next(err); }
}
