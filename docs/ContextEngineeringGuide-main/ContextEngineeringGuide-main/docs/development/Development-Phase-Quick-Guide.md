# Development Phase Quick Guide

## Overview
Turn your researched ideas into working prototypes using AI agents. Build dApps on Hedera testnet with natural language prompts - no coding required. Focus on Hedera AI Agent Kit and MCP servers for AI-powered development.

### What You'll Build
Simple prototypes demonstrating Hedera features like token creation, consensus messaging, or NFT minting.

## Key Tools
- **Hedera AI Agent Kit**: Natural language agents for Hedera operations
- **MCP Servers**: AI integration for autonomous Hedera interactions
- **CLI Tools**: Gemini CLI, Aider, iFlow CLI, Hedera CLI for enhanced coding

## Quick Setup
1. Install Node.js v20+ ([nodejs.org](https://nodejs.org))
2. Get testnet account ([portal.hedera.com](https://portal.hedera.com/dashboard))
3. Create project: `npm init -y && npm install hedera-agent-kit @langchain/core dotenv`
4. Configure `.env` with account credentials
5. Use agent examples from [Hedera Agent Kit GitHub](https://github.com/hashgraph/hedera-agent-kit-js)

## AI Agent Prompts by Track
- **RWA**: "Create a fungible token for farmland assets"
- **Operations**: "Set up consensus topic for supply chain tracking"
- **Gaming/NFTs**: "Mint an NFT with custom metadata"
- **AI/DePIN**: "Create incentive tokens for network participants"

## MCP Integration
Clone and run MCP server for AI apps like Claude Desktop. Allows queries like "Check my HBAR balance" or "Create a token."

## CLI Tools Advocacy
- **Gemini CLI**: Free AI code generation ([github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli))
- **Aider**: Terminal AI pair programming ([aider.chat](https://aider.chat/))
- **iFlow CLI**: Workflow automation ([github.com/iflow-ai/iflow-cli](https://github.com/iflow-ai/iflow-cli))
- **Hedera CLI**: Official tool for operations ([github.com/hiero-ledger/hiero-cli](https://github.com/hiero-ledger/hiero-cli)) - use with MCP servers

## Building Workflow
- Start with templates from Agent Kit
- Prompt AI to generate code: "Build a token transfer function"
- Test on testnet; debug with AI
- Iterate incrementally

## Tips for Non-Coders
- Treat AI as your developer - describe features in plain English
- Test small parts first; get community feedback
- Use free AI providers like Groq or Ollama
- Join [Hedera Discord](https://discord.gg/DzAbsm6T) for support

## Next Steps
Once prototyped, move to [Deployment](../deployment/) for live testing.

For additional development resources and a longer development guide, see `Hedera-AI-Agent-Kit-Development-Guide.md` in this folder.
