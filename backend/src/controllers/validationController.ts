import type { Request, Response, NextFunction } from 'express';
import { validateTask } from '../services/claudeService.js';
import type { ValidateTaskRequest, ValidationResponse } from '../types/index.js';
import { env } from '../config/env.js';

export async function validateTaskController(
  req: Request<{}, {}, ValidateTaskRequest>,
  res: Response<ValidationResponse>,
  _next: NextFunction
): Promise<void> {
  try {
    const { images, taskDescription } = req.body;

    console.log('Received task validation request with', images.length, 'images');
    console.log('Task Description:', taskDescription);

    if (!env.isClaudeConfigured) {
      res.status(500).json({
        success: false,
        explanation: 'Claude API key not configured. Please set ANTHROPIC_API_KEY environment variable.',
      });
      return;
    }

    const validationResult = await validateTask(images, taskDescription);
    res.json(validationResult);
  } catch (error) {
    console.error('Error validating task:', error);
    res.status(500).json({
      success: false,
      explanation: 'An error occurred while validating the task. Please try again.',
    });
  }
}
