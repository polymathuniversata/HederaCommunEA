# Render Deployment Guide: Backend API

## 🚀 Quick Start Deployment

### Step 1: Get Hedera Testnet Credentials (REQUIRED)
1. Visit [Hedera Developer Portal](https://portal.hedera.com/)
2. Create a new account or log in
3. Go to "Accounts" → "Create Account"
4. Select "Testnet" network
5. Fund your account with test HBAR (use faucet if available)
6. Note your **Account ID** (format: 0.0.xxxxx) and **Private Key**

### Step 2: Deploy to Render
1. **Create Render Account**
   - Go to [render.com](https://render.com) and sign up
   - Connect your GitHub account

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your `HederaCommunEA` repository
   - Configure settings:
     ```
     Runtime: Node
     Build Command: npm install
     Start Command: node server.js
     Root Directory: backend
     ```

3. **Set Environment Variables**
   In Render dashboard → Your Service → Environment:
   ```
   HEDERA_ACCOUNT_ID = 0.0.xxxxx  # Your real account ID
   HEDERA_PRIVATE_KEY = 0x...     # Your real private key
   NODE_ENV = production
   FRONTEND_URL = https://your-app.vercel.app  # Update after Vercel deployment
   PORT = 10000  # Render default port
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Note your service URL: `https://your-app.onrender.com`

### Step 3: Test Deployment
```bash
# Test health endpoint
curl https://your-app.onrender.com/health

# Test token creation (should work with real credentials)
curl -X POST https://your-app.onrender.com/create-token \
  -H "Content-Type: application/json" \
  -d '{"name":"TestCoin","symbol":"TEST","initialSupply":1000000}'
```

## 🔧 Troubleshooting

### Common Issues

**"Hedera client not configured"**
- Check that environment variables are set correctly in Render
- Ensure private key format is correct (should start with 0x)

**Build fails**
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json

**CORS errors**
- Update FRONTEND_URL environment variable with your Vercel URL
- Restart the service after changing environment variables

**Transaction failures**
- Verify testnet account has sufficient HBAR balance
- Check Hedera network status

### Logs and Monitoring
- View application logs in Render dashboard
- Monitor response times and error rates
- Set up alerts for downtime

## 📋 Pre-Deployment Checklist

- [ ] Hedera testnet account created and funded
- [ ] Account ID and private key noted
- [ ] Render account created
- [ ] GitHub repository connected to Render
- [ ] Environment variables configured
- [ ] Frontend URL known (for CORS)

## 🔒 Security Notes

- Never commit real credentials to Git
- Use environment variables for all sensitive data
- Regularly rotate Hedera credentials
- Monitor for unusual transaction activity

## 📞 Support

- [Hedera Discord](https://discord.gg/DzAbsm6T) for technical issues
- [Render Support](https://render.com/docs/support) for deployment issues
- Check [Hedera Status](https://status.hedera.com/) for network issues