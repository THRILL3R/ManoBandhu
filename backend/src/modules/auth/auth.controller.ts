import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../../utils/response.js';
import * as authService from './auth.service.js';
import type {
  RegisterInput,
  LoginInput,
  OtpSendInput,
  OtpVerifyInput,
  RefreshInput,
} from './auth.schemas.js';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.register(req.body as RegisterInput);
    sendSuccess(res, result, 201);
  } catch (err) {
    next(err);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.login(req.body as LoginInput);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
}

export async function sendOtpController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.sendOtp(req.body as OtpSendInput);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
}

export async function verifyOtpController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.verifyOtp(req.body as OtpVerifyInput);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
}

export async function refreshController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.refresh(req.body as RefreshInput);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
}

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { refreshToken } = req.body as { refreshToken?: string };

    if (!refreshToken) {
      sendError(res, 'VALIDATION_ERROR', 'refreshToken is required', 400);
      return;
    }

    const result = await authService.logout(userId, refreshToken);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
}
