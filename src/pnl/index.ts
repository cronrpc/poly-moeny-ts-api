/**
 * User PnL API - Portfolio Value History endpoints.
 *
 * Provides access to user portfolio value history for PnL curve visualization.
 * Base URL: https://user-pnl-api.polymarket.com
 */

import { HttpClient } from '../http';

/**
 * PnL data point representing portfolio value at a specific time.
 */
export interface PnLDataPoint {
    /** Unix timestamp in seconds */
    t: number;
    /** Portfolio value in USDC at this timestamp */
    p: number;
}

/**
 * Time interval for PnL query - determines how far back to look.
 */
export type PnLInterval = '1d' | '1w' | '1m' | 'all';

/**
 * Data fidelity - determines sampling interval between data points.
 */
export type PnLFidelity = '1h' | '3h' | '18h' | '1d';

/**
 * Query parameters for User PnL API.
 */
export interface UserPnLParams {
    /** Target user's Ethereum wallet address */
    userAddress: string;
    /**
     * Time span to query.
     * - '1d': 1 day history
     * - '1w': 1 week history
     * - '1m': 1 month history
     * - 'all': Full history
     */
    interval: PnLInterval;
    /**
     * Sampling interval for data points.
     * - '1h': One data point per hour
     * - '3h': One data point per 3 hours
     * - '18h': One data point per 18 hours
     * - '1d': One data point per day
     */
    fidelity: PnLFidelity;
}

/**
 * Recommended parameter combinations for optimal data density and performance.
 * These match the official Polymarket frontend logic.
 */
export const PnL_PRESETS = {
    /** 1 day view with hourly data points */
    DAY: { interval: '1d' as const, fidelity: '1h' as const },
    /** 1 week view with 3-hourly data points */
    WEEK: { interval: '1w' as const, fidelity: '3h' as const },
    /** 1 month view with 18-hourly data points */
    MONTH: { interval: '1m' as const, fidelity: '18h' as const },
    /** All-time view with daily data points */
    ALL: { interval: 'all' as const, fidelity: '1d' as const },
    /** Quick check preset for account existence/activity detection */
    QUICK_CHECK: { interval: '1m' as const, fidelity: '1d' as const },
} as const;

/**
 * User PnL API accessor.
 *
 * Provides access to portfolio value history for users.
 */
export class UserPnLAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Get user's portfolio value history (PnL curve data).
     *
     * @param params - Query parameters
     * @returns Array of PnL data points (timestamp, value)
     *
     * @example Full parameters
     * ```typescript
     * const history = await client.pnl.getUserPnL({
     *   userAddress: '0x1234...',
     *   interval: '1m',
     *   fidelity: '18h'
     * });
     * ```
     *
     * @example Using presets
     * ```typescript
     * import { PnL_PRESETS } from 'polymarket-api';
     *
     * // Get weekly view
     * const weeklyHistory = await client.pnl.getUserPnL({
     *   userAddress: '0x1234...',
     *   ...PnL_PRESETS.WEEK
     * });
     *
     * // Quick account activity check
     * const quickCheck = await client.pnl.getUserPnL({
     *   userAddress: '0x1234...',
     *   ...PnL_PRESETS.QUICK_CHECK
     * });
     *
     * if (quickCheck.length > 0) {
     *   console.log('Account is active');
     * }
     * ```
     */
    async getUserPnL(params: UserPnLParams): Promise<PnLDataPoint[]> {
        const queryParams = {
            user_address: params.userAddress,
            interval: params.interval,
            fidelity: params.fidelity,
        };
        try {
            const result = await this.client.get('/user-pnl', queryParams);
            return (result as PnLDataPoint[]) || [];
        } catch {
            return [];
        }
    }

    /**
     * Get user's latest portfolio value.
     * Convenience method that fetches quick-check data and returns the most recent value.
     *
     * @param userAddress - Target user's Ethereum wallet address
     * @returns Latest portfolio value in USDC, or null if no data
     *
     * @example
     * ```typescript
     * const value = await client.pnl.getLatestValue('0x1234...');
     * if (value !== null) {
     *   console.log(`Portfolio value: $${value.toFixed(2)}`);
     * }
     * ```
     */
    async getLatestValue(userAddress: string): Promise<number | null> {
        const data = await this.getUserPnL({
            userAddress,
            ...PnL_PRESETS.QUICK_CHECK,
        });
        if (data.length === 0) {
            return null;
        }
        return data[data.length - 1].p;
    }

    /**
     * Check if a user has any PnL history (account existence/activity check).
     *
     * @param userAddress - Target user's Ethereum wallet address
     * @returns True if user has portfolio history
     *
     * @example
     * ```typescript
     * const isActive = await client.pnl.hasHistory('0x1234...');
     * if (isActive) {
     *   console.log('User has trading history');
     * }
     * ```
     */
    async hasHistory(userAddress: string): Promise<boolean> {
        const data = await this.getUserPnL({
            userAddress,
            ...PnL_PRESETS.QUICK_CHECK,
        });
        return data.length > 0;
    }
}
