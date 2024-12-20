import { IAMClient } from '../client/iamClient';
import { config } from '../config/config';
import { translate, initI18n } from '../utils/i18n';

// Function to generate a unique suffix using the current timestamp and a random number
const generateUniqueSuffix = () => {
  return `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
};

// Function to generate a unique name with the "agsiri" prefix and a unique suffix
const generateUniqueName = (baseName: string) => {
  return `agsiri_${baseName}_${generateUniqueSuffix()}`;
};

async function setup() {
  await initI18n(); // Initialize i18n

  const client = new IAMClient(config.apiEndpoint);

  try {

    // Step 0: Creat an initial user
		
    // const ruser = await client.createUser({
    //   name: 'Siri',
    //   givenName: 'Siri',
    //   familyName: 'Siri',
    //   email: 'agsiri@example.com',
    //   telephone: '1234567890',
    //   username: 'agsiri',
    //   password: 'password',
    //   address: {
    //     streetAddress: '123 Main St',
    //     addressLocality: 'Anytown',
    //     addressRegion: 'CA',
    //     postalCode: '12345',
    //     addressCountry: 'USA',
    //   },
    //   contactPoint: {
    //     telephone: '1234567890',
    //     contactType: 'email',
    //     email: 'agsiri@example.com',
    //   },
    // });
    // console.log(translate('USER_CREATED', { username: ruser.username }));

    
    

    // Generate unique names
    const uniqueUsername = generateUniqueName('user');
    const uniqueReadPolicyName = generateUniqueName('ReadPolicy');
    const uniqueWritePolicyName = generateUniqueName('WritePolicy');
    const uniqueAdminGroupName = generateUniqueName('AdminGroup');
    const uniqueUserGroupName = generateUniqueName('UserGroup');
    const uniqueAdminPolicyName = generateUniqueName('AdminPolicy');
    const uniqueUserPolicyName = generateUniqueName('UserPolicy');
    const uniqueAdminRoleName = generateUniqueName('AdminRole');
    const uniqueUserRoleName = generateUniqueName('UserRole');

    // Step 1: Create a user
    const user = await client.createUser({
      name: 'Siri',
      givenName: 'Siri',
      familyName: 'Siri',
      email: 'agsiri@example.com',
      telephone: '1234567890',
      username: 'agsiri',
      password: 'password',
      address: {
        streetAddress: '123 Main St',
        addressLocality: 'Anytown',
        addressRegion: 'CA',
        postalCode: '12345',
        addressCountry: 'USA',
      },
      contactPoint: {
        telephone: '1234567890',
        contactType: 'email',
        email: 'agsiri@example.com',
      },
    });
    console.log(translate('USER_CREATED', { username: user.username }));

     // Step 2: Login to obtain a JWT token
    const token = await client.login("agsiri",
    "password");
    config.authToken = token;

    // Step 3: Create policies
    const readPolicy = await client.createPolicy({
      "apiVersion": "api.agsiri.dev/v1",
      "description": "Allow access if the principal is an employee in GB.",
      "principalPolicy": {
        "principal": "employee",
        "version": "1.0",
        "rules": [
          {
            "resource": "ari:agsiri:dataroom:us:123456789012:resource/*",
            "actions": [
              {
                "action": "access",
                "effect": "EFFECT_ALLOW",
                "condition": {
                  "match": {
                    "all": {
                      "of": [
                        {"expr": "P.attr.geography == 'GB'"},
                        {"expr": "request.resource.attr.owner == P.id"}
                      ]
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      "auditInfo": {
        "createdBy": "admin",
        "createdAt": new Date("2024-08-19T12:00:00Z")
      }
    });
    console.log(translate('POLICY_CREATED', { policyName: readPolicy._id }));

    // const writePolicy = await client.createPolicy({
    //   name: uniqueWritePolicyName,
    //   document: {
    //     Version: '2023-01-01',
    //     Policies: [
    //       {
    //         Effect: 'Allow',
    //         Action: ['createDataRoom'],
    //         Resource: ['ari:dataroom:US:123456789012:farm240'],
    //       },
    //     ],
    //   },
    // });
    // console.log(translate('POLICY_CREATED', { policyName: writePolicy.name }));

    // Step 4: Attach policies directly to the user
    await client.attachPoliciesToUser(user._id, [readPolicy._id]);
    console.log(translate('POLICIES_ATTACHED_USER', { username: user.username }));

    // Step 5: Create groups
    const adminGroup = await client.createGroup({
      name: uniqueAdminGroupName,
      description: 'Admin group',
      memberOf: 'members',
      members: [user._id],

       });
    console.log(translate('GROUP_CREATED', { groupName: adminGroup.name }));

    const userGroup = await client.createGroup({ 
      name: uniqueUserGroupName,
      description: 'Admin group',
      memberOf: 'members',
      members: [user._id],
    });
    console.log(translate('GROUP_CREATED', { groupName: userGroup.name }));

    // Step 6: Create policies for groups
    const adminPolicy = await client.createPolicy({
      "apiVersion": "api.agsiri.dev/v1",
      "description": "Allow actions if the resource is pending approval and located in GB.",
      "resourcePolicy": {
        "resource": "ari:agsiri:dataroom:us:123456789012:resource/*",
        "version": "1.0",
        "rules": [
          {
            "actions": ["view", "edit"],
            "effect": "EFFECT_ALLOW",
            "condition": {
              "match": {
                "all": {
                  "of": [
                    {"expr": "R.attr.status == 'PENDING_APPROVAL'"},
                    {"expr": "'GB' in R.attr.geographies"}
                  ]
                }
              }
            }
          }
        ]
      },
      "auditInfo": {
        "createdBy": "admin",
        "createdAt": new Date("2024-08-19T12:00:00Z")
      }
    }
    );
    console.log(translate('POLICY_CREATED', { policyName: adminPolicy._id }));

    const userPolicy = await client.createPolicy({
      "apiVersion": "api.agsiri.dev/v1",
      "description": "Allow actions if the resource is pending approval and located in GB.",
      "resourcePolicy": {
        "resource": "ari:agsiri:dataroom:us:123456789012:resource/*",
        "version": "1.0",
        "rules": [
          {
            "actions": ["view", "edit"],
            "effect": "EFFECT_ALLOW",
            "condition": {
              "match": {
                "all": {
                  "of": [
                    {"expr": "R.attr.status == 'PENDING_APPROVAL'"},
                    {"expr": "'GB' in R.attr.geographies"}
                  ]
                }
              }
            }
          }
        ]
      },
      "auditInfo": {
        "createdBy": "admin",
        "createdAt": new Date("2024-08-19T12:00:00Z")
      }
    });
    console.log(translate('POLICY_CREATED', { policyName: userPolicy._id }));

    // Step 7: Attach policies to groups
     await client.attachPoliciesToGroup(adminGroup._id, [adminPolicy._id]);
    
    console.log(translate('POLICIES_ATTACHED_GROUP', { groupName: adminGroup.name }));

    await client.attachPoliciesToGroup(userGroup._id, [userPolicy._id]);
    console.log(translate('POLICIES_ATTACHED_GROUP', { groupName: userGroup.name }));

    // Step 8: Attach groups to the user
    await client.attachGroupsToUser(user._id, [adminGroup._id]);
    console.log(translate('GROUPS_ATTACHED', { username: user.username }));

    // Step 9: Create roles
    const adminRole = await client.createRole({ 
      name: uniqueAdminRoleName,
      description: 'Admin role',
    });
    console.log(translate('ROLE_CREATED', { roleName: adminRole.name }));

    const userRole = await client.createRole({ 
      name: uniqueUserRoleName,
      description: 'User role'
    });
    console.log(translate('ROLE_CREATED', { roleName: userRole.name }));

    // Step 10: Attach policies to roles
    await client.attachPoliciesToRole(adminRole._id, [adminPolicy._id]);
    console.log(translate('POLICIES_ATTACHED_ROLE', { roleName: adminRole.name }));

    await client.attachPoliciesToRole(userRole._id, [userPolicy._id]);
    console.log(translate('POLICIES_ATTACHED_ROLE', { roleName: userRole.name }));

    // Step 11: Attach roles to the user
    await client.attachRolesToUser(user._id, [adminRole._id]);
    console.log(translate('ROLES_ATTACHED', { username: user.username }));

    console.log(translate('USER_ONBOARDED', { username: user.username }));

    // Step 12: Dump all users, groups, roles, and policies
    const users = await client.listUsers();
    console.log('All Users:', JSON.stringify(users, null, 2));

    const groups = await client.listGroups();
    console.log('All Groups:', JSON.stringify(groups, null, 2));

    const roles = await client.listRoles();
    console.log('All Roles:', JSON.stringify(roles, null, 2));

    const policies = await client.listPolicies();
    console.log('All Policies:', JSON.stringify(policies, null, 2));
    await client.deleteUser(user._id);
    await client.deletePolicy(adminPolicy._id);
    await client.deletePolicy(userPolicy._id);
    await client.deletePolicy(readPolicy._id);
    await client.deleteRole(adminRole._id);
    await client.deleteRole(userRole._id);
    await client.deleteGroup(adminGroup._id);
    await client.deleteGroup(userGroup._id);


  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Request failed with status code')) {
        console.error(translate('ERROR_OCCURRED', { message: translate('REQUEST_FAILED', { statusCode: error.message.split(' ').pop() }) }));
      } else {
        console.error(translate('ERROR_OCCURRED', { message: error.message }));
      }
    } else {
      console.error(translate('ERROR_OCCURRED', { message: error }));
    }
  }
}

setup().catch((error) => {
  if (error instanceof Error) {
    if (error.message.includes('Request failed with status code')) {
      console.error(translate('ERROR_OCCURRED', { message: translate('REQUEST_FAILED', { statusCode: error.message.split(' ').pop() }) }));
    } else {
      console.error(translate('ERROR_OCCURRED', { message: error.message }));
    }
  } else {
    console.error(translate('ERROR_OCCURRED', { message: error }));
  }
});

