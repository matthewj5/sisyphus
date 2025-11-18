// Request types
export interface ValidateTaskRequest {
  images: string[];
  taskDescription: string;
}

export interface NotifyHellRequest {
  exEmail: string;
  userName: string;
  reason: string;
}

// Response types
export interface ValidationResponse {
  success: boolean;
  explanation: string;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
}

export interface StatusResponse {
  message: string;
  timestamp: string;
  status: string;
}

// Claude API types - using proper SDK types
export type ClaudeMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
