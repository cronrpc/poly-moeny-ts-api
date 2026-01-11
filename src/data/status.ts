/**
 * Data API Status endpoints.
 */

import { HttpClient } from '../http';

export interface DataStatusResponse {
    status: string;
    version?: string;
}

export class DataStatusAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Check API health status.
     * @returns Status response
     */
    async healthCheck(): Promise<DataStatusResponse> {
        return this.client.get('/') as Promise<DataStatusResponse>;
    }
}
