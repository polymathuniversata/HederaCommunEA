# Beta Testing Guide: Hedera CommunEA

## 🎉 Welcome to Hedera CommunEA Beta!

Thank you for participating in our beta testing phase. This guide will help you test the core HTS token creation functionality and provide valuable feedback.

---

## 🚀 Getting Started

### Access the Beta Application
- **Frontend URL**: [Deployed Vercel URL - to be updated after deployment]
- **API URL**: [Deployed Render URL - to be updated after deployment]
- **Network**: Hedera Testnet (no real value transactions)
- **Status**: ✅ Production ready, awaiting final deployment with live credentials

### Test Account Setup
For comprehensive testing, create your own Hedera testnet account:
1. Visit [Hedera Developer Portal](https://portal.hedera.com/)
2. Create a testnet account
3. Fund with test HBAR (use faucet if available)
4. Note your Account ID and Private Key

**Note**: For basic testing, you can use manual account ID entry without creating your own account.

---

## 🧪 Testing Scenarios

### Scenario 1: Wallet Authentication ✅ NEW
**Goal**: Test wallet connection and account management

**Steps**:
1. Open the beta application
2. Click "Connect HashPack Wallet" button
3. Enter a valid Hedera account ID (format: 0.0.xxxxx)
4. Verify connection status shows "Connected"
5. Check that account ID is displayed
6. Test disconnect functionality

**Expected Results**:
- Account ID accepted and validated
- Connection status updates correctly
- Account ID persists across page refreshes
- Disconnect clears connection state

### Scenario 2: User Dashboard ✅ NEW
**Goal**: Verify dashboard functionality and data display

**Steps**:
1. Connect wallet using Scenario 1
2. Scroll to "Your Dashboard" section
3. Verify account information displays
4. Check HBAR balance loading
5. Test token holdings display (if any tokens exist)

**Expected Results**:
- Dashboard shows when connected
- Account ID displayed correctly
- Balance loads without errors
- Token list shows or displays "No tokens found"

### Scenario 3: Token Creation with Wallet ✅ UPDATED
**Goal**: Test end-to-end token creation with wallet connection

**Steps**:
1. Connect wallet using Scenario 1
2. Fill out the token creation form:
   - **Token Name**: "MyBetaToken"
   - **Symbol**: "BETA"
   - **Initial Supply**: 1000000
3. Click "🚀 Launch Community Token"
4. Verify success message appears
5. Check transaction on [HashScan Testnet](https://hashscan.io/testnet)
6. Verify token appears in dashboard

**Expected Results**:
- Token created successfully
- Transaction hash displayed
- Token visible on HashScan
- Token appears in dashboard holdings

### Scenario 2: Form Validation ✅
**Goal**: Test input validation and error handling

**Test Cases**:
1. **Empty Fields**: Submit form with no data
   - Expected: Validation errors for all required fields

2. **Invalid Symbol**: Use symbol "TOOLONG"
   - Expected: Error message about symbol length

3. **Negative Supply**: Enter -1000
   - Expected: Error message about positive values

4. **Special Characters**: Use symbol "TEST@#"
   - Expected: Error message about invalid characters

### Scenario 3: Mobile Testing 📱
**Goal**: Verify mobile responsiveness

**Steps**:
1. Open application on mobile device or browser dev tools
2. Test form filling and submission
3. Verify layout adapts to screen size
4. Test touch interactions

**Expected Results**:
- Form usable on mobile
- No horizontal scrolling
- Buttons appropriately sized

### Scenario 4: Error Recovery 🔄
**Goal**: Test application resilience

**Test Cases**:
1. **Network Issues**: Disable internet during submission
   - Expected: Clear error message, ability to retry

2. **Invalid API Response**: (Simulated by backend)
   - Expected: User-friendly error message

3. **Hedera Network Issues**: During network congestion
   - Expected: Timeout handling with retry option

---

## 📋 Testing Checklist

### Wallet Authentication Tests
- [ ] Manual account ID entry works
- [ ] Account ID validation (format checking)
- [ ] Connection state persistence
- [ ] Disconnect functionality
- [ ] Error handling for invalid IDs

### Dashboard Tests
- [ ] Dashboard shows when wallet connected
- [ ] Account information displays correctly
- [ ] Balance loading and display
- [ ] Token holdings retrieval
- [ ] Mobile responsiveness

### Functionality Tests
- [ ] Token creation with wallet connected
- [ ] Form validation works
- [ ] Error messages are clear
- [ ] Success feedback displayed
- [ ] Transaction verification possible

### User Experience Tests
- [ ] Interface is intuitive
- [ ] Loading states shown
- [ ] Mobile responsive
- [ ] Fast performance (< 3s response)
- [ ] No console errors

### Edge Cases
- [ ] Very long token names
- [ ] Maximum supply values
- [ ] Special characters in names
- [ ] Rapid successive submissions

---

## 🐛 Bug Reporting

### How to Report Issues
1. **Take Screenshots**: Capture the issue
2. **Note Steps**: Describe exact steps to reproduce
3. **Include Details**:
   - Browser and version
   - Device type
   - Error messages
   - Transaction hashes (if applicable)

### Report Format
```
**Issue Title**: Clear, descriptive title

**Description**:
What happened and what you expected

**Steps to Reproduce**:
1. Step 1
2. Step 2
3. Step 3

**Environment**:
- Browser: Chrome 120
- Device: iPhone 15
- OS: iOS 17

**Additional Info**:
Transaction hash: 0x...
Screenshots: [attached]
```

### Where to Report
- **GitHub Issues**: [HederaCommunEA Issues](https://github.com/your-repo/issues)
- **Discord**: #beta-testing channel
- **Email**: beta@hederacommunea.com

---

## 🎯 Success Criteria

### For Beta Testers
- Complete at least 3 testing scenarios
- Report any bugs found
- Provide feedback on user experience
- Test on multiple devices/browsers

### For Application
- All core functionality works
- No critical blocking bugs
- Response times < 5 seconds
- Error messages are helpful
- Mobile experience is good

---

## 📞 Support

### Getting Help
- **Documentation**: Check this guide first
- **Community**: Join our Discord for real-time help
- **Issues**: Use GitHub issues for bug reports
- **Feedback**: Use the feedback form in the app

### Response Times
- **Critical Issues**: < 4 hours
- **General Questions**: < 24 hours
- **Feature Requests**: Within beta period

---

## 🎁 Incentives

### Beta Tester Rewards
- Early access to full features
- Recognition in launch announcements
- Priority support during beta
- Potential future airdrops/tokens

### Leaderboard
Top beta testers will be featured in:
- Beta completion certificates
- Social media shoutouts
- Community recognition

---

## 📅 Beta Timeline

- **Beta Launch**: October 30, 2025
- **Testing Period**: October 30 - November 15, 2025
- **Feedback Deadline**: November 20, 2025
- **Beta Closure**: November 30, 2025

---

## 🔒 Security & Privacy

### Data Handling
- All test transactions are on testnet (no real value)
- Personal information not collected
- Transaction data may be logged for debugging
- Feedback is anonymized unless you specify

### Best Practices
- Use testnet accounts only
- Don't share private keys
- Report security issues privately
- Use strong, unique passwords

---

## 🙏 Thank You!

Your participation helps make Hedera CommunEA better. Every bug report, suggestion, and completed test scenario contributes to a successful launch.

**Happy Testing! 🚀**

*The Hedera CommunEA Team*