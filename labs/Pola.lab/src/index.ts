// src/index.ts

import { evaluatePolicy, Policy } from './controllers/policyEvaluator';

// Sample policies
const policies: Policy[] = [
  {
    name: 'Admin Policy',
    description: 'Admin users can perform all actions on active resources.',
    resource: 'ari:resource:example',
    variables: {
      local: {
        is_internal_network: 'user.network === "internal"'
      }
    },
    rules: [
      {
        actions: ['read', 'write', 'delete'],
        effect: 'ALLOW',
        condition: {
          match: {
            all: [
              { expr: 'user.role === "admin"' },
              { expr: 'resource.status === "active"' }
            ]
          }
        }
      }
    ]
  },
  {
    name: 'Guest Policy',
    description: 'Guest users can only read active resources and cannot delete any resource.',
    resource: 'ari:resource:example',
    rules: [
      {
        actions: ['read'],
        effect: 'ALLOW',
        condition: {
          match: {
            all: [
              { expr: 'user.role === "guest"' },
              { expr: 'resource.status === "active"' }
            ]
          }
        }
      },
      {
        actions: ['delete'],
        effect: 'DENY',
        condition: {
          match: {
            all: [
              { expr: 'user.role === "guest"' }
            ]
          }
        }
      }
    ]
  }
];

// Sample user and resource data
const user = {
  attr: {
    role: 'admin',
    network: 'internal'
  }
};

const resource = {
  attr: {
    status: 'active'
  }
};

const context = {}; // Additional context (if needed)

// Action to evaluate
const action = 'delete';

// Evaluate policies
const evaluationResults = evaluatePolicy(user, resource, context, action, policies);

console.log('Evaluation Results:', JSON.stringify(evaluationResults, null, 2));

