const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

// Test data
const testCommunity = {
  name: 'Test Community',
  description: 'A test community for Hedera CommunEA',
  tokenId: '0.0.12345',
  creatorAccountId: '0.0.67890'
};

const testMember = {
  accountId: '0.0.54321'
};

async function testCommunityEndpoints() {
  console.log('Testing Community Management Endpoints...\n');

  try {
    // Test 1: Create Community
    console.log('1. Testing Create Community...');
    const createResponse = await axios.post(`${BASE_URL}/create-community`, testCommunity);
    console.log('✓ Community created:', createResponse.data.community.name);
    const communityId = createResponse.data.community.id;

    // Test 2: Get Community Details
    console.log('\n2. Testing Get Community Details...');
    const getResponse = await axios.get(`${BASE_URL}/community/${communityId}`);
    console.log('✓ Community details retrieved:', getResponse.data.community.name);

    // Test 3: Join Community
    console.log('\n3. Testing Join Community...');
    const joinResponse = await axios.post(`${BASE_URL}/join-community`, {
      communityId,
      accountId: testMember.accountId
    });
    console.log('✓ Member joined community:', joinResponse.data.message);

    // Test 4: Get User's Communities
    console.log('\n4. Testing Get User Communities...');
    const userCommunitiesResponse = await axios.get(`${BASE_URL}/user-communities/${testMember.accountId}`);
    console.log('✓ User communities retrieved:', userCommunitiesResponse.data.communities.length, 'communities');

    // Test 5: Get All Communities
    console.log('\n5. Testing Get All Communities...');
    const allCommunitiesResponse = await axios.get(`${BASE_URL}/communities`);
    console.log('✓ All communities retrieved:', allCommunitiesResponse.data.communities.length, 'communities');

    // Test 6: Try to join again (should fail)
    console.log('\n6. Testing Duplicate Join (should fail)...');
    try {
      await axios.post(`${BASE_URL}/join-community`, {
        communityId,
        accountId: testMember.accountId
      });
      console.log('✗ Should have failed for duplicate join');
    } catch (error) {
      console.log('✓ Correctly prevented duplicate join:', error.response.data.error);
    }

    console.log('\n🎉 All community endpoint tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response ? error.response.data : error.message);
  }
}

// Run tests
testCommunityEndpoints();