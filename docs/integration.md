# Hedera Integration Guide: HTS-First Approach

## Overview

Hedera CommunEA prioritizes Hedera Token Service (HTS) for the beta release on October 30, 2025. This approach enables fast, cost-effective token operations without smart contract development. Smart contracts are reserved for future complex governance logic. The integration leverages the Hedera AI Agent Kit for natural language operations.

## Hedera Token Service (HTS) Integration

### Token Creation and Management

#### Meme Coin Factory Integration
```javascript
// Example: Creating a custom meme coin
const tokenCreateTx = await new TokenCreateTransaction()
  .setTokenName(memeCoinName)
  .setTokenSymbol(memeCoinSymbol)
  .setTreasuryAccountId(treasuryId)
  .setInitialSupply(initialSupply)
  .setDecimals(decimals)
  .setTokenMemo("Community meme coin")
  .freezeWith(client)
  .sign(treasuryKey);

const tokenCreateSubmit = await tokenCreateTx.execute(client);
const tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
const tokenId = tokenCreateRx.tokenId;
```

#### NFT Creation for Governance
```javascript
// Example: Minting governance NFTs
const nftCreateTx = await new TokenCreateTransaction()
  .setTokenName("Governance NFT")
  .setTokenSymbol("GOV")
  .setTokenType(TokenType.NonFungibleUnique)
  .setSupplyType(TokenSupplyType.Finite)
  .setMaxSupply(maxSupply)
  .setTreasuryAccountId(treasuryId)
  .setAdminKey(adminKey)
  .setSupplyKey(supplyKey)
  .freezeWith(client)
  .sign(treasuryKey);

const nftCreateSubmit = await nftCreateTx.execute(client);
const nftCreateRx = await nftCreateSubmit.getReceipt(client);
const nftId = nftCreateRx.tokenId;
```

### Token Operations

#### Transfer Operations
```javascript
// Example: Transferring tokens between accounts
const tokenTransferTx = await new TransferTransaction()
  .addTokenTransfer(tokenId, senderAccountId, -amount)
  .addTokenTransfer(tokenId, receiverAccountId, amount)
  .freezeWith(client)
  .sign(senderKey);

const tokenTransferSubmit = await tokenTransferTx.execute(client);
const tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
```

#### Balance Queries
```javascript
// Example: Checking token balances
const balanceQuery = new AccountBalanceQuery()
  .setAccountId(accountId);

const balances = await balanceQuery.execute(client);
const tokenBalance = balances.tokens.get(tokenId);
```

## Smart Contracts Service Integration

### Contract Deployment

#### Governance Contract Deployment
```javascript
// Example: Deploying governance smart contract
const contractBytecode = fs.readFileSync('GovernanceContract.bin');
const contractCreateTx = new ContractCreateTransaction()
  .setBytecode(contractBytecode)
  .setGas(100000)
  .setConstructorParameters(
    new ContractFunctionParameters()
      .addAddress(treasuryAddress)
      .addUint256(votingPeriod)
  );

const contractCreateSubmit = await contractCreateTx.execute(client);
const contractCreateRx = await contractCreateSubmit.getReceipt(client);
const contractId = contractCreateRx.contractId;
```

### Contract Interactions

#### Creating Governance Proposals
```javascript
// Example: Calling contract function to create proposal
const contractExecuteTx = new ContractExecuteTransaction()
  .setContractId(contractId)
  .setGas(100000)
  .setFunction("createProposal",
    new ContractFunctionParameters()
      .addString(proposalTitle)
      .addString(proposalDescription)
      .addUint256(votingDuration)
  );

const contractExecuteSubmit = await contractExecuteTx.execute(client);
const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
```

#### Casting Votes
```javascript
// Example: Submitting vote to contract
const voteTx = new ContractExecuteTransaction()
  .setContractId(contractId)
  .setGas(50000)
  .setFunction("vote",
    new ContractFunctionParameters()
      .addUint256(proposalId)
      .addBool(voteChoice)
  )
  .freezeWith(client)
  .sign(voterKey);

const voteSubmit = await voteTx.execute(client);
const voteRx = await voteSubmit.getReceipt(client);
```

### Event Handling

#### Listening for Contract Events
```javascript
// Example: Querying contract events
const eventsQuery = new ContractCallQuery()
  .setContractId(contractId)
  .setFunction("getProposalEvents",
    new ContractFunctionParameters()
      .addUint256(fromTimestamp)
      .addUint256(toTimestamp)
  );

const events = await eventsQuery.execute(client);
```

## Consensus Service Integration

### Message Submission

#### Logging Community Activities
```javascript
// Example: Submitting consensus message for activity logging
const consensusMessage = {
  type: "USER_ACTIVITY",
  userId: userAccountId,
  action: "MEME_COIN_CREATED",
  tokenId: tokenId,
  timestamp: Date.now()
};

const messageSubmitTx = new ConsensusMessageSubmitTransaction()
  .setTopicId(consensusTopicId)
  .setMessage(JSON.stringify(consensusMessage));

const messageSubmit = await messageSubmitTx.execute(client);
const messageRx = await messageSubmit.getReceipt(client);
const consensusTimestamp = messageRx.consensusTimestamp;
```

#### Governance Decision Records
```javascript
// Example: Recording governance decisions
const decisionRecord = {
  proposalId: proposalId,
  decision: "APPROVED",
  votesFor: votesFor,
  votesAgainst: votesAgainst,
  executedAt: consensusTimestamp
};

const decisionMessageTx = new ConsensusMessageSubmitTransaction()
  .setTopicId(governanceTopicId)
  .setMessage(JSON.stringify(decisionRecord));

const decisionSubmit = await decisionMessageTx.execute(client);
```

### Message Querying

#### Retrieving Activity History
```javascript
// Example: Querying consensus messages
const messagesQuery = new TopicMessageQuery()
  .setTopicId(consensusTopicId)
  .setStartTime(startTime)
  .setEndTime(endTime)
  .setLimit(100);

const messages = await messagesQuery.execute(client);
messages.forEach(message => {
  const activity = JSON.parse(message.contents);
  // Process activity data
});
```

## Wallet Integration

### HashPack Wallet Connection
```javascript
// Example: Connecting to HashPack wallet
const connectWallet = async () => {
  if (window.hashpack) {
    const { accountId, publicKey } = await window.hashpack.connect();
    // Store account information
    setUserAccount(accountId);
    setPublicKey(publicKey);
  }
};
```

### Transaction Signing
```javascript
// Example: Signing transactions with connected wallet
const signTransaction = async (transaction) => {
  const signedTx = await window.hashpack.sign(transaction);
  return signedTx;
};
```

## Error Handling and Best Practices

### Network Error Handling
```javascript
// Example: Robust transaction execution with retries
const executeWithRetry = async (transaction, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await transaction.execute(client);
      const receipt = await response.getReceipt(client);
      return receipt;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

### Gas Optimization
- Estimate gas costs before execution
- Use appropriate gas limits for different operations
- Monitor gas usage patterns for optimization

### Security Considerations
- Never store private keys in client-side code
- Use environment variables for sensitive configuration
- Implement proper access controls for admin functions
- Regular security audits of smart contracts

## Testing on Hedera Networks

### Testnet Configuration
```javascript
// Example: Configuring client for testnet
const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);
```

### Mainnet Migration
- Update client configuration
- Verify contract deployments
- Test with small transactions first
- Monitor network conditions

## Monitoring and Analytics

### Transaction Monitoring
- Track transaction success rates
- Monitor gas usage and costs
- Alert on failed transactions

### Performance Metrics
- Query response times
- Token transfer volumes
- Smart contract execution times

This integration guide provides the technical foundation for building Hedera CommunEA on Hedera's robust blockchain infrastructure, ensuring secure, scalable, and efficient operations.