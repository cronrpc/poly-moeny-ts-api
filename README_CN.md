# poly-money-ts-api

[English](./README.md)

一个用于访问 Polymarket Gamma API 和 Data API 的 TypeScript/JavaScript 客户端库，同时兼容浏览器和 Node.js 环境。

## 特性

- 🌐 **通用性** - 同时支持 Node.js (18+) 和现代浏览器
- 📘 **TypeScript 优先** - 完整的类型定义
- 🔄 **重试机制** - 内置可配置的重试逻辑
- 📊 **完整 API 覆盖** - 支持 Gamma API + Data API
- 🪶 **轻量级** - 无外部依赖（使用原生 fetch）

## 安装

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

## 快速开始

```typescript
import { PolymarketClient } from 'poly-money-ts-api';

// 使用默认配置创建客户端
const client = new PolymarketClient();

// 获取活跃事件
const events = await client.gamma.events.getList({ active: true, limit: 10 });

// 获取用户持仓
const positions = await client.data.core.getPositions({ user: '0x1234...' });

// 搜索市场
const results = await client.gamma.search.search('bitcoin');
```

## 配置选项

```typescript
import { PolymarketClient, PolymarketConfig } from 'poly-money-ts-api';

const config: PolymarketConfig = {
  // API 基础 URL（以下为默认值）
  gammaBaseUrl: 'https://gamma-api.polymarket.com',
  dataBaseUrl: 'https://data-api.polymarket.com',
  
  // HTTP 设置
  timeout: 30000,          // 请求超时时间（毫秒）
  retryCount: 3,           // 失败重试次数
  retryDelay: 1000,        // 重试间隔（毫秒）
  
  // 可选设置
  userAgent: 'my-app/1.0', // 自定义 User-Agent
  
  // 日志级别
  logLevel: 'info',        // 'debug' | 'info' | 'warn' | 'error' | 'silent'
};

const client = new PolymarketClient(config);
```

## API 覆盖范围

### Gamma API（市场数据）

| 接口 | 方法 | 描述 |
|------|------|------|
| `gamma.status.healthCheck()` | GET /status | API 健康检查 |
| `gamma.sports.listTeams()` | GET /teams | 获取体育队伍列表 |
| `gamma.sports.getMetadata()` | GET /sports-metadata | 体育元数据 |
| `gamma.sports.getMarketTypes()` | GET /sports-market-types | 市场类型 |
| `gamma.tags.getList()` | GET /tags | 标签列表 |
| `gamma.tags.get(id)` | GET /tags/{id} | 按 ID 获取标签 |
| `gamma.tags.getBySlug(slug)` | GET /tags/slug/{slug} | 按 slug 获取标签 |
| `gamma.events.getList()` | GET /events | 事件列表 |
| `gamma.events.get(id)` | GET /events/{id} | 获取单个事件 |
| `gamma.events.getBySlug(slug)` | GET /events/slug/{slug} | 按 slug 获取事件 |
| `gamma.markets.getList()` | GET /markets | 市场列表 |
| `gamma.markets.get(id)` | GET /markets/{id} | 获取单个市场 |
| `gamma.markets.getBySlug(slug)` | GET /markets/slug/{slug} | 按 slug 获取市场 |
| `gamma.series.getList()` | GET /series | 系列列表 |
| `gamma.series.get(id)` | GET /series/{id} | 获取系列 |
| `gamma.comments.getList()` | GET /comments | 评论列表 |
| `gamma.comments.get(id)` | GET /comments/{id} | 获取评论 |
| `gamma.profiles.get(address)` | GET /profiles/{address} | 获取用户资料 |
| `gamma.search.search(query)` | GET /search | 搜索 |

### Data API（用户数据）

| 接口 | 方法 | 描述 |
|------|------|------|
| `data.status.healthCheck()` | GET / | API 健康检查 |
| `data.core.getPositions()` | GET /positions | 用户持仓 |
| `data.core.getTrades()` | GET /trades | 交易历史 |
| `data.core.getActivity()` | GET /activity | 用户活动 |
| `data.core.getHolders()` | GET /holders | 持仓大户 |
| `data.core.getPositionsValue()` | GET /value | 持仓价值 |
| `data.core.getClosedPositions()` | GET /v1/closed-positions | 已平仓位 |
| `data.core.getLeaderboard()` | GET /v1/leaderboard | 交易排行榜 |
| `data.misc.getTradedMarkets()` | GET /traded-markets | 用户交易过的市场 |
| `data.misc.getOpenInterest()` | GET /oi | 未平仓合约 |
| `data.misc.getLiveVolume()` | GET /live-volume | 实时交易量 |
| `data.builders.getLeaderboard()` | GET /builders/leaderboard | 建设者排行榜 |
| `data.builders.getVolume()` | GET /builders/volume | 建设者交易量 |

## 错误处理

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
    console.log(`请求频率受限！请在 ${error.retryAfter} 秒后重试`);
  } else if (error instanceof APIError) {
    console.log(`API 错误 ${error.statusCode}: ${error.message}`);
  } else if (error instanceof TimeoutError) {
    console.log('请求超时');
  } else if (error instanceof NetworkError) {
    console.log(`网络错误: ${error.message}`);
  }
}
```

## 日志配置

```typescript
import { PolymarketClient, setupLogging } from 'poly-money-ts-api';

// 方式一：通过配置
const client = new PolymarketClient({ logLevel: 'debug' });

// 方式二：全局设置
setupLogging('debug');
```

## 浏览器使用

本库支持所有实现了 Fetch API 的现代浏览器：

```html
<script type="module">
  import { PolymarketClient } from './node_modules/poly-money-ts-api/dist/esm/index.js';
  
  const client = new PolymarketClient();
  const events = await client.gamma.events.getList({ limit: 5 });
  console.log(events);
</script>
```

或者配合打包工具（如 Vite、Webpack、esbuild）使用：

```typescript
import { PolymarketClient } from 'poly-money-ts-api';

const client = new PolymarketClient();
```

## 开发

```bash
# 安装依赖
npm install

# 类型检查
npm run typecheck

# 构建
npm run build

# 运行演示
npm run demo
```

## 许可证

MIT
