import type { ValidationResponse, NotificationResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function validateTask(
  images: string[],
  taskDescription: string
): Promise<ValidationResponse> {
  const response = await fetch(`${API_BASE_URL}/validate-task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      images,
      taskDescription,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to validate task');
  }

  return response.json();
}

export async function notifyHell(
  exEmail: string,
  userName: string,
  reason: string
): Promise<NotificationResponse> {
  const response = await fetch(`${API_BASE_URL}/notify-hell`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      exEmail,
      userName,
      reason,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send notification');
  }

  return response.json();
}

export async function checkStatus(): Promise<{ message: string; timestamp: string; status: string }> {
  const response = await fetch(`${API_BASE_URL}/status`);

  if (!response.ok) {
    throw new Error('Failed to check status');
  }

  return response.json();
}
