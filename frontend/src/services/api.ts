import type { ValidationResponse, NotificationResponse } from '../types';
import { ApiClient } from './apiClient';

// Singleton API client instance
const client = new ApiClient();

/**
 * Validate task with images using Claude AI
 */
export async function validateTask(
  images: string[],
  taskDescription: string
): Promise<ValidationResponse> {
  return client.post('/validate-task', {
    images,
    taskDescription,
  });
}

/**
 * Send notification email to ex when user goes to hell
 */
export async function notifyHell(
  exEmail: string,
  userName: string,
  reason: string
): Promise<NotificationResponse> {
  return client.post('/notify-hell', {
    exEmail,
    userName,
    reason,
  });
}

/**
 * Check API health status
 */
export async function checkStatus(): Promise<{ message: string; timestamp: string; status: string }> {
  return client.get('/status');
}
