import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';

/**
 * optionalAuth — like authenticate but never blocks the request.
 * If a valid Bearer token is present → sets req.user (including isAdmin).
 * If no token / invalid token → sets req.user = undefined and continues.
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    try {
      const payload = verifyAccessToken(token);
      req.user = {
        userId:   payload.userId,
        planType: payload.planType,
        isAdmin:  payload.isAdmin ?? false,
      };
    } catch {
      // Invalid / expired token — treat as unauthenticated, don't 401
      req.user = undefined;
    }
  }

  next();
}
