import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../../utils/response.js';
import * as circlesService from './circles.service.js';
import type { SaveCircleInput } from './circles.schemas.js';

export async function getTodayCircleController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await circlesService.getTodayCircle(req.user!.userId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function saveTodayCircleController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await circlesService.saveTodayCircle(
      req.user!.userId, req.body as SaveCircleInput
    );
    sendSuccess(res, result, 201);
  } catch (err) { next(err); }
}

export async function getHistoryController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const startDate = (req.query.start_date as string) || '2020-01-01';
    const endDate = (req.query.end_date as string) || new Date().toISOString().slice(0, 10);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      sendError(res, 'VALIDATION_ERROR', 'start_date and end_date must be YYYY-MM-DD', 400);
      return;
    }

    const result = await circlesService.getHistory(req.user!.userId, startDate, endDate);
    sendSuccess(res, { history: result });
  } catch (err) { next(err); }
}

export async function getTrendsController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const trends = await circlesService.getTrends(req.user!.userId);
    sendSuccess(res, trends);
  } catch (err) { next(err); }
}
