// ─── ApiError ─────────────────────────────────────────────────────────────────
// Extend the native Error so we can throw structured HTTP errors anywhere
// in the application and catch them in a single errorMiddleware.

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors: Record<string, string[]>;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    errors: Record<string, string[]> = {},
    isOperational = true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational; // false = programmer error, not user error

    // Restore prototype chain (required when extending built-ins in TS)
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture clean stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  // ─── Convenience Factory Methods ────────────────────────────────────────────

  static badRequest(message: string, errors?: Record<string, string[]>) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, message);
  }

  static conflict(message: string, errors?: Record<string, string[]>) {
    return new ApiError(409, message, errors);
  }

  static internal(message = "Internal Server Error") {
    return new ApiError(500, message, {}, false);
  }
}
