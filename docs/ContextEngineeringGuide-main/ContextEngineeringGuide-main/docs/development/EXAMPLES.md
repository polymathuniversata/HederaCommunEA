# Development Examples

This file contains code examples, templates, and snippets for the development phase.

## Basic Hedera Token Creation

```javascript
const { Client, PrivateKey, TokenCreateTransaction, TokenType, TokenSupplyType } = require('@hashgraph/sdk');
require('dotenv').config();

async function createToken() {
  const client = Client.forTestnet().setOperator(
    process.env.HEDERA_ACCOUNT_ID,
    PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
  );

  const transaction = new TokenCreateTransaction()
    .setTokenName('MyToken')
    .setTokenSymbol('MTK')
    .setTokenType(TokenType.FungibleCommon)
    .setInitialSupply(1000000)
    .setTreasuryAccountId(process.env.HEDERA_ACCOUNT_ID)
    .setAdminKey(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY).publicKey)
    .setSupplyKey(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY).publicKey);

  const response = await transaction.execute(client);
  const receipt = await response.getReceipt(client);
  
  console.log('Token created:', receipt.tokenId.toString());
}

createToken();
```

## Consensus Service Example

```javascript
const { Client, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction } = require('@hashgraph/sdk');

async function createTopicAndSubmitMessage() {
  const client = Client.forTestnet().setOperator(
    process.env.HEDERA_ACCOUNT_ID,
    PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
  );

  // Create topic
  const topicTx = new TopicCreateTransaction()
    .setTopicMemo('Supply Chain Tracking');
  
  const topicResponse = await topicTx.execute(client);
  const topicReceipt = await topicResponse.getReceipt(client);
  const topicId = topicReceipt.topicId;

  // Submit message
  const messageTx = new TopicMessageSubmitTransaction()
    .setTopicId(topicId)
    .setMessage('Product shipped from warehouse');
  
  const messageResponse = await messageTx.execute(client);
  const messageReceipt = await messageResponse.getReceipt(client);
  
  console.log('Message submitted:', messageReceipt.topicSequenceNumber);
}
```

## AI Agent Kit Usage

```javascript
const { HederaAgentKit } = require('hedera-agent-kit');

async function useAgentKit() {
  const agent = new HederaAgentKit({
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    network: 'testnet'
  });

  // Natural language command
  const result = await agent.execute('Create a fungible token named TestToken with symbol TST and supply 1000000');
  console.log(result);
}
```

## MCP Server Integration

```javascript
// Example MCP server setup for Hedera
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { HederaAgentKit } = require('hedera-agent-kit');

const server = new Server(
  {
    name: 'hedera-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'create_token') {
    const agent = new HederaAgentKit({
      accountId: process.env.HEDERA_ACCOUNT_ID,
      privateKey: process.env.HEDERA_PRIVATE_KEY,
      network: 'testnet'
    });

    const result = await agent.execute(`Create token: ${args.name} ${args.symbol} ${args.supply}`);
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  }
});

server.start();
```

## Project Structure Template

```
hedera-dapp/
├── src/
│   ├── index.js (Main app logic)
│   ├── hedera.js (Hedera operations)
│   └── utils.js (Helper functions)
├── public/
│   └── index.html (Frontend)
├── .env (Environment variables)
├── package.json
└── README.md
```

## Environment Variables Template

```env
# Hedera Testnet Credentials
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=0x...

# API Keys (if needed)
INFURA_PROJECT_ID=...
PINATA_API_KEY=...
PINATA_SECRET_KEY=...

# App Configuration
PORT=3000
NODE_ENV=development
```