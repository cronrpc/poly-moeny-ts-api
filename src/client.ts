/**
 * Main Polymarket client.
 * 
 * Unified client for accessing both Gamma API and Data API.
 */

import { PolymarketConfig, resolveConfig, ResolvedConfig } from './config';
import { HttpClient } from './http';
import { GammaAPI } from './gamma';
import { DataAPI } from './data';
import { UserPnLAPI } from './pnl';

/**
 * Unified Polymarket client for all APIs.
 * 
 * This is the main entry point for accessing both Gamma API and Data API
 * with a single configuration.
 * 
 * @example
 * ```typescript
 * import { PolymarketClient } from 'polymarket-api';
 * 
 * // Create with default config
 * const client = new PolymarketClient();
 * 
 * // Or with custom config
 * const client = new PolymarketClient({
 *   timeout: 60000,
 *   retryCount: 5,
 *   logLevel: 'debug'
 * });
 * 
 * // Access Gamma API (market data)
 * const events = await client.gamma.events.getList({ active: true, limit: 10 });
 * const market = await client.gamma.markets.get('market-id');
 * const results = await client.gamma.search.search('bitcoin');
 * 
 * // Access Data API (user data)
 * const positions = await client.data.core.getPositions({ user: '0x1234...' });
 * const leaderboard = await client.data.core.getLeaderboard();
 * ```
 */
export class PolymarketClient {
    /** Client configuration */
    public readonly config: ResolvedConfig;

    /** Gamma API (events, markets, tags, sports, profiles, search) */
    public readonly gamma: GammaAPI;

    /** Data API (positions, trades, activity, leaderboard) */
    public readonly data: DataAPI;

    /** User PnL API (portfolio value history) */
    public readonly pnl: UserPnLAPI;

    private readonly _gammaHttp: HttpClient;
    private readonly _dataHttp: HttpClient;

    /**
     * Initialize the unified Polymarket client.
     * 
     * @param config - Client configuration. If not provided, uses default configuration.
     */
    constructor(config?: PolymarketConfig) {
        this.config = resolveConfig(config);

        // Create HTTP clients for each API
        this._gammaHttp = new HttpClient(this.config, this.config.gammaBaseUrl);
        this._dataHttp = new HttpClient(this.config, this.config.dataBaseUrl);
        const pnlHttp = new HttpClient(this.config, this.config.pnlBaseUrl);

        // Initialize API accessors
        this.gamma = new GammaAPI(this._gammaHttp);
        this.data = new DataAPI(this._dataHttp);
        this.pnl = new UserPnLAPI(pnlHttp);
    }
}
