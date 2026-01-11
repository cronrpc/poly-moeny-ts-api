/**
 * Polymarket API Client Library.
 * 
 * A TypeScript/JavaScript library for accessing Polymarket's Gamma API and Data API,
 * compatible with both web browsers and Node.js.
 * 
 * @example Quick Start
 * ```typescript
 * import { PolymarketClient } from 'polymarket-api';
 * 
 * // Create client with default config
 * const client = new PolymarketClient();
 * 
 * // Get active events
 * const events = await client.gamma.events.getList({ active: true, limit: 10 });
 * 
 * // Get user positions
 * const positions = await client.data.core.getPositions({ user: '0x...' });
 * ```
 * 
 * @example Custom Configuration
 * ```typescript
 * import { PolymarketClient, PolymarketConfig } from 'polymarket-api';
 * 
 * const config: PolymarketConfig = {
 *   timeout: 60000,
 *   retryCount: 5,
 *   logLevel: 'debug'
 * };
 * 
 * const client = new PolymarketClient(config);
 * ```
 * 
 * @packageDocumentation
 */

// Main client
export { PolymarketClient } from './client';

// Configuration
export { PolymarketConfig, ResolvedConfig, resolveConfig, DEFAULT_CONFIG } from './config';

// Errors
export {
    PolymarketError,
    APIError,
    ValidationError,
    RateLimitError,
    NetworkError,
    TimeoutError,
} from './errors';

// Logging
export { Logger, LogLevel, setupLogging, getLogger } from './logger';

// HTTP Client (for advanced usage)
export { HttpClient } from './http';

// API Classes
export { GammaAPI } from './gamma';
export { DataAPI } from './data';

// All types
export * from './types';

// Version
export const VERSION = '0.1.0';
