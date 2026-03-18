import { NextFunction, Request, Response } from 'express';
import { WaitlistSchema } from './waitlist.schemas.js';
import { joinWaitlist, getPilotWaitlist } from './waitlist.service.js';
import { sendSuccess, sendError } from '../../utils/response.js';

export async function joinWaitlistController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const parsed = WaitlistSchema.safeParse(req.body);
  if (!parsed.success) {
    sendError(res, 'VALIDATION_ERROR', parsed.error.issues[0]?.message ?? 'Invalid input', 422);
    return;
  }

  try {
    const result = await joinWaitlist(parsed.data);

    if (result.alreadyRegistered) {
      sendSuccess(res, {
        message: "You're already on our waitlist! We'll be in touch soon.",
        id: result.id,
        alreadyRegistered: true
      });
      return;
    }

    sendSuccess(
      res,
      { 
        message: "You're on the waitlist! Check your email for confirmation. 🌿",
        alreadyRegistered: false
      },
      201
    );
  } catch (err) {
    next(err);
  }
}

export async function getPilotWaitlistController(req: Request, res: Response): Promise<void> {
  const page  = Math.max(1, Number(req.query['page'])  || 1);
  const limit = Math.min(100, Number(req.query['limit']) || 50);
  const result = await getPilotWaitlist(page, limit);
  sendSuccess(res, result);
}

import { sendConfirmationEmail } from '../../utils/emailService.js';

export const notifyWaitlistController = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    await sendConfirmationEmail(email, name);

    return res.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ success: false });
  }
};
