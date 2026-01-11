/**
 * Data API Misc endpoints.
 * 
 * Provides access to traded markets, open interest, and live volume data.
 */

import { HttpClient } from '../http';
import {
    TradedMarket,
    OpenInterest,
    LiveVolume,
    TradedMarketsParams,
    OpenInterestParams,
    LiveVolumeParams,
} from '../types/data';

export class MiscAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Get user's traded markets.
     * 
     * @param params - Query parameters (user is required)
     * @returns List of traded market objects
     * 
     * @example
     * ```typescript
     * const markets = await client.data.misc.getTradedMarkets({
     *   user: '0x1234...'
     * });
     * ```
     */
    async getTradedMarkets(params: TradedMarketsParams): Promise<TradedMarket[]> {
        return this.client.get('/traded-markets', params) as Promise<TradedMarket[]>;
    }

    /**
     * Get open interest data.
     * 
     * @param params - Query parameters
     * @returns Open interest data
     */
    async getOpenInterest(params?: OpenInterestParams): Promise<OpenInterest[]> {
        return this.client.get('/oi', params) as Promise<OpenInterest[]>;
    }

    /**
     * Get live volume data for an event.
     * 
     * @param params - Query parameters (eventId is required)
     * @returns Live volume data
     */
    async getLiveVolume(params: LiveVolumeParams): Promise<LiveVolume> {
        return this.client.get('/live-volume', params) as Promise<LiveVolume>;
    }
}
