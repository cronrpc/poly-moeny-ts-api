/**
 * Configuration for Polymarket API clients.
 */
export interface PolymarketConfig {
    /** Base URL for Gamma API (market/event data). Default: "https://gamma-api.polymarket.com" */
    gammaBaseUrl?: string;

    /** Base URL for Data API (positions/trades/activity). Default: "https://data-api.polymarket.com" */
    dataBaseUrl?: string;

    /** Base URL for User PnL API (portfolio value history). Default: "https://user-pnl-api.polymarket.com" */
    pnlBaseUrl?: string;

    /** Request timeout in milliseconds. Default: 30000 */
    timeout?: number;

    /** Number of retries on transient failures. Default: 3 */
    retryCount?: number;

    /** Delay between retries in milliseconds. Default: 1000 */
    retryDelay?: number;

    /** Custom User-Agent header */
    userAgent?: string;

    /** Logging level. Default: "info" */
    logLevel?: 'debug' | 'info' | 'warn' | 'error' | 'silent';
}

/**
 * Internal resolved configuration with defaults applied.
 */
export interface ResolvedConfig {
    gammaBaseUrl: string;
    dataBaseUrl: string;
    pnlBaseUrl: string;
    timeout: number;
    retryCount: number;
    retryDelay: number;
    userAgent: string;
    logLevel: 'debug' | 'info' | 'warn' | 'error' | 'silent';
}

/** Default configuration values */
export const DEFAULT_CONFIG: ResolvedConfig = {
    gammaBaseUrl: 'https://gamma-api.polymarket.com',
    dataBaseUrl: 'https://data-api.polymarket.com',
    pnlBaseUrl: 'https://user-pnl-api.polymarket.com',
    timeout: 30000,
    retryCount: 3,
    retryDelay: 1000,
    userAgent: 'polymarket-api/0.1.0',
    logLevel: 'info',
};

/**
 * Resolve user config with defaults.
 */
export function resolveConfig(config?: PolymarketConfig): ResolvedConfig {
    return {
        gammaBaseUrl: config?.gammaBaseUrl ?? DEFAULT_CONFIG.gammaBaseUrl,
        dataBaseUrl: config?.dataBaseUrl ?? DEFAULT_CONFIG.dataBaseUrl,
        pnlBaseUrl: config?.pnlBaseUrl ?? DEFAULT_CONFIG.pnlBaseUrl,
        timeout: config?.timeout ?? DEFAULT_CONFIG.timeout,
        retryCount: config?.retryCount ?? DEFAULT_CONFIG.retryCount,
        retryDelay: config?.retryDelay ?? DEFAULT_CONFIG.retryDelay,
        userAgent: config?.userAgent ?? DEFAULT_CONFIG.userAgent,
        logLevel: config?.logLevel ?? DEFAULT_CONFIG.logLevel,
    };
}
