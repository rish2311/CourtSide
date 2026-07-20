import { Response } from "express";

// ─── ApiResponse ──────────────────────────────────────────────────────────────
// Standardises every success response sent from the server.
// Usage: new ApiResponse(res).success({ user }, "Profile fetched", 200)

export class ApiResponse {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  success<T>(data: T, message = "Success", statusCode = 200) {
    return this.res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  created<T>(data: T, message = "Created successfully") {
    return this.success(data, message, 201);
  }

  noContent(message = "Deleted successfully") {
    return this.res.status(204).json({
      success: true,
      message,
    });
  }
}
