// Importing the PolicyManagerClient class from the client directory
import PolicyManagerClient from './client/PolicyManagerClient'; // Assuming this is the correct path for the import

// Main function to orchestrate the sequence of operations
async function main() {
  // Step 1: Initialize the PolicyManagerClient with the API base URL
  const client = new PolicyManagerClient('http://localhost:3000/api');

  console.log("[Step 1: Clean up all organizations]");
  try {
    // Fetch all existing organizations using the PolicyManagerClient
    const orgsResponse = await client.listOrganizations();
    const orgs = orgsResponse;

    // Check if the response contains an array of organizations
    if (Array.isArray(orgs)) {
      // Iterate through each organization and delete it
      for (const org of orgs) {
        console.log(`Deleting organization: ${org._id}`);
        await client.deleteOrganization(org._id);
      }
    } else {
      console.log('No organizations found or an error occurred.');
    }
  } catch (error) {
    console.error('Error cleaning up organizations:', error);
  }

  console.log("[Step 2: Create an organization]");
  // Define the organization data to be created
  const orgData = {
    name: "Acme Corporation",
    location: {
      address: "123 Acme St",
      city: "Metropolis",
      state: "NY",
      postalCode: "10001",
      country: "USA"
    },
    contactPoint: {
      telephone: "+1-800-555-ACME",
      contactType: "Customer Support",
      email: "support@acme-corp.com"
    },
    description: "A leading provider of industrial products.",
    url: "https://www.acme-corp.com",
    logo: "https://www.acme-corp.com/logo.png"
  };

  let orgId: string;
  try {
    // Create a new organization using the PolicyManagerClient
    const newOrg = await client.createOrganization(orgData);
    orgId = newOrg._id; // Store the newly created organization ID
    console.log('Organization created:', newOrg);
  } catch (error) {
    console.error('Failed to create organization or organization ID is missing.');
    return;
  }

  console.log("[Step 3: Create a resource profile within that organization]");
  // Define the resource profile data associated with the newly created organization
  const resourceData = {
    typeName: "Agsiri::DataManagement::DataRoom",
    description: "A secure data repository for managing sensitive information.",
    sourceUrl: "https://github.com/agsiri-platform/data-room",
    documentationUrl: "https://docs.agsiri.com/data-room",
    replacementStrategy: "create_then_delete",
    taggable: true,
    tagging: {
      taggable: true,
      tagOnCreate: true,
      tagUpdatable: true,
      cloudFormationSystemTags: true,
      tagProperty: "/properties/Tags"
    },
    attributes: {
      dataRoomName: "ConfidentialDataRoom",
      ownerId: orgId, // Use the organization ID as the owner ID
      accessLevel: "restricted",
      Tags: {
        environment: "production",
        project: "ProjectX"
      }
    },
    properties: {
      dataRoomName: {
        description: "The name of the data room.",
        type: "string"
      },
      ownerId: {
        description: "The ID of the user or organization that owns the data room.",
        type: "string"
      },
      accessLevel: {
        description: "Access level for the data room.",
        type: "string",
        default: "read-only"
      }
    },
    primaryIdentifier: [
      "/properties/dataRoomName"
    ],
    handlers: {
      create: {
        permissions: [
          "dataRoom:create"
        ],
        timeoutInMinutes: 30
      },
      read: {
        permissions: [
          "dataRoom:read"
        ],
        timeoutInMinutes: 10
      },
      update: {
        permissions: [
          "dataRoom:update"
        ],
        timeoutInMinutes: 20
      },
      delete: {
        permissions: [
          "dataRoom:delete"
        ],
        timeoutInMinutes: 30
      },
      list: {
        permissions: [
          "dataRoom:list"
        ],
        timeoutInMinutes: 15
      }
    },
    organization: orgId // Link the resource profile to the organization
  };

  let newResource: any;
  try {
    // Create the resource profile within the organization
    newResource = await client.createResourceProfile(orgId, resourceData);
    console.log('Resource profile created:', newResource);
  } catch (error) {
    console.error('Error creating resource profile', error);
    return;
  }

  console.log("[Step 4: Define a policy and attach it to the resource]");
  // Define the policy data to control access to the resource
  const policyData = {
    name: "AllowDataRoomAccess",
    description: "Policy to allow access to the data room.",
    resource: "Agsiri::DataManagement::DataRoom",
    version: "1.0",
    deprecation: {
      deprecated: false
    },
    priority: 1,
    rules: [
      {
        actions: ["dataRoom:read", "dataRoom:write"],
        effect: "ALLOW"
      }
    ],
    organization: orgId,
    audit: {
      createdBy: "admin",
      createdAt: new Date().toISOString()
    }
  };

  let newPolicy: any;
  try {
    // Create the policy using the PolicyManagerClient
    newPolicy = await client.createPolicy(orgId, policyData);
    console.log('Policy created:', newPolicy);
  } catch (error) {
    console.error('Error creating policy:', error);
    return;
  }

  try {
    // Attach the created policy to the resource profile
    await client.attachPolicyToResource(orgId, newResource._id, newPolicy._id);
    console.log('Policy attached to resource');
  } catch (error) {
    console.error('Error attaching policy to resource:', error);
    return;
  }

  console.log('All operations completed successfully.');
}

// Execute the main function and handle any unhandled errors
main().catch(console.error);

