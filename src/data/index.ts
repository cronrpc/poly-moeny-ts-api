/**
 * Data API - Aggregates all Data API endpoints.
 */

import { HttpClient } from '../http';
import { DataStatusAPI } from './status';
import { CoreAPI } from './core';
import { MiscAPI } from './misc';
import { BuildersAPI } from './builders';

/**
 * Data API accessor.
 * 
 * Provides access to all Data API endpoints for user data.
 */
export class DataAPI {
    /** Health check endpoint */
    public readonly status: DataStatusAPI;
    /** Positions, trades, activity, holders, leaderboard */
    public readonly core: CoreAPI;
    /** Traded markets, open interest, live volume */
    public readonly misc: MiscAPI;
    /** Builder leaderboard and volume */
    public readonly builders: BuildersAPI;

    constructor(client: HttpClient) {
        this.status = new DataStatusAPI(client);
        this.core = new CoreAPI(client);
        this.misc = new MiscAPI(client);
        this.builders = new BuildersAPI(client);
    }
}

export { DataStatusAPI, CoreAPI, MiscAPI, BuildersAPI };
