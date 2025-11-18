import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

// Validation schemas
export const validateTaskSchema = z.object({
  images: z.array(z.string()).min(1, 'At least one image is required'),
  taskDescription: z.string().min(1, 'Task description is required'),
});

export const notifyHellSchema = z.object({
  exEmail: z.string().email('Invalid email address'),
  userName: z.string().min(1, 'User name is required'),
  reason: z.string().min(1, 'Reason is required'),
});

// Validation middleware factory
export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
}
