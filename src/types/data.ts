/**
 * TypeScript interfaces for Data API responses.
 */

/** Position object */
export interface Position {
    proxyWallet: string;
    asset: string;
    conditionId: string;
    size: number;
    avgPrice: number;
    initialValue: number;
    currentValue: number;
    cashPnl: number;
    percentPnl: number;
    totalBought: number;
    realizedPnl: number;
    percentRealizedPnl?: number;
    curPrice: number;
    redeemable: boolean;
    mergeable: boolean;
    title: string;
    slug: string;
    icon?: string;
    eventSlug?: string;
    outcome: string;
    outcomeIndex: number;
    oppositeOutcome?: string;
    oppositeAsset?: string;
    endDate?: string;
    negativeRisk?: boolean;
}

/** Trade object */
export interface Trade {
    proxyWallet: string;
    side: 'BUY' | 'SELL';
    asset: string;
    conditionId: string;
    size: number;
    price: number;
    timestamp: number;
    title: string;
    slug: string;
    icon?: string;
    eventSlug?: string;
    outcome: string;
    outcomeIndex: number;
    name?: string;
    pseudonym?: string;
    bio?: string;
    profileImage?: string;
    profileImageOptimized?: string;
    transactionHash: string;
}

/** Activity object */
export interface Activity {
    proxyWallet: string;
    timestamp: number;
    conditionId: string;
    type: 'TRADE' | 'SPLIT' | 'MERGE' | 'REDEEM' | 'REWARD' | 'CONVERSION' | 'MAKER_REBATE';
    size: number;
    usdcSize: number;
    transactionHash: string;
    price?: number;
    asset?: string;
    side?: 'BUY' | 'SELL';
    outcomeIndex?: number;
    title: string;
    slug: string;
    icon?: string;
    eventSlug?: string;
    outcome?: string;
    name?: string;
    pseudonym?: string;
    bio?: string;
    profileImage?: string;
    profileImageOptimized?: string;
}

/** Holder object */
export interface Holder {
    proxyWallet: string;
    bio?: string;
    asset: string;
    pseudonym?: string;
    amount: number;
    displayUsernamePublic?: boolean;
    outcomeIndex: number;
    name?: string;
    profileImage?: string;
    profileImageOptimized?: string;
}

/** Token holders group */
export interface TokenHolders {
    token: string;
    holders: Holder[];
}

/** Position value */
export interface PositionValue {
    user: string;
    value: number;
}

/** Closed position */
export interface ClosedPosition {
    proxyWallet: string;
    asset: string;
    conditionId: string;
    avgPrice: number;
    totalBought: number;
    realizedPnl: number;
    curPrice: number;
    timestamp: number;
    title: string;
    slug: string;
    icon?: string;
    eventSlug?: string;
    outcome: string;
    outcomeIndex: number;
    oppositeOutcome?: string;
    oppositeAsset?: string;
    endDate?: string;
}

/** Leaderboard entry */
export interface LeaderboardEntry {
    rank: string;
    proxyWallet: string;
    userName: string;
    vol: number;
    pnl: number;
    profileImage?: string;
    xUsername?: string;
    verifiedBadge?: boolean;
}

/** Traded market */
export interface TradedMarket {
    conditionId: string;
    title: string;
    slug: string;
    icon?: string;
    eventSlug?: string;
}

/** Open interest data */
export interface OpenInterest {
    conditionId: string;
    openInterest: number;
    timestamp: number;
}

/** Live volume data */
export interface LiveVolume {
    eventId: string;
    volume: number;
    timestamp: number;
}

/** Builder leaderboard entry */
export interface BuilderLeaderboardEntry {
    rank: string;
    address: string;
    name?: string;
    volume: number;
    marketsCreated: number;
}

/** Builder volume data */
export interface BuilderVolume {
    address: string;
    volume: number;
    period: string;
}

// Query parameter types

export type SortDirection = 'ASC' | 'DESC';
export type PositionSortBy = 'CURRENT' | 'INITIAL' | 'TOKENS' | 'CASHPNL' | 'PERCENTPNL' | 'TITLE' | 'RESOLVING' | 'PRICE' | 'AVGPRICE';
export type TradeSide = 'BUY' | 'SELL';
export type TradeFilterType = 'CASH' | 'TOKENS';
export type ActivityType = 'TRADE' | 'SPLIT' | 'MERGE' | 'REDEEM' | 'REWARD' | 'CONVERSION' | 'MAKER_REBATE';
export type ActivitySortBy = 'TIMESTAMP' | 'TOKENS' | 'CASH';
export type ClosedPositionSortBy = 'REALIZEDPNL' | 'TITLE' | 'PRICE' | 'AVGPRICE' | 'TIMESTAMP';
export type LeaderboardCategory = 'OVERALL' | 'POLITICS' | 'SPORTS' | 'CRYPTO' | 'CULTURE' | 'MENTIONS' | 'WEATHER' | 'ECONOMICS' | 'TECH' | 'FINANCE';
export type LeaderboardTimePeriod = 'DAY' | 'WEEK' | 'MONTH' | 'ALL';
export type LeaderboardOrderBy = 'PNL' | 'VOL';

export interface PositionsParams {
    user: string;
    market?: string;
    eventId?: string;
    sizeThreshold?: number;
    redeemable?: boolean;
    mergeable?: boolean;
    limit?: number;
    offset?: number;
    sortBy?: PositionSortBy;
    sortDirection?: SortDirection;
    title?: string;
}

export interface TradesParams {
    user?: string;
    market?: string;
    eventId?: string;
    limit?: number;
    offset?: number;
    takerOnly?: boolean;
    filterType?: TradeFilterType;
    filterAmount?: number;
    side?: TradeSide;
}

export interface ActivityParams {
    user?: string;
    market?: string;
    eventId?: string;
    limit?: number;
    offset?: number;
    /** Single type or comma-separated list of types */
    type?: ActivityType | ActivityType[];
    start?: number;
    end?: number;
    sortBy?: ActivitySortBy;
    sortDirection?: SortDirection;
    side?: TradeSide;
}

export interface HoldersParams {
    market: string;
    limit?: number;
    minBalance?: number;
}

export interface PositionsValueParams {
    user: string;
    market?: string;
}

export interface ClosedPositionsParams {
    user: string;
    market?: string;
    eventId?: string;
    title?: string;
    limit?: number;
    offset?: number;
    sortBy?: ClosedPositionSortBy;
    sortDirection?: SortDirection;
}

export interface LeaderboardParams {
    category?: LeaderboardCategory;
    timePeriod?: LeaderboardTimePeriod;
    orderBy?: LeaderboardOrderBy;
    limit?: number;
    offset?: number;
    user?: string;
    userName?: string;
}

export interface TradedMarketsParams {
    user: string;
    limit?: number;
    offset?: number;
}

export interface OpenInterestParams {
    market?: string;
}

export interface LiveVolumeParams {
    eventId: string;
}

export interface BuilderLeaderboardParams {
    limit?: number;
    offset?: number;
    period?: string;
}

export interface BuilderVolumeParams {
    address: string;
    period?: string;
}
