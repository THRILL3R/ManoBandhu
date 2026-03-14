import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';

// Plan hierarchy: free = 0, premium = 1, premium_plus = 2
const PLAN_RANK: Record<string, number> = {
  free: 0,
  premium: 1,
  premium_plus: 2,
};

export function requirePlan(minPlan: 'premium' | 'premium_plus') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userPlan = req.user?.planType ?? 'free';
    const userRank = PLAN_RANK[userPlan] ?? 0;
    const requiredRank = PLAN_RANK[minPlan];

    if (userRank >= requiredRank) {
      next();
      return;
    }

    sendError(
      res,
      'PLAN_REQUIRED',
      `This feature requires the '${minPlan}' plan or higher`,
      403
    );
  };
}
