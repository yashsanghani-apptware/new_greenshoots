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


```typescript
import { IAMClient } from 'agsiri-iam-client';
import { config } from './config';
import { translate, initI18n } from './utils/i18n';

async function setup() {
  // Initialize i18n for internationalization
  await initI18n();

  // Create an instance of the IAMClient with the API endpoint
  const client = new IAMClient(config.apiEndpoint);

  try {
    // Step 1: Login to obtain a JWT token
    // This token will be used for authentication in subsequent requests
    const token = await client.login('agsiri_user', 'agsiri123');
    config.authToken = token;

    // Step 2: Create a user
    // This user will be onboarded with various policies, groups, and roles
    const user = await client.createUser({
      username: 'example_user',
      password: 'password',
      email: 'example_user@example.com',
    });
    console.log(translate('USER_CREATED', { username: user.username }));

    // Step 3: Create policies
    // Create a read-only policy
    const readPolicy = await client.createPolicy({
      name: 'ReadPolicy',
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
    console.log(translate('POLICY_CREATED', { policyName: readPolicy.name }));

    // Create a write policy
    const writePolicy = await client.createPolicy({
      name: 'WritePolicy',
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
    console.log(translate('POLICY_CREATED', { policyName: writePolicy.name }));

    // Step 4: Attach policies directly to the user
    // Attach the read and write policies to the user
    await client.attachPoliciesToUser(user._id, [readPolicy.name, writePolicy.name]);
    console.log(translate('POLICIES_ATTACHED', { username: user.username }));

    // Step 5: Create groups
    // Create an admin group
    const adminGroup = await client.createGroup({ name: 'AdminGroup' });
    console.log(translate('GROUP_CREATED', { groupName: adminGroup.name }));

    // Create a user group
    const userGroup = await client.createGroup({ name: 'UserGroup' });
    console.log(translate('GROUP_CREATED', { groupName: userGroup.name }));

    // Step 6: Create policies for groups
    // Create an admin policy with full access
    const adminPolicy = await client.createPolicy({
      name: 'AdminPolicy',
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
    console.log(translate('POLICY_CREATED', { policyName: adminPolicy.name }));

    // Create a user policy with limited access
    const userPolicy = await client.createPolicy({
      name: 'UserPolicy',
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
    console.log(translate('POLICY_CREATED', { policyName: userPolicy.name }));

    // Step 7: Attach policies to groups
    // Attach the admin policy to the admin group
    await client.attachPoliciesToGroup(adminGroup._id, [adminPolicy.name]);
    console.log(translate('POLICIES_ATTACHED', { groupName: adminGroup.name }));

    // Attach the user policy to the user group
    await client.attachPoliciesToGroup(userGroup._id, [userPolicy.name]);
    console.log(translate('POLICIES_ATTACHED', { groupName: userGroup.name }));

    // Step 8: Attach groups to the user
    // Attach the admin and user groups to the user
    await client.attachGroupsToUser(user._id, [adminGroup.name, userGroup.name]);
    console.log(translate('GROUPS_ATTACHED', { username: user.username }));

    // Step 9: Create roles
    // Create an admin role
    const adminRole = await client.createRole({ name: 'AdminRole' });
    console.log(translate('ROLE_CREATED', { roleName: adminRole.name }));

    // Create a user role
    const userRole = await client.createRole({ name: 'UserRole' });
    console.log(translate('ROLE_CREATED', { roleName: userRole.name }));

    // Step 10: Attach policies to roles
    // Attach the admin policy to the admin role
    await client.attachPoliciesToRole(adminRole._id, [adminPolicy.name]);
    console.log(translate('POLICIES_ATTACHED', { roleName: adminRole.name }));

    // Attach the user policy to the user role
    await client.attachPoliciesToRole(userRole._id, [userPolicy.name]);
    console.log(translate('POLICIES_ATTACHED', { roleName: userRole.name }));

    // Step 11: Attach roles to the user
    // Attach the admin and user roles to the user
    await client.attachRolesToUser(user._id, [adminRole.name, userRole.name]);
    console.log(translate('ROLES_ATTACHED', { username: user.username }));

    // Final message indicating successful onboarding
    console.log(translate('USER_ONBOARDED', { username: user.username }));
  } catch (error) {
    // Log any errors that occur during the onboarding process
    console.error(translate('ERROR_OCCURRED'), error.message);
  }
}

// Execute the setup function and handle any uncaught errors
setup().catch((error) => {
  console.error(translate('ERROR_OCCURRED'), error.message);
});
```

### Explanation of Steps

1. **Initialize i18n**: Initializes the internationalization module to support localized messages.
2. **Create IAM Client**: Creates an instance of the IAMClient with the API endpoint.
3. **Login**: Authenticates with the IAM service to obtain a JWT token.
4. **Create User**: Creates a new user in the IAM system.
5. **Create Policies**: 
   - `ReadPolicy`: Allows listing data rooms.
   - `WritePolicy`: Allows creating data rooms.
6. **Attach Policies to User**: Attaches the created policies directly to the user.
7. **Create Groups**:
   - `AdminGroup`: A group for admin users.
   - `UserGroup`: A group for regular users.
8. **Create Group Policies**:
   - `AdminPolicy`: Grants full access to all resources.
   - `UserPolicy`: Grants limited access to specific resources.
9. **Attach Policies to Groups**: Attaches the policies to the respective groups.
10. **Attach Groups to User**: Associates the groups with the user.
11. **Create Roles**:
    - `AdminRole`: A role for admin users.
    - `UserRole`: A role for regular users.
12. **Attach Policies to Roles**: Attaches the policies to the respective roles.
13. **Attach Roles to User**: Associates the roles with the user.
14. **Final Message**: Logs a message indicating that the user has been successfully onboarded.

### Translations

Here is an example of the `locales/en/translation.json` file for i18n:

```json
{
  "USER_CREATED": "User {username} has been created.",
  "POLICY_CREATED": "Policy {policyName} has been created.",
  "POLICIES_ATTACHED": "Policies have been attached to {username}.",
  "GROUP_CREATED": "Group {groupName} has been created.",
  "GROUPS_ATTACHED": "Groups have been attached to {username}.",
  "ROLE_CREATED": "Role {roleName} has been created.",
  "ROLES_ATTACHED": "Roles have been attached to {username}.",
  "USER_ONBOARDED": "User {username} has been successfully onboarded.",
  "ERROR_OCCURRED": "An error occurred: "
}
```

This detailed example demonstrates the full onboarding process of a user using the Agsiri IAM client API, including creating and attaching policies, groups, and roles, with proper error handling and internationalization.
