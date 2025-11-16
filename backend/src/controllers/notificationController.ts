import type { Request, Response, NextFunction } from 'express';
import { sendHellNotification } from '../services/emailService.js';
import type { NotifyHellRequest, NotificationResponse } from '../types/index.js';

export async function notifyHellController(
  req: Request<{}, {}, NotifyHellRequest>,
  res: Response<NotificationResponse>,
  _next: NextFunction
): Promise<void> {
  try {
    const { exEmail, userName, reason } = req.body;

    await sendHellNotification(exEmail, userName, reason);

    res.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
    });
  }
}

export function getStatusController(
  _req: Request,
  res: Response
): void {
  res.json({
    message: 'The boulder rolls uphill! Keep pushing! 🪨',
    timestamp: new Date().toISOString(),
    status: 'active',
  });
}
