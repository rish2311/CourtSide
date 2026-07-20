import { Request, Response, NextFunction, RequestHandler } from "express";

// ─── asyncHandler ─────────────────────────────────────────────────────────────
// Wraps async route handlers so you never need try/catch in controllers.
// Any thrown error (including ApiError) is forwarded to errorMiddleware.
//
// Usage:
//   router.get("/venues", asyncHandler(async (req, res) => {
//     const venues = await VenueService.findAll();
//     new ApiResponse(res).success(venues);
//   }));

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
