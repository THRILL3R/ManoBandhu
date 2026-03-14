import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface SuccessEnvelope<T> {
  success: true;
  data: T;
  meta: {
    requestId: string;
    timestamp: string;
  };
}

interface ErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string;
    field?: string;
  };
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200
): Response<SuccessEnvelope<T>> {
  return res.status(statusCode).json({
    success: true,
    data,
    meta: {
      requestId: uuidv4(),
      timestamp: new Date().toISOString(),
    },
  });
}

export function sendError(
  res: Response,
  code: string,
  message: string,
  statusCode = 400,
  field?: string
): Response<ErrorEnvelope> {
  const payload: ErrorEnvelope = {
    success: false,
    error: { code, message, ...(field ? { field } : {}) },
  };
  return res.status(statusCode).json(payload);
}
