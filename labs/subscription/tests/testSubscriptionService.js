const axios = require('axios');

const BASE_URL = 'http://localhost:3000/subscriptions';

async function createOrUpdateSubscription(offeringId, investorId) {
  try {
    const response = await axios.put(`${BASE_URL}/${offeringId}/investor/${investorId}`, {
      number_of_shares: 100,
      status: 'pending'
    });
    console.log('Subscription created or updated:', response.data);
    return response.data._id;
  } catch (error) {
    console.error('Error creating or updating subscription:', error.response ? error.response.data : error.message);
  }
}

async function listOfferingSubscriptions(offeringId) {
  try {
    const response = await axios.get(`${BASE_URL}/${offeringId}`);
    console.log('Offering subscriptions:', response.data);
  } catch (error) {
    console.error('Error listing offering subscriptions:', error.response ? error.response.data : error.message);
  }
}

async function listInvestorSubscriptions(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/investor/${userId}`);
    console.log('Investor subscriptions:', response.data);
  } catch (error) {
    console.error('Error listing investor subscriptions:', error.response ? error.response.data : error.message);
  }
}

async function deleteSubscription(offeringId, userId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${offeringId}/investor/${userId}`);
    console.log('Subscription deleted:', response.data);
  } catch (error) {
    console.error('Error deleting subscription:', error.response ? error.response.data : error.message);
  }
}

async function createOrUpdateAllocation(offeringId, userId) {
  try {
    const response = await axios.put(`${BASE_URL}/${offeringId}/investor/${userId}/allocations`, {
      allocated_shares: 50,
      status: 'allocated'
    });
    console.log('Allocation created or updated:', response.data);
  } catch (error) {
    console.error('Error creating or updating allocation:', error.response ? error.response.data : error.message);
  }
}

async function deleteAllocation(offeringId, userId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${offeringId}/investor/${userId}/allocations`);
    console.log('Allocation deleted:', response.data);
  } catch (error) {
    console.error('Error deleting allocation:', error.response ? error.response.data : error.message);
  }
}

(async () => {
  const offeringId = 'exampleOfferingId';
  const investorId = 'exampleInvestorId';
  const userId = 'exampleUserId';

  await createOrUpdateSubscription(offeringId, investorId);
  await listOfferingSubscriptions(offeringId);
  await listInvestorSubscriptions(userId);
  await createOrUpdateAllocation(offeringId, investorId);
  await deleteSubscription(offeringId, investorId);
  await deleteAllocation(offeringId, investorId);
})();

