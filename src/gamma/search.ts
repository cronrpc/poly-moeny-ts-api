/**
 * Gamma API Search endpoints.
 */

import { HttpClient } from '../http';
import { SearchResult, SearchParams } from '../types/gamma';

export class SearchAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Search for events, markets, and tags.
     * 
     * @param query - Search query string
     * @param params - Additional search parameters
     * @returns Search results containing events, markets, and tags
     * 
     * @example
     * ```typescript
     * const results = await client.gamma.search.search('bitcoin');
     * console.log(results.events, results.markets);
     * ```
     */
    async search(query: string, params?: Omit<SearchParams, 'query'>): Promise<SearchResult> {
        return this.client.get('/search', { query, ...params }) as Promise<SearchResult>;
    }
}
