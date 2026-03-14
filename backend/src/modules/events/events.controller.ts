import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response.js';
import * as eventsService from './events.service.js';
import type { EventFilterInput, CreateEventInput, BookEventInput } from './events.schemas.js';

// ── GET /events ────────────────────────────────────────────────────────────────
export async function listEventsController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const filters  = req.query as unknown as EventFilterInput;
    const userId   = req.user?.userId;
    const result   = await eventsService.listEvents(filters, userId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── GET /events/my-bookings ────────────────────────────────────────────────────
export async function getMyBookingsController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await eventsService.getMyBookings(req.user!.userId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

// ── GET /events/:id ────────────────────────────────────────────────────────────
export async function getEventByIdController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.userId;
    const event  = await eventsService.getEventById(req.params['id'] as string, userId);
    sendSuccess(res, { event });
  } catch (err) { next(err); }
}

// ── POST /events/:id/book ──────────────────────────────────────────────────────
export async function bookEventController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    // The event_id comes from the route param, not request body
    const payload: BookEventInput = { event_id: req.params['id'] as string };
    const result  = await eventsService.bookEvent(req.user!.userId, payload);
    sendSuccess(res, result, 201);
  } catch (err) { next(err); }
}

// ── POST /events (admin) ───────────────────────────────────────────────────────
export async function createEventController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const event = await eventsService.createEvent(
      req.user!.userId,
      req.body as CreateEventInput
    );
    sendSuccess(res, { event }, 201);
  } catch (err) { next(err); }
}

// ── POST /events/listing-request ──────────────────────────────────────────────
export async function submitListingRequestController(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const result = await eventsService.submitListingRequest(
      req.user!.userId,
      req.body as CreateEventInput
    );
    sendSuccess(res, result, 202);
  } catch (err) { next(err); }
}
