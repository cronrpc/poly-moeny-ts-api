/**
 * TypeScript interfaces for Gamma API responses.
 */

/** Tag object */
export interface Tag {
    id: string;
    label: string;
    slug: string;
    forceShowThumb?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

/** Event object */
export interface Event {
    id: string;
    ticker: string;
    slug: string;
    title: string;
    subtitle?: string;
    description: string;
    resolutionSource?: string;
    startDate: string;
    endDate?: string;
    image?: string;
    icon?: string;
    active: boolean;
    closed: boolean;
    archived: boolean;
    featured: boolean;
    restricted: boolean;
    liquidity: number;
    volume: number;
    openInterest?: number;
    createdAt?: string;
    updatedAt?: string;
    markets?: Market[];
    tags?: Tag[];
}

/** Market object */
export interface Market {
    id: string;
    question: string;
    conditionId: string;
    slug: string;
    description?: string;
    outcomes: string;
    outcomePrices: string;
    volume: string;
    volumeNum?: number;
    liquidity: string;
    liquidityNum?: number;
    active: boolean;
    closed: boolean;
    archived: boolean;
    featured?: boolean;
    restricted: boolean;
    startDate?: string;
    endDate?: string;
    createdAt?: string;
    updatedAt?: string;
    clobTokenIds?: string;
    enableOrderBook?: boolean;
    acceptingOrders?: boolean;
    acceptingOrderTimestamp?: string;
    events?: Event[];
    tags?: Tag[];
    image?: string;
    icon?: string;
    negRisk?: boolean;
}

/** Series object */
export interface Series {
    id: string;
    slug: string;
    title: string;
    description?: string;
    image?: string;
    icon?: string;
    active: boolean;
    closed: boolean;
    archived: boolean;
    createdAt?: string;
    updatedAt?: string;
}

/** Comment object */
export interface Comment {
    id: string;
    content: string;
    marketSlug?: string;
    eventSlug?: string;
    createdAt: string;
    updatedAt?: string;
    author?: Profile;
}

/** Profile object from /public-profile endpoint */
export interface Profile {
    createdAt?: string;
    proxyWallet: string;
    profileImage?: string;
    profileImageOptimized?: string;
    displayUsernamePublic?: boolean;
    bio?: string;
    pseudonym?: string;
    name?: string;
    users?: { id: string; creator: boolean; mod: boolean }[];
    verifiedBadge?: boolean;
    bannerImage?: string;
}

/** Search result */
export interface SearchResult {
    events?: Event[];
    markets?: Market[];
    tags?: Tag[];
}

/** Sports team */
export interface Team {
    id: string;
    name: string;
    slug?: string;
    image?: string;
}

/** Sports metadata */
export interface SportsMetadata {
    sports: string[];
    leagues: string[];
}

/** Sports market type */
export interface SportsMarketType {
    id: string;
    name: string;
    description?: string;
}

/** API status response */
export interface StatusResponse {
    status: string;
    message?: string;
}

// Query parameter types

export interface EventsListParams {
    limit?: number;
    offset?: number;
    order?: string;
    ascending?: boolean;
    id?: string;
    tag_id?: string;
    exclude_tag_id?: string;
    slug?: string;
    tag_slug?: string;
    related_tags?: boolean;
    active?: boolean;
    archived?: boolean;
    featured?: boolean;
    cyom?: boolean;
    include_chat?: boolean;
    include_template?: boolean;
    recurrence?: string;
    closed?: boolean;
    liquidity_min?: number;
    liquidity_max?: number;
    volume_min?: number;
    volume_max?: number;
    start_date_min?: string;
    start_date_max?: string;
    end_date_min?: string;
    end_date_max?: string;
}

export interface MarketsListParams {
    limit?: number;
    offset?: number;
    order?: string;
    ascending?: boolean;
    id?: string;
    slug?: string;
    clob_token_ids?: string;
    condition_ids?: string;
    market_maker_address?: string;
    liquidity_num_min?: number;
    liquidity_num_max?: number;
    volume_num_min?: number;
    volume_num_max?: number;
    start_date_min?: string;
    start_date_max?: string;
    end_date_min?: string;
    end_date_max?: string;
    tag_id?: string;
    related_tags?: boolean;
    cyom?: boolean;
    uma_resolution_status?: string;
    game_id?: string;
    sports_market_types?: string;
    rewards_min_size?: number;
    question_ids?: string;
    include_tag?: boolean;
    closed?: boolean;
    active?: boolean;
    archived?: boolean;
    featured?: boolean;
}

export interface TagsListParams {
    limit?: number;
    offset?: number;
    slug?: string;
}

export interface SeriesListParams {
    limit?: number;
    offset?: number;
}

export interface CommentsListParams {
    limit?: number;
    offset?: number;
    market_slug?: string;
    event_slug?: string;
}

export interface SearchParams {
    query: string;
    limit?: number;
}
