# Development Setup Guide: Hedera CommunEA

## Overview
This guide provides setup instructions for the Hedera CommunEA project, which features a modern Next.js frontend, Node.js backend, and Hedera Token Service integration. The current implementation includes wallet authentication (manual account entry) and a user dashboard.

## Prerequisites

### System Requirements
- **Node.js**: v20 or higher ([nodejs.org](https://nodejs.org))
- **Git**: Latest version ([git-scm.com](https://git-scm.com))
- **VS Code**: With TypeScript support ([code.visualstudio.com](https://code.visualstudio.com))

### Hedera Account Setup
1. Create testnet account at [Hedera Developer Portal](https://portal.hedera.com/dashboard)
2. Fund account with test HBAR (use faucet if available)
3. Note your Account ID and Private Key for backend configuration

## Project Structure Setup

The project follows a clear separation of concerns with organized directories:

```
HederaCommunEA/
├── frontend/          # Next.js React application
├── backend/           # Node.js Express API server
├── blockchain/        # Hedera-related utilities (future)
├── docs/             # Documentation and guides
└── tools/            # Development tools (future)
```

### Quick Setup
```bash
# Clone the repository
git clone <repository-url>
cd HederaCommunEA

# Setup backend
cd backend
npm install

# Setup frontend
cd ../frontend
npm install
```

## AI Development Tools Setup

### Hedera AI Agent Kit
```bash
# Install AI Agent Kit
npm install hedera-agent-kit @langchain/core
```

**Basic Agent Setup**:
```javascript
// src/ai-agent.js
const { HederaAgentKit } = require('hedera-agent-kit');

const agent = new HederaAgentKit({
  accountId: process.env.HEDERA_ACCOUNT_ID,
  privateKey: process.env.HEDERA_PRIVATE_KEY,
  network: 'testnet'
});

async function createTokenWithAI(name, symbol, supply) {
  const result = await agent.execute(
    `Create a fungible token named "${name}" with symbol "${symbol}" and initial supply ${supply}`
  );
  return result;
}

module.exports = { agent, createTokenWithAI };
```

### MCP Server Integration
```bash
# Clone and setup MCP server
git clone https://github.com/hashgraph/hedera-agent-kit-js.git
cd hedera-agent-kit-js
npm install
npm run build
```

**MCP Configuration for Claude Desktop**:
Create `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "hedera-mcp": {
      "command": "node",
      "args": ["/path/to/hedera-agent-kit-js/dist/index.js"],
      "env": {
        "HEDERA_OPERATOR_ID": "0.0.xxxxx",
        "HEDERA_OPERATOR_KEY": "0x..."
      }
    }
  }
}
```

## Frontend Setup (Next.js 16 + TypeScript + Material-UI v7)

### Installation & Development
```bash
cd frontend
npm install

# Start development server
npm run dev
```

### Current Implementation Features
- **Material Design 3 Theme System**: Complete M3 implementation with Hedera branding
- **Wallet Authentication**: Manual account ID entry with validation
- **User Dashboard**: Account overview with balances and token holdings
- **Token Creation Form**: Integrated HTS-powered meme coin creation
- **Responsive Design**: Mobile-first with glassmorphism UI and M3 components
- **TypeScript**: Full type safety with strict configuration
- **Production Ready**: Optimized builds for Vercel deployment

### Key Components
- `WalletContext.tsx`: React Context for wallet state management
- `WalletConnect.tsx`: Wallet connection UI component
- `UserDashboard.tsx`: Account dashboard with real-time data
- `page.tsx`: Main landing page using M3 component variants
- `theme/materialDesign3.ts`: Comprehensive Material Design 3 theme system
- `components/*-M3.tsx`: M3-styled component variants

## Backend Setup (Node.js + Express)

### Installation & Development
```bash
cd backend
npm install

# Start development server
npm start
```

### Current Implementation Features
- **HTS Token Creation**: Full token factory with validation
- **Account Data API**: Balance and token holdings retrieval
- **Security Middleware**: CORS, input validation, error handling
- **Production Ready**: Optimized for Render deployment

### API Endpoints
- `POST /create-token`: Create new HTS tokens using signed transactions
- `POST /prepare-token`: Prepare unsigned token transactions for wallet signing
- `GET /health`: Health check endpoint

### Environment Configuration
Create `.env` file in backend directory:
```env
# Hedera Testnet Credentials (required for token operations)
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=0x...

# Server Configuration
PORT=3000
NODE_ENV=development
```

## HTS Development Examples

### Token Creation
```javascript
// src/token-operations.js
const { TokenCreateTransaction, TokenType } = require('@hashgraph/sdk');

async function createMemeCoin(name, symbol, initialSupply) {
  const transaction = new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setTokenType(TokenType.FungibleCommon)
    .setInitialSupply(initialSupply)
    .setTreasuryAccountId(process.env.HEDERA_ACCOUNT_ID)
    .setAdminKey(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY).publicKey);

  const response = await transaction.execute(client);
  const receipt = await response.getReceipt(client);
  return receipt.tokenId.toString();
}
```

### NFT Minting
```javascript
// src/nft-operations.js
const { TokenMintTransaction } = require('@hashgraph/sdk');

async function mintGovernanceNFT(tokenId, metadata) {
  const mintTx = new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from(JSON.stringify(metadata))]);

  const response = await mintTx.execute(client);
  const receipt = await response.getReceipt(client);
  return receipt.serials[0].toString();
}
```

## Deployment Setup

### Vercel (Frontend)
```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Render (Backend)
1. Connect GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables in Render dashboard:
   - `HEDERA_ACCOUNT_ID`
   - `HEDERA_PRIVATE_KEY`
   - `PORT=10000` (Render default)

### Environment Variables Required
Both deployments need Hedera testnet credentials for token operations.

## Development Workflow

### Daily Development Cycle
1. **Ideation**: Use AI tools to brainstorm features
2. **Implementation**: Write code with Copilot assistance
3. **Testing**: Test HTS operations on testnet
4. **Deployment**: Push to Vercel/Render for live testing

### AI-Assisted Development
- **Prompt Engineering**: "Create a React component for token creation form"
- **Code Review**: Ask AI to review HTS integration code
- **Debugging**: "Why is my token creation failing?"

### Version Control
```bash
# Initialize Git
git init
git add .
git commit -m "Initial HTS setup"

# Create GitHub repository
# Push to main branch
git push origin main
```

## Testing and Validation

### Unit Testing
```bash
# Install testing framework
npm install --save-dev jest

# Basic test for token operations
const { createMemeCoin } = require('./src/token-operations');

test('creates meme coin successfully', async () => {
  const tokenId = await createMemeCoin('TestCoin', 'TEST', 1000000);
  expect(tokenId).toBeDefined();
});
```

### Testnet Validation
- Use [HashScan](https://hashscan.io/testnet) to verify transactions
- Test with small token amounts first
- Validate wallet integration with HashPack

## Troubleshooting

### Common Issues
- **Transaction Failures**: Check account balance and testnet status
- **CORS Errors**: Configure proper CORS settings in Express
- **Environment Variables**: Ensure .env file is loaded correctly

### Getting Help
- [Hedera Discord](https://discord.gg/DzAbsm6T) for technical support
- [Hedera Documentation](https://docs.hedera.com/) for API references
- AI tools for code debugging and explanations

## Next Steps

1. **Complete Setup**: Follow this guide to initialize your development environment
2. **Build Features**: Start with meme coin creation using HTS
3. **Test Integration**: Deploy to testnet and validate operations
4. **Iterate**: Use beta feedback to improve the implementation

This setup provides a solid foundation for HTS-first development with AI acceleration, enabling rapid progress toward the October 30 beta release.