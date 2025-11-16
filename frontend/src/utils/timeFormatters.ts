/**
 * Format seconds to MM:SS string
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Parse MM:SS string to seconds
 * Returns null if invalid format
 */
export function parseTimeInput(timeString: string): number | null {
  const cleaned = timeString.replace(/[^\d:]/g, '');
  const parts = cleaned.split(':');

  if (parts.length !== 2) return null;

  const mins = parseInt(parts[0]) || 0;
  const secs = parseInt(parts[1]) || 0;

  if (mins < 0 || mins > 999 || secs < 0 || secs > 59) return null;

  return mins * 60 + secs;
}
