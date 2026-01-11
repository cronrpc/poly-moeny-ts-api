/**
 * Gamma API Sports endpoints.
 */

import { HttpClient } from '../http';
import { Team, SportsMetadata, SportsMarketType } from '../types/gamma';

export class SportsAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * List sports teams.
     * @returns List of teams
     */
    async listTeams(): Promise<Team[]> {
        return this.client.get('/teams') as Promise<Team[]>;
    }

    /**
     * Get sports metadata.
     * @returns Sports metadata
     */
    async getMetadata(): Promise<SportsMetadata> {
        return this.client.get('/sports-metadata') as Promise<SportsMetadata>;
    }

    /**
     * Get sports market types.
     * @returns List of market types
     */
    async getMarketTypes(): Promise<SportsMarketType[]> {
        return this.client.get('/sports-market-types') as Promise<SportsMarketType[]>;
    }
}
