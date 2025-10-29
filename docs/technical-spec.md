# Technical Specification: Hedera CommunEA

## Overview

Hedera CommunEA is a gamified community governance platform leveraging Hedera's Hedera Token Service (HTS) for fast, cost-effective token operations. For the beta release on October 30, 2025, we focus exclusively on HTS for core features, reserving smart contracts for future complex logic. The platform uses the Hedera AI Agent Kit for natural language Hedera operations to accelerate development.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend UI   │    │   Backend API   │    │   Hedera HTS    │
│   (Next.js 16)  │◄──►│   (Node.js)     │◄──►│   (Tokens)      │
│                 │    │                 │    │                 │
│ - Landing Page  │    │ - Token Factory │    │ - Fungible      │
│ - Token Creator │    │ - Validation    │    │ - Transfers     │
│ - Dashboard     │    │ - Security      │    │ - Operations    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Current Implementation Status (October 29, 2025)

### ✅ Completed Components

#### Frontend (Next.js 16 + TypeScript 5 + Material-UI v7 + Tailwind CSS v4)
- **Material Design 3 Theme System**: Comprehensive M3 implementation with Hedera branding
- **Modern Landing Page**: One-page design with Eastern Africa focus using M3 components
- **Token Creation Form**: Integrated glassmorphism UI with validation
- **Wallet Authentication**: Manual account ID entry with connection state management
- **User Dashboard**: Account overview with balances, token holdings, and activity tracking
- **Responsive Design**: Mobile-first approach for East African users
- **Production Build**: Optimized for Vercel deployment with Turbopack

#### Backend (Node.js + Express v5.1.0)
- **HTS Token Factory**: Full token creation with Hedera SDK v2.75.0
- **Production Security**: CORS, headers, logging middleware
- **Input Validation**: Comprehensive error handling and sanitization
- **API Endpoints**: `/create-token`, `/prepare-token`, and `/health` endpoints
- **Wallet Signing Integration**: Support for signed transactions from frontend

#### Deployment Configuration
- **Render Backend**: Production-ready configuration with environment variables
- **Vercel Frontend**: Optimized Next.js 16 deployment settings
- **Testing Guides**: Complete E2E and beta testing documentation

## Core Technologies

### Frontend Stack
- **Next.js 16**: React framework with App Router and Turbopack
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Type-safe development
- **Material-UI v7**: Modern component library with Material Design 3
- **Tailwind CSS v4**: Utility-first CSS framework
- **Emotion**: CSS-in-JS for Material-UI styling

### Backend Stack
- **Node.js**: JavaScript runtime
- **Express v5.1.0**: Web framework for API development
- **Hedera SDK v2.75.0**: Official Hedera JavaScript SDK
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Hedera Token Service (HTS) - Primary Focus
HTS enables fast, cheap token operations without Solidity development:
- **Fungible Tokens**: Meme coins and reward tokens
- **Operations**: Minting, burning, transferring, freezing
- **Benefits**: No gas costs, instant finality, enterprise-grade security

## Hedera Services Integration

### Hedera Token Service (HTS) - Beta Focus

#### Meme Coin Creation with HTS
```javascript
const { Client, PrivateKey, TokenCreateTransaction, TokenType } = require('@hashgraph/sdk');

async function createMemeCoin(name, symbol, initialSupply) {
  const client = Client.forTestnet().setOperator(
    process.env.HEDERA_ACCOUNT_ID,
    PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
  );

  const tokenTx = await new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setTokenType(TokenType.FungibleCommon)
    .setInitialSupply(initialSupply)
    .setTreasuryAccountId(process.env.HEDERA_ACCOUNT_ID)
    .setAdminKey(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY).publicKey)
    .setSupplyKey(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY).publicKey)
    .freezeWith(client);

  const response = await tokenTx.execute(client);
  const receipt = await response.getReceipt(client);
  return receipt.tokenId.toString();
}
```

#### NFT Minting for Governance
```javascript
const { TokenMintTransaction } = require('@hashgraph/sdk');

async function mintGovernanceNFT(tokenId, metadata) {
  const client = Client.forTestnet().setOperator(
    process.env.HEDERA_ACCOUNT_ID,
    PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
  );

  const mintTx = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from(metadata)])
    .freezeWith(client)
    .sign(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY));

  const response = await mintTx.execute(client);
  const receipt = await response.getReceipt(client);
  return receipt.serials[0].toString();
}
```

#### Token Transfers
```javascript
const { TransferTransaction } = require('@hashgraph/sdk');

async function transferTokens(tokenId, fromAccount, toAccount, amount) {
  const client = Client.forTestnet().setOperator(
    process.env.HEDERA_ACCOUNT_ID,
    PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
  );

  const transferTx = await new TransferTransaction()
    .addTokenTransfer(tokenId, fromAccount, -amount)
    .addTokenTransfer(tokenId, toAccount, amount)
    .freezeWith(client)
    .sign(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY));

  const response = await transferTx.execute(client);
  await response.getReceipt(client);
}
```

### Hedera AI Agent Kit Integration

#### Natural Language Token Operations
```javascript
const { HederaAgentKit } = require('hedera-agent-kit');

async function createTokenWithAI(name, symbol, supply) {
  const agent = new HederaAgentKit({
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    network: 'testnet'
  });

  const result = await agent.execute(
    `Create a fungible token named "${name}" with symbol "${symbol}" and initial supply ${supply}`
  );
  return result;
}
```

#### MCP Server for AI Tools
```javascript
// Integration with Claude Desktop or VS Code Copilot
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { HederaAgentKit } = require('hedera-agent-kit');

const server = new Server({
  name: 'hedera-communEA-mcp',
  version: '1.0.0',
}, {
  capabilities: { tools: {} },
});

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === 'create_community_token') {
    const agent = new HederaAgentKit({
      accountId: process.env.HEDERA_ACCOUNT_ID,
      privateKey: process.env.HEDERA_PRIVATE_KEY,
      network: 'testnet'
    });
    
    const result = await agent.execute(
      `Create community token: ${args.name} ${args.symbol} ${args.supply}`
    );
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  }
});
```

### Smart Contracts Service - Future Implementation
- **Governance Logic**: Voting mechanisms and proposal execution
- **Reward Distribution**: Automated token allocation based on contributions
- **Treasury Management**: Multi-signature controls for community funds

## Backend API Implementation

### API Endpoints

**POST /create-token**
- Creates a token using a pre-signed transaction from the frontend
- Input: `{ signedTransaction, tokenData: { name, symbol, initialSupply } }`
- Returns: `{ success: true, tokenId, transactionId, name, symbol, initialSupply }`
- Error handling: Comprehensive validation and Hedera error responses

**POST /prepare-token**
- Prepares an unsigned token transaction for wallet signing
- Input: `{ name, symbol, initialSupply }`
- Returns: `{ success: true, transaction, tokenData }`
- Used by frontend to prepare transactions for user wallet signing

**GET /health**
- Health check endpoint for monitoring
- Returns: `{ status: 'OK', message: 'Hedera CommunEA Backend API' }`

### Security Features
- **CORS Configuration**: Production-ready cross-origin settings
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Input Validation**: Comprehensive sanitization and type checking
- **Error Handling**: Structured error responses without sensitive data exposure
- **Logging**: Production-grade request logging with timestamps

## Wallet Authentication Implementation

### Current Implementation (Simplified Approach)
For the beta release, we've implemented a simplified wallet authentication system:

#### Manual Account ID Entry
```typescript
// WalletContext.tsx - Simplified wallet management
interface WalletContextType {
  isConnected: boolean;
  accountId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  signTransaction: (transaction: HederaTransaction) => Promise<HederaTransaction>;
}

const connectWallet = async () => {
  const accountIdInput = prompt('Enter Hedera Account ID (e.g., 0.0.123456):');
  if (accountIdInput && /^\d+\.\d+\.\d+$/.test(accountIdInput)) {
    setAccountId(accountIdInput);
    setIsConnected(true);
    localStorage.setItem('hederaAccountId', accountIdInput);
  }
};
```

#### Transaction Signing Placeholder
```typescript
const signTransaction = async (transaction: HederaTransaction) => {
  if (!isConnected || !accountId) {
    throw new Error('Wallet not connected');
  }
  // Placeholder: Return transaction as-is
  // Future: Integrate with HashPack or other wallets
  return transaction;
};
```

### Future Implementation (Full Wallet Integration)
Planned for post-beta development:

#### HashPack Wallet Integration
```typescript
// Future: Full HashPack integration
import { HashConnect } from 'hashconnect';

const hashconnect = new HashConnect();
await hashconnect.init(appMetadata, network);

const connectWallet = async () => {
  const connection = await hashconnect.connect();
  setAccountId(connection.accountIds[0]);
  setIsConnected(true);
};
```

#### Transaction Signing with Wallet
```typescript
const signTransaction = async (transaction: HederaTransaction) => {
  const signingData = await hashconnect.sign(transaction);
  return signingData.signedTransaction;
};
```

## Core Components

### 1. Meme Coin Factory
- **Functionality**: User-friendly interface for creating custom tokens
- **Features**:
  - Token metadata customization (name, symbol, description)
  - Image upload and IPFS storage
  - Initial supply and distribution settings
  - Community approval mechanisms
- **Technical Implementation**: React components with Hedera SDK integration

### 2. Reward Engine
- **Functionality**: Automated distribution of tokens and NFTs
- **Features**:
  - Contribution tracking and scoring
  - Dynamic reward calculation algorithms
  - Scheduled and event-triggered distributions
  - Anti-gaming measures
- **Technical Implementation**: Smart contracts with off-chain oracles

### 3. Governance Module
- **Functionality**: Decentralized decision-making system
- **Features**:
  - Proposal creation and voting
  - NFT-based voting power
  - Quadratic voting options
  - Execution of approved proposals
- **Technical Implementation**: Smart contracts with frontend voting interface

### 4. Community Dashboard
- **Functionality**: Central hub for user interaction
- **Features**:
  - Portfolio tracking (tokens, NFTs, voting power)
  - Activity feed and notifications
  - Leaderboards and achievements
  - Social features (following, communities)
- **Technical Implementation**: React dashboard with real-time data updates

### 5. Mobile Optimization Layer
- **Functionality**: Progressive Web App (PWA) features
- **Features**:
  - Offline functionality for basic operations
  - Push notifications for important events
  - Touch-optimized interfaces
  - Low-bandwidth mode for East African networks
- **Technical Implementation**: Service workers and responsive design

## Security Considerations

### Authentication & Authorization
- **Wallet-Based Auth**: Integration with Hedera-compatible wallets
- **Multi-Factor**: Additional verification for high-value operations
- **Session Management**: Secure token handling with automatic expiration

### Smart Contract Security
- **Code Audits**: Third-party security reviews before deployment
- **Access Controls**: Role-based permissions for contract functions
- **Emergency Pauses**: Circuit breakers for critical issues
- **Upgrade Mechanisms**: Proxy patterns for contract updates

### Data Protection
- **Encryption**: End-to-end encryption for sensitive data
- **Privacy**: Minimal data collection with user consent
- **GDPR Compliance**: Data portability and deletion features

### Network Security
- **Rate Limiting**: Protection against spam and abuse
- **DDoS Protection**: Hedera's built-in network resilience
- **Monitoring**: Real-time security event detection

## Performance Optimization

### Scalability
- **Hedera Network**: 10,000+ TPS capacity for high-volume operations
- **Caching Strategy**: Multi-layer caching (browser, CDN, server-side)
- **Database Optimization**: Efficient queries and indexing

### User Experience
- **Loading Optimization**: Code splitting and lazy loading
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Accessibility**: WCAG 2.1 AA compliance for inclusive design

## Development and Deployment

### Development Environment
- **Version Control**: Git with GitHub for collaboration
- **CI/CD**: Automated testing and deployment pipelines
- **Testing**: Unit, integration, and end-to-end test suites
- **Documentation**: Auto-generated API docs and user guides

### Deployment Strategy
- **Staging Environment**: Pre-production testing on Hedera testnet
- **Production Deployment**: Mainnet deployment with gradual rollout
- **Monitoring**: Application performance monitoring and alerting
- **Backup**: Regular backups of critical data and configurations

## Integration Points

### External Services
- **IPFS**: Decentralized file storage for assets
- **The Graph**: Indexing and querying blockchain data
- **WalletConnect**: Cross-wallet compatibility
- **Analytics**: Privacy-focused usage tracking

### Hedera Ecosystem
- **HashPack**: Primary wallet integration
- **Hedera Explorer**: Transaction verification links
- **Developer Tools**: SDK and API utilization
- **Community Resources**: Integration with Hedera documentation

This technical specification provides a comprehensive blueprint for building Hedera CommunEA, ensuring scalability, security, and user engagement while leveraging Hedera's powerful blockchain infrastructure.