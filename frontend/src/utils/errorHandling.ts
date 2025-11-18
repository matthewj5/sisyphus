export interface ErrorContext {
  action: string; // e.g., 'camera_access', 'validation', 'notification'
  userMessage: string;
  shouldAlert?: boolean; // Use alert() for critical errors
}

/**
 * Centralized error handling utility
 * Logs errors consistently and provides user feedback
 */
export function handleError(error: unknown, context: ErrorContext): void {
  // Consistent error logging format
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`[${context.action}]`, errorMessage, error);

  // Show user-friendly message
  if (context.userMessage) {
    if (context.shouldAlert) {
      // Use alert for critical errors (camera access, etc.)
      alert(context.userMessage);
    }
    // Otherwise, caller should handle UI display
  }

  // Future: Add error reporting service (Sentry, LogRocket, etc.)
  // reportToErrorService(error, context);
}
