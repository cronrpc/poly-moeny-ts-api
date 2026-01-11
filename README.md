# poly-money-ts-api

A TypeScript/JavaScript client library for accessing Polymarket's Gamma API and Data API, compatible with both web browsers and Node.js.

## Features

- 🌐 **Universal** - Works in both Node.js (18+) and web browsers
- 📘 **TypeScript First** - Full type definitions included
- 🔄 **Retry Logic** - Built-in retry with configurable attempts
- 📊 **Complete API Coverage** - Gamma API + Data API
- 🪶 **Lightweight** - No external dependencies (uses native fetch)

## Installation

### 方式一：npm link（推荐用于本地开发）

适合需要同时修改库代码和使用库的场景：

```bash
# 1. 克隆仓库
git clone git@github.com:cronrpc/poly-moeny-ts-api.git
cd poly-moeny-ts-api

# 2. 安装依赖并构建
npm install
npm run build

# 3. 创建全局链接
npm link

# 4. 在你的项目中使用链接
cd /path/to/your-project
npm link poly-money-ts-api
```

**开发工作流**：修改库代码后，只需在库目录运行 `npm run build`，你的项目会自动获得最新代码。

```bash
# 解除链接
npm unlink poly-money-ts-api
```

### 方式二：从 GitHub 安装

```bash
# 使用 npm
npm install github:cronrpc/poly-moeny-ts-api

# 使用 yarn
yarn add github:cronrpc/poly-moeny-ts-api

# 指定分支或标签
npm install github:cronrpc/poly-moeny-ts-api#main
npm install github:cronrpc/poly-moeny-ts-api#v0.1.0
```

### 方式三：本地路径安装

```bash
# 克隆仓库后，从本地路径安装
npm install ../poly-moeny-ts-api
```

## Quick Start

```typescript
import { PolymarketClient } from 'poly-money-ts-api';

// Create client with default config
const client = new PolymarketClient();

// Get active events
const events = await client.gamma.events.getList({ active: true, limit: 10 });

// Get user positions
const positions = await client.data.core.getPositions({ user: '0x1234...' });

// Search for markets
const results = await client.gamma.search.search('bitcoin');
```

## Configuration

```typescript
import { PolymarketClient, PolymarketConfig } from 'poly-money-ts-api';

const config: PolymarketConfig = {
  // API Base URLs (defaults shown)
  gammaBaseUrl: 'https://gamma-api.polymarket.com',
  dataBaseUrl: 'https://data-api.polymarket.com',
  
  // HTTP Settings
  timeout: 30000,          // Request timeout in milliseconds
  retryCount: 3,           // Number of retries on failure
  retryDelay: 1000,        // Delay between retries in milliseconds
  
  // Optional Settings
  userAgent: 'my-app/1.0', // Custom User-Agent
  
  // Logging
  logLevel: 'info',        // 'debug' | 'info' | 'warn' | 'error' | 'silent'
};

const client = new PolymarketClient(config);
```

## API Coverage

### Gamma API (Market Data)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `gamma.status.healthCheck()` | GET /status | API health check |
| `gamma.sports.listTeams()` | GET /teams | List sports teams |
| `gamma.sports.getMetadata()` | GET /sports-metadata | Sports metadata |
| `gamma.sports.getMarketTypes()` | GET /sports-market-types | Market types |
| `gamma.tags.getList()` | GET /tags | List tags |
| `gamma.tags.get(id)` | GET /tags/{id} | Get tag by ID |
| `gamma.tags.getBySlug(slug)` | GET /tags/slug/{slug} | Get tag by slug |
| `gamma.events.getList()` | GET /events | List events |
| `gamma.events.get(id)` | GET /events/{id} | Get event |
| `gamma.events.getBySlug(slug)` | GET /events/slug/{slug} | Get by slug |
| `gamma.markets.getList()` | GET /markets | List markets |
| `gamma.markets.get(id)` | GET /markets/{id} | Get market |
| `gamma.markets.getBySlug(slug)` | GET /markets/slug/{slug} | Get by slug |
| `gamma.series.getList()` | GET /series | List series |
| `gamma.series.get(id)` | GET /series/{id} | Get series |
| `gamma.comments.getList()` | GET /comments | List comments |
| `gamma.comments.get(id)` | GET /comments/{id} | Get comment |
| `gamma.profiles.get(address)` | GET /profiles/{address} | Get profile |
| `gamma.search.search(query)` | GET /search | Search |

### Data API (User Data)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `data.status.healthCheck()` | GET / | API health check |
| `data.core.getPositions()` | GET /positions | User positions |
| `data.core.getTrades()` | GET /trades | Trade history |
| `data.core.getActivity()` | GET /activity | User activity |
| `data.core.getHolders()` | GET /holders | Top holders |
| `data.core.getPositionsValue()` | GET /value | Position value |
| `data.core.getClosedPositions()` | GET /v1/closed-positions | Closed positions |
| `data.core.getLeaderboard()` | GET /v1/leaderboard | Trader rankings |
| `data.misc.getTradedMarkets()` | GET /traded-markets | User's markets |
| `data.misc.getOpenInterest()` | GET /oi | Open interest |
| `data.misc.getLiveVolume()` | GET /live-volume | Live volume |
| `data.builders.getLeaderboard()` | GET /builders/leaderboard | Builder rankings |
| `data.builders.getVolume()` | GET /builders/volume | Builder volume |

## Error Handling

```typescript
import {
  PolymarketClient,
  APIError,
  RateLimitError,
  NetworkError,
  TimeoutError,
} from 'poly-money-ts-api';

const client = new PolymarketClient();

try {
  const events = await client.gamma.events.getList();
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited! Retry after ${error.retryAfter} seconds`);
  } else if (error instanceof APIError) {
    console.log(`API error ${error.statusCode}: ${error.message}`);
  } else if (error instanceof TimeoutError) {
    console.log('Request timed out');
  } else if (error instanceof NetworkError) {
    console.log(`Network error: ${error.message}`);
  }
}
```

## Logging

```typescript
import { PolymarketClient, setupLogging } from 'poly-money-ts-api';

// Option 1: Via config
const client = new PolymarketClient({ logLevel: 'debug' });

// Option 2: Global setup
setupLogging('debug');
```

## Browser Usage

The library works in modern browsers that support the Fetch API:

```html
<script type="module">
  import { PolymarketClient } from './node_modules/poly-money-ts-api/dist/esm/index.js';
  
  const client = new PolymarketClient();
  const events = await client.gamma.events.getList({ limit: 5 });
  console.log(events);
</script>
```

Or with a bundler like Vite, Webpack, or esbuild:

```typescript
import { PolymarketClient } from 'poly-money-ts-api';

const client = new PolymarketClient();
```

## Development

```bash
# Install dependencies
npm install

# Type check
npm run typecheck

# Build
npm run build

# Run demo
npm run demo
```

## License

MIT
