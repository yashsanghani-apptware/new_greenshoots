# Agsiri IAM Client Library Functional Specification

## Introduction
The Agsiri IAM client library in TypeScript provides a simple and intuitive interface for interacting with the Agsiri IAM service. It includes methods for managing users, groups, roles, and policies, as well as for authenticating and authorizing requests. This specification outlines the functionality of the client library, detailing each method and providing example code snippets to illustrate their usage.

## Table of Contents
- Design Principles
- Setup and Configuration
- Authentication
- User Management
- Group Management
- Role Management
- Policy Management
- Examples

## Design Principles
The Agsiri IAM client library is designed with the following principles:
1. **Simplicity**: Provide a clear and easy-to-use API.
2. **Consistency**: Follow consistent patterns and naming conventions.
3. **Extensibility**: Allow for future enhancements without breaking existing functionality.
4. **Type Safety**: Use TypeScript to ensure type safety and improve development experience.

## Setup and Configuration

### Installation
Install the library using npm or yarn:
```bash
npm install agsiri-iam-client
```
or
```bash
yarn add agsiri-iam-client
```

### Configuration
Create a configuration file to store the API endpoint and authentication token:
```typescript
// config.ts
export const config = {
  apiEndpoint: 'http://localhost:3000',
  authToken: 'your_jwt_token',
};
```

## Authentication

### Login
Authenticate a user and obtain a JWT token:
```typescript
import { IAMClient } from 'agsiri-iam-client';

const client = new IAMClient(config.apiEndpoint);

async function login(username: string, password: string) {
  const token = await client.login(username, password);
  config.authToken = token;
}
```

### Refresh Token
Refresh an existing JWT token:
```typescript
async function refreshToken(token: string) {
  const newToken = await client.refreshToken(token);
  config.authToken = newToken;
}
```

## User Management

### Create User
Create a new user in the IAM system:
```typescript
const user = await client.createUser({
  username: 'new_user',
  password: 'password',
  email: 'newuser@example.com',
});
```

### Get User
Retrieve details of a specific user:
```typescript
const user = await client.getUser('userId');
```

### List Users
List all users in the IAM system:
```typescript
const users = await client.listUsers();
```

### Update User
Update details of a specific user:
```typescript
const updatedUser = await client.updateUser('userId', {
  username: 'updated_user',
  email: 'updateduser@example.com',
});
```

### Delete User
Delete a specific user from the IAM system:
```typescript
await client.deleteUser('userId');
```

### Attach Policies to User
Attach policies to a user by policy names (default) or IDs:
```typescript
await client.attachPoliciesToUser('userId', ['policyName1', 'policyName2']);

// Attach by IDs
await client.attachPoliciesToUser('userId', ['policyId1', 'policyId2'], false);
```

### Attach Roles to User
Attach roles to a user by role names (default) or IDs:
```typescript
await client.attachRolesToUser('userId', ['roleName1', 'roleName2']);

// Attach by IDs
await client.attachRolesToUser('userId', ['roleId1', 'roleId2'], false);
```

### Attach Groups to User
Attach groups to a user by group names (default) or IDs:
```typescript
await client.attachGroupsToUser('userId', ['groupName1', 'groupName2']);

// Attach by IDs
await client.attachGroupsToUser('userId', ['groupId1', 'groupId2'], false);
```

## Group Management

### Create Group
Create a new group in the IAM system:
```typescript
const group = await client.createGroup({
  name: 'new_group',
});
```

### Get Group
Retrieve details of a specific group:
```typescript
const group = await client.getGroup('groupId');
```

### List Groups
List all groups in the IAM system:
```typescript
const groups = await client.listGroups();
```

### Update Group
Update details of a specific group:
```typescript
const updatedGroup = await client.updateGroup('groupId', {
  name: 'updated_group',
});
```

### Delete Group
Delete a specific group from the IAM system:
```typescript
await client.deleteGroup('groupId');
```

### Attach Policies to Group
Attach policies to a group by policy names (default) or IDs:
```typescript
await client.attachPoliciesToGroup('groupId', ['policyName1', 'policyName2']);

// Attach by IDs
await client.attachPoliciesToGroup('groupId', ['policyId1', 'policyId2'], false);
```

## Role Management

### Create Role
Create a new role in the IAM system:
```typescript
const role = await client.createRole({
  name: 'new_role',
});
```

### Get Role
Retrieve details of a specific role:
```typescript
const role = await client.getRole('roleId');
```

### List Roles
List all roles in the IAM system:
```typescript
const roles = await client.listRoles();
```

### Update Role
Update details of a specific role:
```typescript
const updatedRole = await client.updateRole('roleId', {
  name: 'updated_role',
});
```

### Delete Role
Delete a specific role from the IAM system:
```typescript
await client.deleteRole('roleId');
```

### Attach Policies to Role
Attach policies to a role by policy names (default) or IDs:
```typescript
await client.attachPoliciesToRole('roleId', ['policyName1', 'policyName2']);

// Attach by IDs
await client.attachPoliciesToRole('roleId', ['policyId1', 'policyId2'], false);
```

## Policy Management

### Create Policy
Create a new policy in the IAM system:
```typescript
const policy = await client.createPolicy({
  name: 'new_policy',
  document: {
    Version: '2023-01-01',
    Policies: [
      {
        Effect: 'Allow',
        Action: [
          'listDataRooms',
          'getFiles',
        ],
        Resource: [
          'ari:dataroom:US:123456789012:farm240',
          'ari:dataroom:US:123456789012:farm240/*',
        ],
      },
    ],
  },
});
```

### Get Policy
Retrieve details of a specific policy:
```typescript
const policy = await client.getPolicy('policyId');
```

### List Policies
List all policies in the IAM system:
```typescript
const policies = await client.listPolicies();
```

### Update Policy
Update details of a specific policy:
```typescript
const updatedPolicy = await client.updatePolicy('policyId', {
  name: 'updated_policy',
  document: {
    Version: '2023-01-01',
    Policies: [
      {
        Effect: 'Allow',
        Action: [
          'listDataRooms',
          'getFiles',
        ],
        Resource: [
          'ari:dataroom:US:123456789012:farm240',
          'ari:dataroom:US:123456789012:farm240/*',
        ],
      },
    ],
  },
});
```

### Delete Policy
Delete a specific policy from the IAM system:
```typescript
await client.deletePolicy('policyId');
```

## Example Usage

### Example: Creating a User, Role, and Policy
```typescript
import { IAMClient } from 'agsiri-iam-client';
import { config } from './config';

const client = new IAMClient(config.apiEndpoint);

async function setup() {
  // Login
  const token = await client.login('agsiri_user', 'agsiri123');
  config.authToken = token;

  // Create a user
  const user = await client.createUser({
    username: 'example_user',
    password: 'password',
    email: 'example_user@example.com',
  });

  // Create a policy
  const policy = await client.createPolicy({
    name: 'ExamplePolicy',
    document: {
      Version: '2023-01-01',
      Policies: [
        {
          Effect: 'Allow',
          Action: ['listDataRooms', 'getFiles'],
          Resource: [
            'ari:dataroom:US:123456789012:farm240',
            'ari:dataroom:US:123456789012:farm240/*',
          ],
        },
      ],
    },
  });

  // Create a role
  const role = await client.createRole({
    name: 'ExampleRole',
  });

  // Attach policy to role
  await client.attachPoliciesToRole(role._id, [policy.name]);

  // Attach role to user
  await client.attachRolesToUser(user._id, [role.name]);
}

setup().catch(console.error);
```

### Example: Managing Groups and Policies
```typescript
import { IAMClient } from 'agsiri-iam-client';
import { config } from './config';

const client = new IAMClient(config.apiEndpoint);

async function manageGroups() {
  // Login
  const token = await client.login('agsiri_user', 'agsiri123');
  config.authToken = token;

  // Create a group
  const group = await client.createGroup({
    name: 'ExampleGroup',
  });

  // Create a policy
  const policy = await client.createPolicy({
    name: 'GroupPolicy',
    document: {
      Version: '2023-01-

01',
      Policies: [
        {
          Effect: 'Allow',
          Action: ['listDataRooms', 'getFiles'],
          Resource: [
            'ari:dataroom:US:123456789012:farm240',
            'ari:dataroom:US:123456789012:farm240/*',
          ],
        },
      ],
    },
  });

  // Attach policy to group
  await client.attachPoliciesToGroup(group._id, [policy.name]);

  // Attach group to user
  const user = await client.getUserByName('example_user');
  await client.attachGroupsToUser(user._id, [group.name]);
}

manageGroups().catch(console.error);
```

## Complete Flow Example : User Onboarding Example
Here's a comprehensive example that demonstrates the full onboarding of a user using the Agsiri IAM client API. This example includes creating a user, adding policies, groups, and roles, and attaching these entities to the user. It also includes error handling and internationalization (i18n) using the developed framework.

### Full Onboarding Example
Use the following code to test the completeness of the iamClient implementation and its functionality.
For easy reference code is also available as `onboardingTutorial.ts`

import { IAMClient } from './iamClient';
import { config } from '../config/config';
import { translate, initI18n } from '../utils/i18n';

/**
 * Function to generate a unique suffix using the current timestamp and a random number.
 * This helps in creating unique names to avoid conflicts during testing and demonstrations.
 */
const generateUniqueSuffix = () => {
  return `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
};

/**
 * Function to generate a unique name with the "agsiri" prefix and a unique suffix.
 * @param baseName - The base name to use for generating the unique name.
 * @returns A unique name string.
 */
const generateUniqueName = (baseName: string) => {
  return `agsiri_${baseName}_${generateUniqueSuffix()}`;
};

async function setup() {
  await initI18n(); // Initialize i18n for translations

  // Create a new instance of the IAMClient
  const client = new IAMClient(config.apiEndpoint);

  try {
    // Step 1: Login to obtain a JWT token
    const token = await client.login('agsiri_user', 'agsiri123');
    config.authToken = token; // Store the token in the config for subsequent requests

    // Generate unique names for various entities to avoid conflicts
    const uniqueUsername = generateUniqueName('user');
    const uniqueReadPolicyName = generateUniqueName('ReadPolicy');
    const uniqueWritePolicyName = generateUniqueName('WritePolicy');
    const uniqueAdminGroupName = generateUniqueName('AdminGroup');
    const uniqueUserGroupName = generateUniqueName('UserGroup');
    const uniqueAdminPolicyName = generateUniqueName('AdminPolicy');
    const uniqueUserPolicyName = generateUniqueName('UserPolicy');
    const uniqueAdminRoleName = generateUniqueName('AdminRole');
    const uniqueUserRoleName = generateUniqueName('UserRole');

    // Step 2: Create a user
    const user = await client.createUser({
      username: uniqueUsername,
      password: 'password',
      email: `${uniqueUsername}@example.com`,
    });
    console.log(translate('USER_CREATED', { username: user.username })); // Log user creation

    // Step 3: Create policies
    const readPolicy = await client.createPolicy({
      name: uniqueReadPolicyName,
      document: {
        Version: '2023-01-01',
        Policies: [
          {
            Effect: 'Allow',
            Action: ['listDataRooms'],
            Resource: ['ari:dataroom:US:123456789012:farm240'],
          },
        ],
      },
    });
    console.log(translate('POLICY_CREATED', { policyName: readPolicy.name })); // Log policy creation

    const writePolicy = await client.createPolicy({
      name: uniqueWritePolicyName,
      document: {
        Version: '2023-01-01',
        Policies: [
          {
            Effect: 'Allow',
            Action: ['createDataRoom'],
            Resource: ['ari:dataroom:US:123456789012:farm240'],
          },
        ],
      },
    });
    console.log(translate('POLICY_CREATED', { policyName: writePolicy.name })); // Log policy creation

    // Step 4: Attach policies directly to the user
    await client.attachPoliciesToUser(user._id, [readPolicy.name, writePolicy.name]);
    console.log(translate('POLICIES_ATTACHED_USER', { username: user.username })); // Log policy attachment to user

    // Step 5: Create groups
    const adminGroup = await client.createGroup({ name: uniqueAdminGroupName });
    console.log(translate('GROUP_CREATED', { groupName: adminGroup.name })); // Log group creation

    const userGroup = await client.createGroup({ name: uniqueUserGroupName });
    console.log(translate('GROUP_CREATED', { groupName: userGroup.name })); // Log group creation

    // Step 6: Create policies for groups
    const adminPolicy = await client.createPolicy({
      name: uniqueAdminPolicyName,
      document: {
        Version: '2023-01-01',
        Policies: [
          {
            Effect: 'Allow',
            Action: ['*'],
            Resource: ['*'],
          },
        ],
      },
    });
    console.log(translate('POLICY_CREATED', { policyName: adminPolicy.name })); // Log policy creation

    const userPolicy = await client.createPolicy({
      name: uniqueUserPolicyName,
      document: {
        Version: '2023-01-01',
        Policies: [
          {
            Effect: 'Allow',
            Action: ['listDataRooms', 'getFiles'],
            Resource: [
              'ari:dataroom:US:123456789012:farm240',
              'ari:dataroom:US:123456789012:farm240/*'
            ],
          },
        ],
      },
    });
    console.log(translate('POLICY_CREATED', { policyName: userPolicy.name })); // Log policy creation

    // Step 7: Attach policies to groups
    await client.attachPoliciesToGroup(adminGroup._id, [adminPolicy.name]);
    console.log(translate('POLICIES_ATTACHED_GROUP', { groupName: adminGroup.name })); // Log policy attachment to group

    await client.attachPoliciesToGroup(userGroup._id, [userPolicy.name]);
    console.log(translate('POLICIES_ATTACHED_GROUP', { groupName: userGroup.name })); // Log policy attachment to group

    // Step 8: Attach groups to the user
    await client.attachGroupsToUser(user._id, [adminGroup.name, userGroup.name]);
    console.log(translate('GROUPS_ATTACHED_USER', { username: user.username })); // Log group attachment to user

    // Step 9: Create roles
    const adminRole = await client.createRole({ name: uniqueAdminRoleName });
    console.log(translate('ROLE_CREATED', { roleName: adminRole.name })); // Log role creation

    const userRole = await client.createRole({ name: uniqueUserRoleName });
    console.log(translate('ROLE_CREATED', { roleName: userRole.name })); // Log role creation

    // Step 10: Attach policies to roles
    await client.attachPoliciesToRole(adminRole._id, [adminPolicy.name]);
    console.log(translate('POLICIES_ATTACHED_ROLE', { roleName: adminRole.name })); // Log policy attachment to role

    await client.attachPoliciesToRole(userRole._id, [userPolicy.name]);
    console.log(translate('POLICIES_ATTACHED_ROLE', { roleName: userRole.name })); // Log policy attachment to role

    // Step 11: Attach roles to the user
    await client.attachRolesToUser(user._id, [adminRole.name, userRole.name]);
    console.log(translate('ROLES_ATTACHED_USER', { username: user.username })); // Log role attachment to user

    // Step 12: Dump all users, groups, roles, and policies
    const users = await client.listUsers();
    const groups = await client.listGroups();
    const roles = await client.listRoles();
    const policies = await client.listPolicies();

    console.log('Users:', JSON.stringify(users, null, 2)); // Log all users
    console.log('Groups:', JSON.stringify(groups, null, 2)); // Log all groups
    console.log('Roles:', JSON.stringify(roles, null, 2)); // Log all roles
    console.log('Policies:', JSON.stringify(policies, null, 2)); // Log all policies
    
    console.log(translate('USER_ONBOARDED', { username: user.username })); // Log user onboarding completion

  } catch (error) {
    // Log the error if any step fails
    console.error(translate('ERROR_OCCURRED'), error);
  }
}

setup(); // Execute the setup function
### How to run this code?
Once you complete the implementation of the iamClient.ts, place this in src/client directory.
make sure that you reference `config` and `locales` correctly ( update any keys required in locales/en/transalation.json).Once that is done, add any dependencies required to package.json file.

Run `npm install`

then

RUn `npx ts-node src/onboardingTutorial.ts` to test your code with the test program.
if you see errors, don't change the onboardingTutorial.ts but you should fix your code to work correctly with this test program.

