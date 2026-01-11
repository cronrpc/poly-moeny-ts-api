/**
 * Gamma API Status endpoints.
 */

import { HttpClient } from '../http';
import { StatusResponse } from '../types/gamma';

export class StatusAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Check API health status.
     * @returns Status response
     */
    async healthCheck(): Promise<StatusResponse> {
        return this.client.get('/status') as Promise<StatusResponse>;
    }
}
