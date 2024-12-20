// Importing necessary classes and interfaces for testing PolicyClient.
// PolicyClient: The client that interacts with the policy-related API endpoints.
// HttpClient: A utility class that abstracts HTTP requests using Axios.
// IPolicySchema: An interface defining the structure of a policy schema.
import { PolicyClient } from '../clients/PolicyClient';
import { HttpClient } from '../utils/HttpClient';
import { IPolicySchema } from '../interfaces/IPolicySchema';

// Describing the test suite for PolicyClient.
// The test suite contains multiple test cases to verify the functionality of the PolicyClient class.
describe('PolicyClient', () => {
  // Declare variables for instances of PolicyClient and HttpClient.
  let policyClient: PolicyClient;
  let httpClient: HttpClient;

  // beforeEach is a Jest lifecycle method that runs before each test case.
  // It sets up fresh instances of HttpClient and PolicyClient for each test, ensuring tests are isolated.
  beforeEach(() => {
    // Initialize HttpClient with a mock API URL.
    httpClient = new HttpClient('http://mockapi');

    // Initialize PolicyClient with the HttpClient instance.
    policyClient = new PolicyClient(httpClient);
  });

  // Test case: Verifies that the PolicyClient can create a resource policy successfully.
  test('should create a resource policy successfully', async () => {
    // Define a mock policy object adhering to the IPolicySchema interface.
    const mockPolicy: IPolicySchema = {
      apiVersion: 'api.agsiri.dev/v1',
      version: 'v1',
      resourcePolicy: {
        version: 'v1',
        resource: 'album:object',
        rules: [
          {
            actions: ['view'],
            effect: 'EFFECT_ALLOW',
          },
        ],
      },
    };

    // Use Jest to mock the 'post' method of HttpClient.
    // The mockResolvedValue function simulates the successful creation of the policy by resolving with the mockPolicy object.
    jest.spyOn(httpClient, 'post').mockResolvedValue(mockPolicy);

    // Call the createPolicy method of PolicyClient with the mock policy.
    const result = await policyClient.createPolicy(mockPolicy);

    // Expect that the result returned from createPolicy matches the mockPolicy object.
    expect(result).toEqual(mockPolicy);
  });

  // Test case: Verifies that the PolicyClient can retrieve a resource policy successfully.
  test('should get a resource policy successfully', async () => {
    // Define a mock policy object adhering to the IPolicySchema interface.
    const mockPolicy: IPolicySchema = {
      apiVersion: 'api.agsiri.dev/v1',
      version: 'v1',
      resourcePolicy: {
        version: 'v1',
        resource: 'album:object',
        rules: [
          {
            actions: ['view'],
            effect: 'EFFECT_ALLOW',
          },
        ],
      },
    };

    // Use Jest to mock the 'get' method of HttpClient.
    // The mockResolvedValue function simulates the successful retrieval of the policy by resolving with the mockPolicy object.
    jest.spyOn(httpClient, 'get').mockResolvedValue(mockPolicy);

    // Call the getPolicy method of PolicyClient with a mock policy ID.
    const result = await policyClient.getPolicy('policyId');

    // Expect that the result returned from getPolicy matches the mockPolicy object.
    expect(result).toEqual(mockPolicy);
  });

  // Additional test cases can be added below to cover update, delete, and other operations.
});

