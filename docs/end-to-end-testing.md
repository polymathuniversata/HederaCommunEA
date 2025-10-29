# End-to-End Testing Guide

## 🧪 Testing Strategy for Hedera CommunEA

### Testing Levels

1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: API endpoints and blockchain interactions
3. **End-to-End Tests**: Complete user workflows
4. **Production Tests**: Live environment validation

---

## 🔬 Local Development Testing

### Backend API Testing

#### Health Check
```bash
# Test server is running
curl http://localhost:3000/health
# Expected: {"status":"ok","timestamp":"2025-01-28T..."}
```

#### Token Creation (with mock credentials)
```bash
# Test token creation endpoint
curl -X POST http://localhost:3000/create-token \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TestToken",
    "symbol": "TEST",
    "initialSupply": 1000000
  }'
# Expected: Success response with token ID
```

#### Error Handling
```bash
# Test invalid input
curl -X POST http://localhost:3000/create-token \
  -H "Content-Type: application/json" \
  -d '{"invalid": "data"}'
# Expected: 400 Bad Request with validation errors
```

### Frontend Testing

#### Build Test
```bash
cd frontend
npm run build
# Expected: Successful build with no errors
```

#### Development Server
```bash
cd frontend
npm run dev
# Expected: App runs on http://localhost:3000
```

#### UI Interaction Test
- Open browser to `http://localhost:3000`
- Fill out token creation form
- Submit form
- Verify success/error messages

---

## 🌐 Production Testing

### Pre-Deployment Checks

#### Environment Variables
- [ ] Render: HEDERA_ACCOUNT_ID set
- [ ] Render: HEDERA_PRIVATE_KEY set
- [ ] Render: FRONTEND_URL set to Vercel URL
- [ ] Vercel: NEXT_PUBLIC_API_URL set to Render URL

#### Build Verification
```bash
# Backend build test
cd backend
npm install
npm run build  # if build script exists
node server.js  # should start without errors

# Frontend build test
cd ../frontend
npm install
npm run build  # should complete successfully
```

### Post-Deployment Testing

#### API Endpoint Testing
```bash
# Replace with your actual Render URL
API_URL="https://your-app.onrender.com"

# Health check
curl $API_URL/health

# Token creation with real credentials
curl -X POST $API_URL/create-token \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-app.vercel.app" \
  -d '{
    "name": "ProductionTest",
    "symbol": "PROD",
    "initialSupply": 1000000
  }'
```

#### Frontend Testing
1. Open deployed Vercel URL in browser
2. Test form validation (empty fields, invalid data)
3. Test successful token creation
4. Test error handling (network issues, invalid data)
5. Test mobile responsiveness

#### Cross-Origin Testing
```bash
# Test CORS headers
curl -I -H "Origin: https://your-app.vercel.app" $API_URL/health
# Expected: Access-Control-Allow-Origin header present
```

---

## 🔗 Integration Testing

### Full User Workflow Test

1. **User visits frontend** (`https://your-app.vercel.app`)
2. **User fills form**:
   - Token Name: "CommunityToken"
   - Symbol: "CMTY"
   - Initial Supply: 1000000
3. **User submits form**
4. **Frontend calls backend API**
5. **Backend creates token on Hedera**
6. **Success response displayed to user**

### Transaction Verification

After successful token creation:
1. Check Hedera Explorer for transaction
2. Verify token details match input
3. Confirm token is transferable
4. Test token balance queries

---

## 📊 Performance Testing

### Load Testing
```bash
# Simple load test with 10 concurrent requests
for i in {1..10}; do
  curl -X POST $API_URL/create-token \
    -H "Content-Type: application/json" \
    -d '{"name":"LoadTest'$i'","symbol":"LT'$i'","initialSupply":1000}' &
done
```

### Response Time Testing
```bash
# Measure response times
time curl $API_URL/health
time curl -X POST $API_URL/create-token \
  -H "Content-Type: application/json" \
  -d '{"name":"PerfTest","symbol":"PERF","initialSupply":1000}'
```

---

## 🐛 Error Scenarios Testing

### Network Issues
- Test with slow/unstable connection
- Test API timeout handling
- Test offline functionality (if any)

### Invalid Inputs
- Empty form submission
- Invalid token symbols (too long, special chars)
- Negative supply values
- Extremely large supply values

### Blockchain Errors
- Insufficient HBAR balance
- Network congestion
- Invalid credentials
- Hedera service outages

---

## 📱 Cross-Platform Testing

### Browser Compatibility
- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Chrome Mobile
- [ ] Safari Mobile

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 🔄 Regression Testing

### After Code Changes
1. Run full E2E test suite
2. Verify existing tokens still work
3. Test all error scenarios
4. Performance check

### Before Deployment
- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Performance benchmarks met
- [ ] Security scan clean

---

## 📈 Monitoring & Alerting

### Key Metrics to Monitor
- API response times
- Error rates
- Transaction success rates
- User session duration
- Page load times

### Alert Conditions
- API downtime > 5 minutes
- Error rate > 5%
- Response time > 10 seconds
- Transaction failures > 10%

---

## 🛠️ Testing Tools

### Recommended Tools
- **Postman**: API testing and monitoring
- **Cypress**: E2E testing
- **Lighthouse**: Performance auditing
- **Hedera Explorer**: Transaction verification
- **Browser DevTools**: Network and console monitoring

### Automated Testing Setup
```bash
# Install testing dependencies
cd frontend
npm install --save-dev cypress

# Run E2E tests
npx cypress run
```

---

## ✅ Testing Checklist

### Pre-Beta Launch
- [ ] Local development fully tested
- [ ] Staging environment tested
- [ ] Production deployment tested
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness confirmed
- [ ] Error handling validated
- [ ] Performance benchmarks met
- [ ] Security review completed
- [ ] User acceptance testing passed

### Post-Launch Monitoring
- [ ] Real user monitoring active
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Backup and recovery tested
- [ ] Incident response plan ready