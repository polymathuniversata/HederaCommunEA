# Deployment Examples

This file contains deployment examples, configurations, and checklists for the Hedera Africa Hackathon.

## Vercel Deployment Example

### vercel.json Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/index.js"
    }
  ],
  "env": {
    "HEDERA_ACCOUNT_ID": "@hedera-account-id",
    "HEDERA_PRIVATE_KEY": "@hedera-private-key"
  }
}
```

### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add HEDERA_ACCOUNT_ID
vercel env add HEDERA_PRIVATE_KEY
```

## Render Deployment Example

### render.yaml Configuration

```yaml
services:
  - type: web
    name: hedera-backend
    runtime: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: HEDERA_ACCOUNT_ID
        value: 0.0.xxxxx
      - key: HEDERA_PRIVATE_KEY
        value: 0x...
      - key: NODE_ENV
        value: production
```

### Dockerfile for Render

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## IPFS Deployment Example

### Pinata Integration

```javascript
const pinataSDK = require('@pinata/sdk');

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);

async function uploadToIPFS(data) {
  const result = await pinata.pinJSONToIPFS(data);
  return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
}
```

### NFT Metadata Upload

```javascript
async function uploadNFTMetadata(name, description, imageUrl) {
  const metadata = {
    name,
    description,
    image: imageUrl,
    attributes: [
      {
        trait_type: 'Creator',
        value: 'Hedera Hackathon'
      }
    ]
  };

  const ipfsUrl = await uploadToIPFS(metadata);
  return ipfsUrl;
}
```

## Environment Variables Checklist

- [ ] HEDERA_ACCOUNT_ID: Testnet account ID
- [ ] HEDERA_PRIVATE_KEY: ECDSA private key
- [ ] INFURA_PROJECT_ID: For IPFS gateway
- [ ] PINATA_API_KEY: For IPFS pinning
- [ ] PINATA_SECRET_KEY: For IPFS pinning
- [ ] VERCEL_TOKEN: For CI/CD deployment
- [ ] RENDER_API_KEY: For API deployments

## Deployment Checklist

### Pre-Deployment
- [ ] Test all functions on testnet
- [ ] Remove console.log statements
- [ ] Minify/optimize assets
- [ ] Update README with setup instructions
- [ ] Add error handling and logging

### Frontend Deployment (Vercel)
- [ ] Create vercel.json if needed
- [ ] Set correct build settings
- [ ] Add environment variables
- [ ] Test preview deployment
- [ ] Enable custom domain (optional)

### Backend Deployment (Render)
- [ ] Create render.yaml or Dockerfile
- [ ] Set correct runtime and commands
- [ ] Configure environment variables
- [ ] Set up health checks
- [ ] Enable auto-scaling if needed

### IPFS Deployment
- [ ] Upload static assets to IPFS
- [ ] Generate IPFS URLs for metadata
- [ ] Test IPFS gateway access
- [ ] Pin important files with Pinata

### Post-Deployment
- [ ] Verify all endpoints work
- [ ] Test Hedera transactions
- [ ] Check logs for errors
- [ ] Update documentation with live URLs
- [ ] Share with team for testing

## Common Deployment Issues

### Vercel Issues
- **Build fails**: Check package.json scripts
- **Environment variables not loading**: Use vercel env add
- **CORS errors**: Add cors middleware

### Render Issues
- **Port binding**: Use process.env.PORT
- **Memory limits**: Optimize code or upgrade plan
- **Cold starts**: Use always-on feature

### IPFS Issues
- **Slow loading**: Use multiple gateways
- **File not found**: Check pinning status
- **Large files**: Compress or use external hosting

## Cost Optimization

- **Vercel**: Stay within free tier limits
- **Render**: Use free tier for development
- **IPFS**: Use free Pinata tier for hackathon
- **Hedera**: Testnet is free, mainnet has small fees