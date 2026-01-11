/**
 * Base HTTP client with retry logic and error handling.
 */

import { ResolvedConfig } from './config';
import { APIError, NetworkError, RateLimitError, TimeoutError } from './errors';
import { Logger, getLogger } from './logger';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryParams = Record<string, any>;

export interface RequestOptions {
    params?: QueryParams;
    body?: QueryParams;
}

/**
 * Filter out null/undefined values from params object.
 */
function cleanParams(params?: QueryParams): Record<string, string> | undefined {
    if (!params) return undefined;

    const cleaned: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
        if (value !== null && value !== undefined) {
            cleaned[key] = String(value);
        }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

/**
 * Build URL with query parameters.
 */
function buildUrl(baseUrl: string, path: string, params?: Record<string, string>): string {
    const url = new URL(path, baseUrl);
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.append(key, value);
        }
    }
    return url.toString();
}

/**
 * Create an AbortController with timeout.
 */
function createTimeoutController(timeout: number): { controller: AbortController; timeoutId: ReturnType<typeof setTimeout> } {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    return { controller, timeoutId };
}

/**
 * Sleep for a specified duration.
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Base HTTP client class.
 */
export class HttpClient {
    private config: ResolvedConfig;
    private baseUrl: string;
    private logger: Logger;

    constructor(config: ResolvedConfig, baseUrl: string) {
        this.config = config;
        this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
        this.logger = getLogger('http', config.logLevel);
    }

    /**
     * Handle HTTP response and throw appropriate errors.
     */
    private async handleResponse(response: Response): Promise<unknown> {
        let body: unknown;

        // First get the response as text
        const text = await response.text();

        // Try to parse as JSON
        try {
            body = JSON.parse(text);
        } catch {
            body = text;
        }

        // Success
        if (response.ok) {
            return body;
        }

        // Rate limit
        if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            throw new RateLimitError(
                'Rate limit exceeded',
                retryAfter ? parseFloat(retryAfter) : undefined,
                body
            );
        }

        // Other errors
        const message = typeof body === 'string' ? body : JSON.stringify(body);
        throw new APIError(message, response.status, body);
    }

    /**
     * Make an HTTP request with retry logic.
     */
    async request(method: HttpMethod, path: string, options?: RequestOptions): Promise<unknown> {
        const cleanedParams = cleanParams(options?.params);
        const url = buildUrl(this.baseUrl, path, cleanedParams);

        let lastError: Error | undefined;

        for (let attempt = 1; attempt <= this.config.retryCount; attempt++) {
            const { controller, timeoutId } = createTimeoutController(this.config.timeout);

            try {
                this.logger.debug(`Request: ${method} ${url} (attempt ${attempt}/${this.config.retryCount})`);

                const headers: Record<string, string> = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': this.config.userAgent,
                };

                const fetchOptions: RequestInit = {
                    method,
                    headers,
                    signal: controller.signal,
                };

                if (options?.body && (method === 'POST' || method === 'PUT')) {
                    fetchOptions.body = JSON.stringify(options.body);
                }

                const response = await fetch(url, fetchOptions);
                clearTimeout(timeoutId);

                this.logger.debug(`Response: ${response.status} ${response.statusText}`);

                return await this.handleResponse(response);

            } catch (error) {
                clearTimeout(timeoutId);

                if (error instanceof APIError) {
                    // Don't retry on API errors (4xx, 5xx)
                    throw error;
                }

                if (error instanceof Error) {
                    if (error.name === 'AbortError') {
                        lastError = new TimeoutError(`Request timed out after ${this.config.timeout}ms`);
                        this.logger.warn(`Timeout on attempt ${attempt}: ${error.message}`);
                    } else if (error.name === 'TypeError' || error.message.includes('fetch')) {
                        lastError = new NetworkError(`Connection failed: ${error.message}`, error);
                        this.logger.warn(`Network error on attempt ${attempt}: ${error.message}`);
                    } else {
                        lastError = new NetworkError(`HTTP error: ${error.message}`, error);
                        this.logger.warn(`HTTP error on attempt ${attempt}: ${error.message}`);
                    }
                } else {
                    lastError = new NetworkError('Unknown error occurred');
                }

                // Wait before retry (except on last attempt)
                if (attempt < this.config.retryCount) {
                    await sleep(this.config.retryDelay);
                }
            }
        }

        // All retries exhausted
        if (lastError) {
            throw lastError;
        }
        throw new NetworkError('Request failed after all retries');
    }

    /**
     * Make a GET request.
     */
    async get(path: string, params?: QueryParams): Promise<unknown> {
        return this.request('GET', path, { params });
    }

    /**
     * Make a POST request.
     */
    async post(path: string, body?: QueryParams, params?: QueryParams): Promise<unknown> {
        return this.request('POST', path, { params, body });
    }
}
