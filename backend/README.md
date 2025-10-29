# Hedera CommunEA Backend API

Backend API for Hedera CommunEA - A decentralized autonomous community organization platform built on Hedera Hashgraph.

## Features

- **HTS Token Creation**: Create fungible tokens on Hedera Testnet
- **Community Management**: Create and manage DACO communities
- **Wallet Integration**: Secure wallet-based authentication and transaction signing

## API Endpoints

### Health Check
- `GET /health` - Check API status

### Token Management
- `POST /prepare-token` - Prepare unsigned token creation transaction
- `POST /create-token` - Execute signed token creation transaction

### Community Management
- `POST /create-community` - Create a new community
- `POST /join-community` - Join an existing community
- `GET /community/:communityId` - Get community details
- `GET /user-communities/:accountId` - Get user's communities
- `GET /communities` - Get all active communities

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file with:

```env
HEDERA_ACCOUNT_ID=your_testnet_account_id
HEDERA_PRIVATE_KEY=your_private_key
FRONTEND_URL=http://localhost:3000
PORT=3001
```

## Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

## Testing

```bash
npm test
```

## Community Management API Details

### Create Community
```http
POST /create-community
Content-Type: application/json

{
  "name": "Community Name",
  "description": "Community description",
  "tokenId": "0.0.12345",
  "creatorAccountId": "0.0.67890"
}
```

### Join Community
```http
POST /join-community
Content-Type: application/json

{
  "communityId": "community_123",
  "accountId": "0.0.67890"
}
```

### Get Community Details
```http
GET /community/community_123
```

### Get User Communities
```http
GET /user-communities/0.0.67890
```

### Get All Communities
```http
GET /communities
```

## Security Features

- CORS protection
- Input validation
- Security headers
- Production logging
- Wallet-based authentication

## Dependencies

- Express.js v5.1.0
- Hedera SDK v2.75.0
- CORS v2.8.5
- Dotenv v17.2.3