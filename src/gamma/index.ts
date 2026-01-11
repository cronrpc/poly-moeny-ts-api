/**
 * Gamma API - Aggregates all Gamma API endpoints.
 */

import { HttpClient } from '../http';
import { StatusAPI } from './status';
import { SportsAPI } from './sports';
import { TagsAPI } from './tags';
import { EventsAPI } from './events';
import { MarketsAPI } from './markets';
import { SeriesAPI } from './series';
import { CommentsAPI } from './comments';
import { ProfilesAPI } from './profiles';
import { SearchAPI } from './search';

/**
 * Gamma API accessor.
 * 
 * Provides access to all Gamma API endpoints for market data.
 */
export class GammaAPI {
    /** Health check endpoint */
    public readonly status: StatusAPI;
    /** Sports teams, metadata, market types */
    public readonly sports: SportsAPI;
    /** Tag management */
    public readonly tags: TagsAPI;
    /** Event listing and details */
    public readonly events: EventsAPI;
    /** Market listing and details */
    public readonly markets: MarketsAPI;
    /** Event series */
    public readonly series: SeriesAPI;
    /** Comments */
    public readonly comments: CommentsAPI;
    /** User profiles */
    public readonly profiles: ProfilesAPI;
    /** Search functionality */
    public readonly search: SearchAPI;

    constructor(client: HttpClient) {
        this.status = new StatusAPI(client);
        this.sports = new SportsAPI(client);
        this.tags = new TagsAPI(client);
        this.events = new EventsAPI(client);
        this.markets = new MarketsAPI(client);
        this.series = new SeriesAPI(client);
        this.comments = new CommentsAPI(client);
        this.profiles = new ProfilesAPI(client);
        this.search = new SearchAPI(client);
    }
}

export { StatusAPI, SportsAPI, TagsAPI, EventsAPI, MarketsAPI, SeriesAPI, CommentsAPI, ProfilesAPI, SearchAPI };
