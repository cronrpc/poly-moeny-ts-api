/**
 * Data API Builders endpoints.
 * 
 * Provides access to builder leaderboard and volume data.
 */

import { HttpClient } from '../http';
import {
    BuilderLeaderboardEntry,
    BuilderVolume,
    BuilderLeaderboardParams,
    BuilderVolumeParams,
} from '../types/data';

export class BuildersAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Get builder leaderboard rankings.
     * 
     * @param params - Query parameters
     * @returns List of builder leaderboard entries
     */
    async getLeaderboard(params?: BuilderLeaderboardParams): Promise<BuilderLeaderboardEntry[]> {
        return this.client.get('/builders/leaderboard', params) as Promise<BuilderLeaderboardEntry[]>;
    }

    /**
     * Get builder volume data.
     * 
     * @param params - Query parameters (address is required)
     * @returns Builder volume data
     */
    async getVolume(params: BuilderVolumeParams): Promise<BuilderVolume> {
        return this.client.get('/builders/volume', params) as Promise<BuilderVolume>;
    }
}
