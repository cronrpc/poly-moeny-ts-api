/**
 * Data API Core endpoints.
 * 
 * Provides access to user positions, trades, activity, and leaderboard data.
 */

import { HttpClient } from '../http';
import {
    Position,
    Trade,
    Activity,
    TokenHolders,
    PositionValue,
    ClosedPosition,
    LeaderboardEntry,
    PositionsParams,
    TradesParams,
    ActivityParams,
    HoldersParams,
    PositionsValueParams,
    ClosedPositionsParams,
    LeaderboardParams,
} from '../types/data';

export class CoreAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Get current positions for a user.
     * 
     * @param params - Query parameters (user is required)
     * @returns List of position objects
     * 
     * @example
     * ```typescript
     * const positions = await client.data.core.getPositions({
     *   user: '0x1234...',
     *   sortBy: 'CASHPNL',
     *   sortDirection: 'DESC',
     *   limit: 20
     * });
     * ```
     */
    async getPositions(params: PositionsParams): Promise<Position[]> {
        return this.client.get('/positions', params) as Promise<Position[]>;
    }

    /**
     * Get trades for a user or markets.
     * 
     * @param params - Query parameters
     * @returns List of trade objects
     * 
     * @example
     * ```typescript
     * const trades = await client.data.core.getTrades({
     *   user: '0x1234...',
     *   side: 'BUY',
     *   limit: 50
     * });
     * ```
     */
    async getTrades(params?: TradesParams): Promise<Trade[]> {
        return this.client.get('/trades', params) as Promise<Trade[]>;
    }

    /**
     * Get user activity (on-chain events).
     * 
     * @param params - Query parameters
     * @returns List of activity objects
     * 
     * @example
     * ```typescript
     * const activity = await client.data.core.getActivity({
     *   user: '0x1234...',
     *   type: ['TRADE', 'MERGE'],  // supports array of types
     *   sortBy: 'TIMESTAMP',
     *   sortDirection: 'DESC'
     * });
     * ```
     */
    async getActivity(params?: ActivityParams): Promise<Activity[]> {
        // Handle type array by joining to comma-separated string
        if (params?.type && Array.isArray(params.type)) {
            const processedParams = { ...params, type: params.type.join(',') };
            return this.client.get('/activity', processedParams) as Promise<Activity[]>;
        }
        return this.client.get('/activity', params) as Promise<Activity[]>;
    }

    /**
     * Get top holders for markets.
     * 
     * @param params - Query parameters (market is required)
     * @returns List of token holder groups
     * 
     * @example
     * ```typescript
     * const holders = await client.data.core.getHolders({
     *   market: '0xabc123...',
     *   limit: 10
     * });
     * ```
     */
    async getHolders(params: HoldersParams): Promise<TokenHolders[]> {
        return this.client.get('/holders', params) as Promise<TokenHolders[]>;
    }

    /**
     * Get total value of a user's positions.
     * 
     * @param params - Query parameters (user is required)
     * @returns List containing user value object
     * 
     * @example
     * ```typescript
     * const value = await client.data.core.getPositionsValue({ user: '0x1234...' });
     * console.log('Total value:', value[0]?.value);
     * ```
     */
    async getPositionsValue(params: PositionsValueParams): Promise<PositionValue[]> {
        return this.client.get('/value', params) as Promise<PositionValue[]>;
    }

    /**
     * Get closed positions for a user.
     * 
     * @param params - Query parameters (user is required)
     * @returns List of closed position objects
     * 
     * @example
     * ```typescript
     * const closed = await client.data.core.getClosedPositions({
     *   user: '0x1234...',
     *   sortBy: 'REALIZEDPNL',
     *   sortDirection: 'DESC'
     * });
     * ```
     */
    async getClosedPositions(params: ClosedPositionsParams): Promise<ClosedPosition[]> {
        return this.client.get('/v1/closed-positions', params) as Promise<ClosedPosition[]>;
    }

    /**
     * Get trader leaderboard rankings.
     * 
     * @param params - Query parameters
     * @returns List of leaderboard entries
     * 
     * @example
     * ```typescript
     * const leaders = await client.data.core.getLeaderboard({
     *   timePeriod: 'WEEK',
     *   limit: 10
     * });
     * for (const entry of leaders) {
     *   console.log(`#${entry.rank} ${entry.userName}: $${entry.pnl}`);
     * }
     * ```
     */
    async getLeaderboard(params?: LeaderboardParams): Promise<LeaderboardEntry[]> {
        return this.client.get('/v1/leaderboard', params) as Promise<LeaderboardEntry[]>;
    }
}
