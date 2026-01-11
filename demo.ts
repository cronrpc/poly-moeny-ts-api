/**
 * Demo script for polymarket-api.
 * 
 * Run with: npx ts-node --transpile-only demo.ts
 */

import { PolymarketClient, PolymarketConfig, APIError, RateLimitError } from './src';

async function main() {
    console.log('='.repeat(60));
    console.log('Polymarket API Demo');
    console.log('='.repeat(60));

    // Create client with custom config
    const config: PolymarketConfig = {
        timeout: 30000,
        retryCount: 3,
        logLevel: 'info',
    };

    const client = new PolymarketClient(config);

    try {
        // ===== Gamma API Examples =====
        console.log('\n--- Gamma API ---\n');

        // Get active events
        console.log('Fetching active events...');
        const events = await client.gamma.events.getList({
            active: true,
            limit: 5,
            order: 'volume',
        });
        console.log(`Found ${events.length} active events:`);
        for (const event of events) {
            console.log(`  - ${event.title} (Volume: ${event.volume})`);
        }

        // Get active markets
        console.log('\nFetching active markets...');
        const markets = await client.gamma.markets.getList({
            active: true,
            limit: 5,
            order: 'volume',
        });
        console.log(`Found ${markets.length} active markets:`);
        for (const market of markets) {
            console.log(`  - ${market.question}`);
        }

        // Search (note: may require authentication)
        console.log('\nSearching for "bitcoin"...');
        try {
            const searchResults = await client.gamma.search.search('bitcoin', { limit: 3 });
            console.log(`Found ${searchResults.events?.length ?? 0} events, ${searchResults.markets?.length ?? 0} markets`);
        } catch (e) {
            if (e instanceof APIError && e.statusCode === 401) {
                console.log('  (Search API requires authentication - skipping)');
            } else {
                throw e;
            }
        }

        // ===== Data API Examples =====
        console.log('\n--- Data API ---\n');

        // Get leaderboard (public endpoint)
        console.log('Fetching weekly leaderboard...');
        const leaderboard = await client.data.core.getLeaderboard({
            timePeriod: 'WEEK',
            limit: 5,
        });
        console.log('Top 5 traders this week:');
        for (const entry of leaderboard) {
            console.log(`  #${entry.rank} ${entry.userName}: $${entry.pnl.toFixed(2)} PnL`);
        }

        console.log('\n' + '='.repeat(60));
        console.log('Demo completed successfully!');
        console.log('='.repeat(60));

    } catch (error) {
        if (error instanceof RateLimitError) {
            console.error(`Rate limited! Retry after ${error.retryAfter} seconds`);
        } else if (error instanceof APIError) {
            console.error(`API Error ${error.statusCode}: ${error.message}`);
        } else {
            console.error('Error:', error);
        }
    }
}

main();
