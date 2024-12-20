# Onboarding Tutorial: Step-by-Step Explanation

## Purpose of the Onboarding Tutorial

The onboarding tutorial demonstrates how to use the Agsiri IAMClient to manage users, roles, groups, and policies. By following this tutorial, developers can understand how to utilize the IAMClient methods to perform various Identity and Access Management (IAM) operations. It serves as a comprehensive guide for setting up an IAM system, showcasing the integration and usage of different IAM components such as users, roles, groups, and policies.

## Step-by-Step Breakdown

1. **Initialize i18n for Translations**
   ```typescript
   await initI18n();
   ```
   - Purpose: Initialize the i18n library to support internationalization for translating messages.

2. **Create an Instance of IAMClient**
   ```typescript
   const client = new IAMClient(config.apiEndpoint);
   ```
   - Purpose: Instantiate the IAMClient with the API endpoint configuration.

3. **Login to Obtain a JWT Token**
   ```typescript
   const token = await client.login('agsiri_user', 'agsiri123');
   config.authToken = token;
   ```
   - Purpose: Authenticate with the IAM service to obtain a JWT token for subsequent API requests.

4. **Generate Unique Names for Various Entities**
   ```typescript
   const uniqueUsername = generateUniqueName('user');
   const uniqueReadPolicyName = generateUniqueName('ReadPolicy');
   const uniqueWritePolicyName = generateUniqueName('WritePolicy');
   const uniqueAdminGroupName = generateUniqueName('AdminGroup');
   const uniqueUserGroupName = generateUniqueName('UserGroup');
   const uniqueAdminPolicyName = generateUniqueName('AdminPolicy');
   const uniqueUserPolicyName = generateUniqueName('UserPolicy');
   const uniqueAdminRoleName = generateUniqueName('AdminRole');
   const uniqueUserRoleName = generateUniqueName('UserRole');
   ```
   - Purpose: Generate unique names for users, policies, groups, and roles to avoid conflicts and ensure each entity is uniquely identifiable.

5. **Create a User**
   ```typescript
   const user = await client.createUser({
     username: uniqueUsername,
     password: 'password',
     email: `${uniqueUsername}@example.com`,
   });
   console.log(translate('USER_CREATED', { username: user.username }));
   ```
   - Purpose: Create a new user with the generated unique username and log the creation event.

6. **Create Policies**
   ```typescript
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
   console.log(translate('POLICY_CREATED', { policyName: readPolicy.name }));

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
   console.log(translate('POLICY_CREATED', { policyName: writePolicy.name }));
   ```
   - Purpose: Create "read" and "write" policies and log the creation events.

7. **Attach Policies Directly to the User**
   ```typescript
   await client.attachPoliciesToUser(user._id, [readPolicy.name, writePolicy.name]);
   console.log(translate('POLICIES_ATTACHED_USER', { username: user.username }));
   ```
   - Purpose: Attach the created policies to the user and log the attachment event.

8. **Create Groups**
   ```typescript
   const adminGroup = await client.createGroup({ name: uniqueAdminGroupName });
   console.log(translate('GROUP_CREATED', { groupName: adminGroup.name }));

   const userGroup = await client.createGroup({ name: uniqueUserGroupName });
   console.log(translate('GROUP_CREATED', { groupName: userGroup.name }));
   ```
   - Purpose: Create "admin" and "user" groups and log the creation events.

9. **Create Policies for Groups**
   ```typescript
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
   console.log(translate('POLICY_CREATED', { policyName: adminPolicy.name }));

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
   console.log(translate('POLICY_CREATED', { policyName: userPolicy.name }));
   ```
   - Purpose: Create "admin" and "user" policies for groups and log the creation events.

10. **Attach Policies to Groups**
    ```typescript
    await client.attachPoliciesToGroup(adminGroup._id, [adminPolicy.name]);
    console.log(translate('POLICIES_ATTACHED_GROUP', { groupName: adminGroup.name }));

    await client.attachPoliciesToGroup(userGroup._id, [userPolicy.name]);
    console.log(translate('POLICIES_ATTACHED_GROUP', { groupName: userGroup.name }));
    ```
    - Purpose: Attach the created policies to the respective groups and log the attachment events.

11. **Attach Groups to the User**
    ```typescript
    await client.attachGroupsToUser(user._id, [adminGroup.name, userGroup.name]);
    console.log(translate('GROUPS_ATTACHED_USER', { username: user.username }));
    ```
    - Purpose: Attach the created groups to the user and log the attachment event.

12. **Create Roles**
    ```typescript
    const adminRole = await client.createRole({ name: uniqueAdminRoleName });
    console.log(translate('ROLE_CREATED', { roleName: adminRole.name }));

    const userRole = await client.createRole({ name: uniqueUserRoleName });
    console.log(translate('ROLE_CREATED', { roleName: userRole.name }));
    ```
    - Purpose: Create "admin" and "user" roles and log the creation events.

13. **Attach Policies to Roles**
    ```typescript
    await client.attachPoliciesToRole(adminRole._id, [adminPolicy.name]);
    console.log(translate('POLICIES_ATTACHED_ROLE', { roleName: adminRole.name }));

    await client.attachPoliciesToRole(userRole._id, [userPolicy.name]);
    console.log(translate('POLICIES_ATTACHED_ROLE', { roleName: userRole.name }));
    ```
    - Purpose: Attach the created policies to the respective roles and log the attachment events.

14. **Attach Roles to the User**
    ```typescript
    await client.attachRolesToUser(user._id, [adminRole.name, userRole.name]);
    console.log(translate('ROLES_ATTACHED_USER', { username: user.username }));
    ```
    - Purpose: Attach the created roles to the user and log the attachment event.

15. **Dump All Users, Groups, Roles, and Policies**
    ```typescript
    const users = await client.listUsers();
    const groups = await client.listGroups();
    const roles = await client.listRoles();
    const policies = await client.listPolicies();

    console.log('Users:', JSON.stringify(users, null, 2)); // Log all users
    console.log('Groups:', JSON.stringify(groups, null, 2)); // Log all groups
    console.log('Roles:', JSON.stringify(roles, null, 2)); // Log all roles
    console.log('Policies:', JSON.stringify(policies, null, 2)); // Log all policies
    ```
    - Purpose: Retrieve and log all users, groups, roles, and policies to verify that the setup was successful.

16. **Handle Errors**
    ```typescript
    } catch (error) {
      // Log the error if any step fails
      console.error(translate('ERROR_OCCURRED'), error);
    }
    ```
    - Purpose: Catch and log any errors that occur during the onboarding process, ensuring that issues can be diagnosed and resolved.

### How the Onboarding Tutorial Helps Develop the IAMClient Code

The onboarding tutorial provides a practical example of how to use the IAMClient to perform common IAM operations. By following this tutorial, developers can:

- **Understand IAMClient Methods**: Learn how to use the various methods provided by the IAMClient to create, retrieve, update, and delete IAM entities.
- **Integration of IAM Components**: See how different IAM components (users, roles, groups, policies) are integrated and interact with each other.
- **Generate Unique Names**: Understand the importance of generating unique names for testing and demonstration purposes.
- **Handle Authentication**: Learn how to authenticate and manage JWT tokens for API requests.
- **Error Handling**: See examples of error handling to ensure robustness and reliability of the IAMClient code.
- **Internationalization (i18n)**: Learn how to integrate internationalization to support multiple languages in log messages and user feedback.
- **Complete IAM Workflow**: Follow a complete workflow from user creation to attaching roles and policies, providing a comprehensive guide to setting up an IAM system.

By using the onboarding tutorial

 as a reference, developers can develop and test the IAMClient code effectively, ensuring that it meets the requirements for managing IAM entities in a secure and efficient manner.
