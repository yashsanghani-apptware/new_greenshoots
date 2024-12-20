import { PolicyClient } from './clients/PolicyClient';
import { HttpClient } from './utils/HttpClient';
import { IPolicySchema, IResourcePolicy } from './interfaces/IPolicySchema';

/**
 * This function demonstrates how to use the PolicyClient to manage resource policies.
 * It includes examples for creating, retrieving, updating, and deleting a policy.
 */
async function exampleProgram() {
  // Initialize the HttpClient with the base API URL.
  const httpClient = new HttpClient('http://localhost:3000');

  // Create an instance of PolicyClient, passing in the initialized HttpClient.
  const policyClient = new PolicyClient(httpClient);

  try {
    // 1. Create a Resource Policy
    // Define the resource policy with specific rules, including actions and effects.
    const resourcePolicy: IResourcePolicy = {
      version: 'v1',  // Ensure the version is explicitly set to avoid potential errors.
      resource: 'dataroom:object',  // Define the resource type that this policy applies to.
      rules: [
        {
          actions: ['view', 'update'],  // Actions allowed by the policy.
          effect: 'EFFECT_ALLOW',  // Effect when the condition is met: allow the action.
          roles: ['user'],  // Roles that are permitted to perform the actions.
        },
        {
          actions: ['delete'],
          effect: 'EFFECT_DENY',  // Deny the delete action for users.
          roles: ['user'],
        },
      ],
    };

    // Create the full policy schema that includes the resource policy.
    const createdPolicy: IPolicySchema = {
      apiVersion: 'api.agsiri.dev/v1',  // API version must match the expected format.
      version: 'v1',
      resourcePolicy,  // Attach the resource policy to the main policy schema.
    };

    // Use the PolicyClient to create the policy via the API.
    const createdPolicyResponse = await policyClient.createPolicy(createdPolicy);
    console.log('Created Resource Policy:', createdPolicyResponse);

    // 2. Retrieve the Policy by ID
    // Extract the policy ID from the metadata or use a fallback ID.
    const policyId = createdPolicyResponse.metadata?.storeIdentifier || 'resourcePolicyId';

    // Retrieve the policy using the PolicyClient and the extracted policy ID.
    const retrievedPolicy = await policyClient.getPolicy(policyId);
    console.log('Retrieved Policy:', retrievedPolicy);

    // Ensure that the retrieved policy contains the resource policy.
    if (!retrievedPolicy.resourcePolicy) {
      throw new Error('Resource policy not found in the retrieved policy.');
    }

    // 3. Update the Policy
    // Modify the existing policy by adding a new rule for the 'share' action.
    const updatedPolicy: IPolicySchema = {
      ...retrievedPolicy,  // Spread the existing policy properties.
      resourcePolicy: {
        ...retrievedPolicy.resourcePolicy,  // Spread existing resource policy properties.
        rules: [
          ...retrievedPolicy.resourcePolicy.rules,  // Include existing rules.
          {
            actions: ['share'],
            effect: 'EFFECT_ALLOW',
            roles: ['user'],
          },
        ],
      },
    };

    // Use the PolicyClient to update the policy with the new rules.
    const updatedPolicyResponse = await policyClient.updatePolicy(policyId, updatedPolicy);
    console.log('Updated Policy:', updatedPolicyResponse);

    // 4. Delete the Policy
    // Delete the policy using the PolicyClient and the policy ID.
    await policyClient.deletePolicy(policyId);
    console.log(`Policy with ID ${policyId} deleted successfully`);

  } catch (error) {
    // Handle any errors that occur during the process.
    console.error('An error occurred:', error);
  }
}

// Execute the example program to demonstrate policy management.
exampleProgram();

