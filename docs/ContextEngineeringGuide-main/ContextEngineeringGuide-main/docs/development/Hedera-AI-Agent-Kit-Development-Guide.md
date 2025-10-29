# Hedera AI Agent Kit Development Guide for Hedera Africa Hackathon

## Overview

This guide provides a comprehensive walkthrough for building prototypes using the Hedera AI Agent Kit and MCP (Model Context Protocol) servers during the Hedera Africa Hackathon. The Hedera AI Agent Kit enables developers to create AI-powered applications that interact with the Hedera network through natural language, supporting both autonomous execution and human-in-the-loop workflows.

## Prerequisites

- Node.js v20 or higher
- A Hedera testnet account (create one at [Hedera Developer Portal](https://portal.hedera.com/dashboard))
- API keys for your chosen AI provider (OpenAI, Anthropic Claude, Groq, or Ollama for local setup)

## Setup and Installation

### 1. Project Initialization

Create a new project directory and initialize it:

```bash
mkdir hedera-hackathon-prototype
cd hedera-hackathon-prototype
npm init -y
```

### 2. Install Dependencies

Install the Hedera Agent Kit and required dependencies:

```bash
npm install hedera-agent-kit @langchain/core langchain @hashgraph/sdk dotenv
```

Choose and install one AI provider:

```bash
# Option 1: OpenAI (requires API key)
npm install @langchain/openai

# Option 2: Anthropic Claude (requires API key)
npm install @langchain/anthropic

# Option 3: Groq (free tier available)
npm install @langchain/groq

# Option 4: Ollama (100% free, runs locally)
npm install @langchain/ollama
```

### 3. Environment Configuration

Create a `.env` file in your project root:

```env
# Required: Hedera testnet credentials
HEDERA_ACCOUNT_ID="0.0.xxxxx"
HEDERA_PRIVATE_KEY="0x..."  # ECDSA encoded private key

# Optional: AI provider API keys
OPENAI_API_KEY="sk-proj-..."      # For OpenAI
ANTHROPIC_API_KEY="sk-ant-..."    # For Claude
GROQ_API_KEY="gsk_..."            # For Groq
# Ollama doesn't require an API key (runs locally)
```

## Basic Agent Implementation

Create an `index.js` file with the following code:

```javascript
const dotenv = require('dotenv');
dotenv.config();

const { ChatPromptTemplate } = require('@langchain/core/prompts');
const { AgentExecutor, createToolCallingAgent } = require('langchain/agents');
const { Client, PrivateKey } = require('@hashgraph/sdk');
const { HederaLangchainToolkit, coreQueriesPlugin } = require('hedera-agent-kit');

function createLLM() {
  if (process.env.OPENAI_API_KEY) {
    const { ChatOpenAI } = require('@langchain/openai');
    return new ChatOpenAI({ model: 'gpt-4o-mini' });
  }
  
  if (process.env.ANTHROPIC_API_KEY) {
    const { ChatAnthropic } = require('@langchain/anthropic');
    return new ChatAnthropic({ model: 'claude-3-haiku-20240307' });
  }
  
  if (process.env.GROQ_API_KEY) {
    const { ChatGroq } = require('@langchain/groq');
    return new ChatGroq({ model: 'llama3-8b-8192' });
  }
  
  // Ollama fallback
  try {
    const { ChatOllama } = require('@langchain/ollama');
    return new ChatOllama({ 
      model: 'llama3.2',
      baseUrl: 'http://localhost:11434'
    });
  } catch (e) {
    console.error('No AI provider configured');
    process.exit(1);
  }
}

async function main() {
  const llm = createLLM();

  // Initialize Hedera testnet client
  const client = Client.forTestnet().setOperator(
    process.env.HEDERA_ACCOUNT_ID,
    PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY),
  );

  const hederaAgentToolkit = new HederaLangchainToolkit({
    client,
    configuration: {
      plugins: [coreQueriesPlugin]
    },
  });
  
  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are a helpful assistant for Hedera blockchain operations'],
    ['placeholder', '{chat_history}'],
    ['human', '{input}'],
    ['placeholder', '{agent_scratchpad}'],
  ]);

  const tools = hederaAgentToolkit.getTools();
  const agent = createToolCallingAgent({ llm, tools, prompt });
  const agentExecutor = new AgentExecutor({ agent, tools });
  
  const response = await agentExecutor.invoke({ 
    input: "What's my HBAR balance?" 
  });
  console.log(response);
}

main().catch(console.error);
```

## MCP Server Integration

The Model Context Protocol (MCP) allows integration with AI tools like Claude Desktop, GitHub Copilot, or Cursor IDE.

### Setting Up MCP Server

1. Navigate to the MCP directory in the cloned repo:
```bash
cd modelcontextprotocol
```

2. Install dependencies and build:
```bash
npm install
npm run build
```

3. Set environment variables:
```bash
export HEDERA_OPERATOR_ID="0.0.xxxxx"
export HEDERA_OPERATOR_KEY="0x2g3..."
```

4. Run the MCP server:
```bash
node dist/index.js --ledger-id=testnet
```

### Integrating with Claude Desktop

Create or edit the Claude Desktop configuration file (usually at `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "hedera-mcp-server": {
      "command": "node",
      "args": [
        "/path/to/hedera-agent-kit/modelcontextprotocol/dist/index.js"
      ],
      "env": {
        "HEDERA_OPERATOR_ID": "0.0.xxxx",
        "HEDERA_OPERATOR_KEY": "302e...."
      }
    }
  }
}
```

### Integrating with VS Code/Copilot

For VS Code with GitHub Copilot, you can use MCP-compatible extensions or set up the server to work with Copilot's tools.

## Hackathon Track Examples

### Track 1: DeFi & Financial Services

**Smart Contract Interaction Agent:**

```javascript
// Example: Create a token and manage liquidity
const response = await agentExecutor.invoke({ 
  input: "Create a fungible token called 'HackathonToken' with symbol 'HACK' and initial supply of 1000000" 
});

const balanceResponse = await agentExecutor.invoke({
  input: "Check my token balances"
});
```

**Use Case:** Build an AI-powered DeFi assistant that can create tokens, check balances, and execute trades based on natural language commands.

### Track 2: NFTs & Digital Assets

**NFT Creation Agent:**

```javascript
const nftResponse = await agentExecutor.invoke({
  input: "Create a non-fungible token called 'HackathonNFT' with symbol 'HNFT' and max supply of 1000"
});

const airdropResponse = await agentExecutor.invoke({
  input: "Airdrop 10 HNFT tokens to account 0.0.12345"
});
```

**Use Case:** Develop an AI agent that helps users mint, manage, and trade NFTs through conversational interfaces.

### Track 3: Supply Chain & Logistics

**Consensus Service Integration:**

```javascript
const topicResponse = await agentExecutor.invoke({
  input: "Create a new topic for supply chain updates called 'LogisticsTracking'"
});

const messageResponse = await agentExecutor.invoke({
  input: "Submit message 'Package shipped from Nairobi' to topic " + topicId
});
```

**Use Case:** Build supply chain tracking systems that use Hedera Consensus Service for immutable event logging.

### Track 4: Gaming & Metaverse

**Token Economy Agent:**

```javascript
const gameTokenResponse = await agentExecutor.invoke({
  input: "Create a fungible token called 'GamePoints' with symbol 'GPT' for in-game currency"
});

const rewardResponse = await agentExecutor.invoke({
  input: "Transfer 100 GPT tokens to player account 0.0.67890 as quest reward"
});
```

**Use Case:** Create gaming economies with AI agents managing token rewards, player balances, and in-game transactions.

## Tips for Non-Coders

### 1. Use Pre-built Templates

Start with the official Next.js template:
```bash
npx create-hedera-agent-kit-app my-hackathon-app
```

### 2. Leverage AI Tools

- Use Claude Desktop with MCP integration for natural language development assistance
- Ask Copilot to generate code snippets and explain Hedera concepts
- Use the agent kit's built-in examples as starting points

### 3. Focus on User Experience

- Design conversational interfaces for your prototypes
- Test with real users to refine natural language prompts
- Start with simple use cases and iterate

### 4. Community Resources

- Join the [Hedera Discord](https://discord.gg/DzAbsm6T) for real-time help
- Check the [Hedera Developer Documentation](https://docs.hedera.com/)
- Use the [Hedera Developer Portal](https://portal.hedera.com/) for test HBAR

## Deployment and Testing on Hedera Testnet

### 1. Testnet Setup

Ensure your `.env` file uses testnet credentials:
```env
HEDERA_ACCOUNT_ID="0.0.xxxxx"  # Testnet account
HEDERA_PRIVATE_KEY="0x..."     # Testnet private key
```

### 2. Testing Your Agent

Run basic tests:
```bash
node index.js
```

Test different prompts:
- "What's my HBAR balance?"
- "Create a token called TestToken"
- "Transfer 1 HBAR to 0.0.12345"

### 3. Monitoring Transactions

Use Hedera Explorer to monitor your transactions:
- Testnet Explorer: https://hashscan.io/testnet
- Search for your account ID to see transaction history

### 4. Performance Testing

Test with different AI models:
- Start with Groq or Ollama for cost-effective development
- Switch to GPT-4 or Claude for production-ready accuracy

### 5. Error Handling

Implement proper error handling:
```javascript
try {
  const response = await agentExecutor.invoke({ input: userPrompt });
  console.log(response);
} catch (error) {
  console.error('Agent execution failed:', error);
  // Provide user-friendly error messages
}
```

## Advanced Features

### Human-in-the-Loop Mode

For security-critical operations, use return-bytes mode:

```javascript
const hederaAgentToolkit = new HederaLangchainToolkit({
  client,
  configuration: {
    plugins: [coreQueriesPlugin],
    context: {
      mode: AgentMode.RETURN_BYTES,
      accountId: process.env.HEDERA_ACCOUNT_ID,
    },
  },
});
```

### Custom Plugins

Extend functionality by creating custom plugins. See the [Plugins Documentation](https://github.com/hashgraph/hedera-agent-kit-js/blob/main/docs/PLUGINS.md) for details.

## Best Practices

1. **Security First**: Never commit private keys to version control
2. **Testnet Only**: Use testnet for all development and testing
3. **Resource Management**: Monitor your test HBAR balance
4. **Documentation**: Comment your code and document your agent's capabilities
5. **User Testing**: Test with diverse user inputs to improve natural language understanding

## Resources

- [Hedera AI Agent Kit Documentation](https://docs.hedera.com/hedera/open-source-solutions/ai-studio-on-hedera/hedera-ai-agent-kit)
- [Hedera Agent Kit GitHub](https://github.com/hashgraph/hedera-agent-kit-js)
- [MCP Server Setup](https://github.com/hashgraph/hedera-agent-kit-js/blob/main/docs/DEVEXAMPLES.md#option-d-try-out-the-mcp-server)
- [Hedera Developer Portal](https://portal.hedera.com/)
- [Hedera Discord Community](https://discord.gg/DzAbsm6T)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) - AI-powered CLI for code generation
- [Aider](https://aider.chat/) - AI pair programming in terminal
- [iFlow CLI](https://github.com/iflow-ai/iflow-cli) - Workflow automation CLI
- [Hedera CLI](https://github.com/hiero-ledger/hiero-cli) - Official Hedera command-line tool

## Next Steps

1. Clone the example repository and run the basic agent
2. Experiment with different AI providers
3. Set up MCP integration with your preferred AI tool
4. Build a prototype for your chosen hackathon track
5. Test thoroughly on testnet before submission

Remember: The Hedera Africa Hackathon is about innovation and learning. Don't be afraid to experiment and push the boundaries of what's possible with AI and blockchain!</content>
<parameter name="filePath">e:\Polymath Universata\Projects\ContextEnginneringGuide\docs\development\Hedera-AI-Agent-Kit-Development-Guide.md