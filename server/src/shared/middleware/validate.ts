import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * Generic Zod validation middleware.
 * Usage: router.post("/register", validate(registerSchema), registerController)
 *
 * Validates req.body against the provided schema.
 * On failure, responds with 422 and a structured error list.
 * On success, replaces req.body with the parsed (sanitised) data and calls next().
 */
export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      res.status(422).json({
        success: false,
        message: "Validation failed",
        errors,
      });
      return;
    }

    // Replace body with sanitised / coerced data (e.g. trimmed, lowercased)
    req.body = result.data;
    next();
  };
