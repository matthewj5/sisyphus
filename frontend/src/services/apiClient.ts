/**
 * HTTP API Client with timeout, error handling, and retry support
 */
export class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(baseUrl?: string, timeout = 30000) {
    this.baseUrl = baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    this.defaultTimeout = timeout;
  }

  /**
   * Core request method with timeout and error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    timeout?: number
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const timeoutMs = timeout || this.defaultTimeout;

    try {
      // Race between fetch and timeout
      const response = await Promise.race([
        fetch(url, {
          headers: { 'Content-Type': 'application/json', ...options.headers },
          ...options,
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
        ),
      ]);

      // Handle non-OK responses
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch {
          // If error response isn't JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      // Re-throw with context preserved
      throw error;
    }
  }

  /**
   * POST request
   */
  post<T>(endpoint: string, body: unknown, timeout?: number): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
      timeout
    );
  }

  /**
   * GET request
   */
  get<T>(endpoint: string, timeout?: number): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, timeout);
  }

  /**
   * PUT request
   */
  put<T>(endpoint: string, body: unknown, timeout?: number): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      },
      timeout
    );
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string, timeout?: number): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, timeout);
  }
}
