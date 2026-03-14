import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../utils/response.js';

export function validate(schema: ZodSchema, source: 'body' | 'query' = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const input  = source === 'query' ? req.query : req.body;
    const result = schema.safeParse(input);

    if (result.success) {
      if (source === 'query') {
        // Attach coerced query params to req for downstream use
        (req as Request & { parsedQuery?: unknown }).parsedQuery = result.data;
      } else {
        req.body = result.data; // replace with parsed/coerced data
      }
      next();
      return;
    }

    const firstIssue = (result.error as ZodError).issues[0];
    const field   = firstIssue?.path.join('.') || undefined;
    const message = firstIssue?.message || 'Validation failed';

    sendError(res, 'VALIDATION_ERROR', message, 400, field);
  };
}
