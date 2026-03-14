import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';

/**
 * requireRole — authorises only users with the specified role.
 * Must be used AFTER authenticate (which sets req.user with isAdmin from JWT).
 *
 * Currently supports: 'admin' — checked via req.user.isAdmin from JWT payload.
 */
export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (role === 'admin' && req.user?.isAdmin === true) {
      next();
      return;
    }

    sendError(
      res,
      'FORBIDDEN',
      `This action requires the '${role}' role`,
      403
    );
  };
}
