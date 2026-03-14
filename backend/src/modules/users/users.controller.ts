import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response.js';
import * as usersService from './users.service.js';
import type { UpdateProfileInput } from './users.schemas.js';

export async function getMeController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await usersService.getMe(req.user!.userId);
    sendSuccess(res, { user });
  } catch (err) {
    next(err);
  }
}

export async function updateMeController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await usersService.updateMe(
      req.user!.userId,
      req.body as UpdateProfileInput
    );
    sendSuccess(res, { user });
  } catch (err) {
    next(err);
  }
}

export async function deleteMeController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await usersService.deleteMe(req.user!.userId);
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
    const stats = await usersService.getStats(req.user!.userId);
    sendSuccess(res, { stats });
  } catch (err) {
    next(err);
  }
}
