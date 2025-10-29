const express = require('express');
const cors = require('cors');
const { Client, PrivateKey, TokenCreateTransaction, TokenType } = require('@hashgraph/sdk');
require('dotenv').config();

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Production logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Initialize Hedera client (only if credentials are available)
let client = null;
if (process.env.HEDERA_ACCOUNT_ID && process.env.HEDERA_PRIVATE_KEY &&
    process.env.HEDERA_ACCOUNT_ID !== '0.0.xxxxx' &&
    process.env.HEDERA_PRIVATE_KEY !== '0x...') {
  try {
    client = Client.forTestnet().setOperator(
      process.env.HEDERA_ACCOUNT_ID,
      PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
    );
  } catch (error) {
    console.warn('Failed to initialize Hedera client:', error.message);
    console.warn('Please set valid HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY in .env file');
  }
} else {
  console.warn('Hedera credentials not configured. Token creation will not work.');
  console.warn('Please update .env file with valid testnet credentials.');
}

// HTS Token Creation Endpoint (Updated for wallet signing)
app.post('/create-token', async (req, res) => {
  try {
    // Check if Hedera client is initialized
    if (!client) {
      return res.status(503).json({
        error: 'Hedera client not configured. Please set valid testnet credentials in .env file.'
      });
    }

    const { signedTransaction, tokenData } = req.body;

    if (!signedTransaction || !tokenData) {
      return res.status(400).json({
        error: 'Missing signedTransaction or tokenData'
      });
    }

    const { name, symbol, initialSupply } = tokenData;

    // Input validation
    if (!name || !symbol || !initialSupply) {
      return res.status(400).json({
        error: 'Missing required fields: name, symbol, initialSupply'
      });
    }

    if (typeof initialSupply !== 'number' || initialSupply <= 0) {
      return res.status(400).json({
        error: 'initialSupply must be a positive number'
      });
    }

    if (name.length > 100 || symbol.length > 10) {
      return res.status(400).json({
        error: 'Name must be <= 100 chars, symbol must be <= 10 chars'
      });
    }

    // Execute the signed transaction
    const response = await client.execute(signedTransaction);
    const receipt = await response.getReceipt(client);

    if (receipt.status.toString() !== 'SUCCESS') {
      throw new Error(`Token creation failed: ${receipt.status}`);
    }

    res.json({
      success: true,
      tokenId: receipt.tokenId.toString(),
      transactionId: response.transactionId.toString(),
      name,
      symbol,
      initialSupply
    });

  } catch (error) {
    console.error('Token creation error:', error);
    res.status(500).json({
      error: 'Failed to create token',
      details: error.message
    });
  }
});

// Prepare Token Transaction Endpoint (for wallet signing)
app.post('/prepare-token', async (req, res) => {
  try {
    // Check if Hedera client is initialized
    if (!client) {
      return res.status(503).json({
        error: 'Hedera client not configured. Please set valid testnet credentials in .env file.'
      });
    }

    const { name, symbol, initialSupply } = req.body;

    // Input validation
    if (!name || !symbol || !initialSupply) {
      return res.status(400).json({
        error: 'Missing required fields: name, symbol, initialSupply'
      });
    }

    if (typeof initialSupply !== 'number' || initialSupply <= 0) {
      return res.status(400).json({
        error: 'initialSupply must be a positive number'
      });
    }

    if (name.length > 100 || symbol.length > 10) {
      return res.status(400).json({
        error: 'Name must be <= 100 chars, symbol must be <= 10 chars'
      });
    }

    // Create unsigned token transaction
    const tokenCreateTx = new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTokenType(TokenType.FungibleCommon)
      .setInitialSupply(initialSupply)
      .setTreasuryAccountId(process.env.HEDERA_ACCOUNT_ID)
      .setAdminKey(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY).publicKey)
      .setSupplyKey(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY).publicKey)
      .setDecimals(0);

    // Freeze the transaction (prepare for signing)
    const frozenTx = await tokenCreateTx.freezeWith(client);

    res.json({
      success: true,
      transaction: frozenTx.toBytes(),
      tokenData: {
        name,
        symbol,
        initialSupply
      }
    });

  } catch (error) {
    console.error('Token preparation error:', error);
    res.status(500).json({
      error: 'Failed to prepare token transaction',
      details: error.message
    });
  }
});

// In-memory storage for communities (in production, use a database)
let communities = [];
let communityMembers = {};

// Create Community Endpoint
app.post('/create-community', async (req, res) => {
  try {
    const { name, description, tokenId, creatorAccountId } = req.body;

    // Input validation
    if (!name || !description || !tokenId || !creatorAccountId) {
      return res.status(400).json({
        error: 'Missing required fields: name, description, tokenId, creatorAccountId'
      });
    }

    if (name.length > 100 || description.length > 500) {
      return res.status(400).json({
        error: 'Name must be <= 100 chars, description must be <= 500 chars'
      });
    }

    // Check if community with this token already exists
    const existingCommunity = communities.find(c => c.tokenId === tokenId);
    if (existingCommunity) {
      return res.status(409).json({
        error: 'Community already exists for this token'
      });
    }

    const communityId = `community_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newCommunity = {
      id: communityId,
      name,
      description,
      tokenId,
      creatorAccountId,
      createdAt: new Date().toISOString(),
      memberCount: 1,
      isActive: true
    };

    communities.push(newCommunity);
    communityMembers[communityId] = [creatorAccountId];

    res.json({
      success: true,
      community: newCommunity
    });

  } catch (error) {
    console.error('Community creation error:', error);
    res.status(500).json({
      error: 'Failed to create community',
      details: error.message
    });
  }
});

// Join Community Endpoint
app.post('/join-community', async (req, res) => {
  try {
    const { communityId, accountId } = req.body;

    // Input validation
    if (!communityId || !accountId) {
      return res.status(400).json({
        error: 'Missing required fields: communityId, accountId'
      });
    }

    const community = communities.find(c => c.id === communityId);
    if (!community) {
      return res.status(404).json({
        error: 'Community not found'
      });
    }

    if (!community.isActive) {
      return res.status(400).json({
        error: 'Community is not active'
      });
    }

    // Check if user is already a member
    if (!communityMembers[communityId]) {
      communityMembers[communityId] = [];
    }

    if (communityMembers[communityId].includes(accountId)) {
      return res.status(409).json({
        error: 'User is already a member of this community'
      });
    }

    // Add member
    communityMembers[communityId].push(accountId);
    community.memberCount = communityMembers[communityId].length;

    res.json({
      success: true,
      message: 'Successfully joined community',
      community: {
        id: community.id,
        name: community.name,
        memberCount: community.memberCount
      }
    });

  } catch (error) {
    console.error('Join community error:', error);
    res.status(500).json({
      error: 'Failed to join community',
      details: error.message
    });
  }
});

// Get Community Details Endpoint
app.get('/community/:communityId', (req, res) => {
  try {
    const { communityId } = req.params;

    const community = communities.find(c => c.id === communityId);
    if (!community) {
      return res.status(404).json({
        error: 'Community not found'
      });
    }

    const members = communityMembers[communityId] || [];
    const communityDetails = {
      ...community,
      members: members,
      memberCount: members.length
    };

    res.json({
      success: true,
      community: communityDetails
    });

  } catch (error) {
    console.error('Get community error:', error);
    res.status(500).json({
      error: 'Failed to get community details',
      details: error.message
    });
  }
});

// Get User's Communities Endpoint
app.get('/user-communities/:accountId', (req, res) => {
  try {
    const { accountId } = req.params;

    const userCommunities = communities.filter(community => {
      const members = communityMembers[community.id] || [];
      return members.includes(accountId);
    });

    res.json({
      success: true,
      communities: userCommunities
    });

  } catch (error) {
    console.error('Get user communities error:', error);
    res.status(500).json({
      error: 'Failed to get user communities',
      details: error.message
    });
  }
});

// Get All Communities Endpoint
app.get('/communities', (req, res) => {
  try {
    const activeCommunities = communities.filter(c => c.isActive);
    res.json({
      success: true,
      communities: activeCommunities
    });

  } catch (error) {
    console.error('Get communities error:', error);
    res.status(500).json({
      error: 'Failed to get communities',
      details: error.message
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hedera CommunEA Backend API' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});