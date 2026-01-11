/**
 * Custom error classes for Polymarket API clients.
 */

/**
 * Base exception for all Polymarket API errors.
 */
export class PolymarketError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PolymarketError';
        // Maintains proper stack trace for where our error was thrown (V8 engines)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PolymarketError);
        }
    }
}

/**
 * HTTP API error response.
 * Raised when the API returns a non-2xx status code.
 */
export class APIError extends PolymarketError {
    public readonly statusCode: number;
    public readonly responseBody: unknown;

    constructor(message: string, statusCode: number, responseBody?: unknown) {
        super(`[${statusCode}] ${message}`);
        this.name = 'APIError';
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
}

/**
 * Invalid request parameters.
 * Raised when request parameters fail local validation.
 */
export class ValidationError extends PolymarketError {
    public readonly field?: string;

    constructor(message: string, field?: string) {
        const prefix = field ? `Field '${field}': ` : '';
        super(`${prefix}${message}`);
        this.name = 'ValidationError';
        this.field = field;
    }
}

/**
 * Rate limit exceeded (HTTP 429).
 * Raised when the API returns a 429 Too Many Requests response.
 */
export class RateLimitError extends APIError {
    public readonly retryAfter?: number;

    constructor(message = 'Rate limit exceeded', retryAfter?: number, responseBody?: unknown) {
        super(message, 429, responseBody);
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter;
    }
}

/**
 * Network connectivity error.
 * Raised when the request fails due to network issues.
 */
export class NetworkError extends PolymarketError {
    public readonly originalError?: Error;

    constructor(message: string, originalError?: Error) {
        super(message);
        this.name = 'NetworkError';
        this.originalError = originalError;
    }
}

/**
 * Request timeout.
 * Raised when a request exceeds the configured timeout.
 */
export class TimeoutError extends NetworkError {
    constructor(message = 'Request timed out') {
        super(message);
        this.name = 'TimeoutError';
    }
}
