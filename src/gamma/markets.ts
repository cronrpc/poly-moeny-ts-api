/**
 * Gamma API Markets endpoints.
 */

import { HttpClient } from '../http';
import { Market, Tag, MarketsListParams } from '../types/gamma';

export class MarketsAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * List markets with optional filtering.
     * 
     * @param params - Query parameters for filtering markets
     * @returns List of market objects
     * 
     * @example
     * ```typescript
     * const markets = await client.gamma.markets.getList({
     *   active: true,
     *   volume_num_min: 10000,
     *   limit: 20,
     *   order: 'volume'
     * });
     * ```
     */
    async getList(params?: MarketsListParams): Promise<Market[]> {
        return this.client.get('/markets', params) as Promise<Market[]>;
    }

    /**
     * Get a market by ID.
     * 
     * @param marketId - The unique identifier of the market
     * @returns Complete market object with all fields
     * 
     * @example
     * ```typescript
     * const market = await client.gamma.markets.get('12345');
     * console.log(market.question, market.outcomePrices);
     * ```
     */
    async get(marketId: string): Promise<Market> {
        return this.client.get(`/markets/${marketId}`) as Promise<Market>;
    }

    /**
     * Get a market by slug.
     * 
     * @param slug - The URL-friendly identifier of the market
     * @returns Complete market object
     * 
     * @example
     * ```typescript
     * const market = await client.gamma.markets.getBySlug('will-trump-win-2024');
     * ```
     */
    async getBySlug(slug: string): Promise<Market> {
        return this.client.get(`/markets/slug/${slug}`) as Promise<Market>;
    }

    /**
     * Get tags associated with a market.
     * 
     * @param marketId - The unique identifier of the market
     * @returns List of tag objects
     */
    async getTags(marketId: string): Promise<Tag[]> {
        return this.client.get(`/markets/${marketId}/tags`) as Promise<Tag[]>;
    }
}
