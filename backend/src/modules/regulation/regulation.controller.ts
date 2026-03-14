import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response.js';
import * as regulationService from './regulation.service.js';
import type {
  StartSessionInput,
  UpdateStepInput,
  CompleteSessionInput,
} from './regulation.schemas.js';

export async function startSessionController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await regulationService.startSession(
      req.user!.userId,
      req.body as StartSessionInput
    );
    sendSuccess(res, result, 201);
  } catch (err) {
    next(err);
  }
}

export async function updateStepController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const sessionId = req.params['id'] as string;
    const session = await regulationService.updateStep(
      req.user!.userId,
      sessionId,
      req.body as UpdateStepInput
    );
    sendSuccess(res, { session });
  } catch (err) {
    next(err);
  }
}

export async function completeSessionController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const sessionId = req.params['id'] as string;
    const result = await regulationService.completeSession(
      req.user!.userId,
      sessionId,
      req.body as CompleteSessionInput
    );
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getHistoryController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '10', 10);
    const result = await regulationService.getHistory(req.user!.userId, page, limit);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getStatsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const stats = await regulationService.getStats(req.user!.userId);
    sendSuccess(res, { stats });
  } catch (err) {
    next(err);
  }
}
