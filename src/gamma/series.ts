/**
 * Gamma API Series endpoints.
 */

import { HttpClient } from '../http';
import { Series, SeriesListParams } from '../types/gamma';

export class SeriesAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * List series with optional filtering.
     * @param params - Query parameters
     * @returns List of series objects
     */
    async getList(params?: SeriesListParams): Promise<Series[]> {
        return this.client.get('/series', params) as Promise<Series[]>;
    }

    /**
     * Get a series by ID.
     * @param id - Series ID
     * @returns Series object
     */
    async get(id: string): Promise<Series> {
        return this.client.get(`/series/${id}`) as Promise<Series>;
    }
}
