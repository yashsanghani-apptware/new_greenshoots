# User Guide for Policy Expression Evaluator System

## Introduction

The Policy Expression Evaluator is a robust and scalable engine designed to evaluate policies and scenarios, similar to Google's Common Expression Language (CEL). This guide will walk you through the process of setting up the system, understanding its structure, and running the evaluator to test policies against defined scenarios.

## Project Structure

Here is the directory structure of the project:

```
/Policy-Expression-Evaluator
├── /Policies
│   ├── policies.yaml
│   └── scenario.yaml
├── /src
│   ├── evaluator.ts
│   └── policyEvaluator.ts
├── /test
│   ├── policyEvaluator.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Key Files and Directories

- **`/Policies`**: This directory contains the policy and scenario files in YAML format that define the policies to be evaluated and the scenarios to be tested.
  - **`policies.yaml`**: Defines a set of policies, including rules, conditions, and actions.
  - **`scenario.yaml`**: Describes scenarios that the evaluator will use to test the policies.

- **`/src`**: This directory contains the source code for the evaluator.
  - **`evaluator.ts`**: The main driver program that loads the policies and scenarios, runs the evaluation, and outputs the results.
  - **`policyEvaluator.ts`**: The core logic for evaluating the policies against the scenarios.

- **`/test`**: Contains test cases to validate the functionality of the policy evaluator.
  - **`policyEvaluator.test.ts`**: Test cases for the policy evaluation logic.

- **`package.json`**: Contains metadata about the project and its dependencies.

- **`tsconfig.json`**: TypeScript configuration file.

## Prerequisites

Before you can run the Policy Expression Evaluator, ensure you have the following installed:

- **Node.js**: Version 14.x or higher.
- **TypeScript**: Version 4.x or higher.
- **ts-node**: A TypeScript execution engine for Node.js that allows you to run TypeScript files directly.

You can install TypeScript and ts-node globally using npm:

```bash
npm install -g typescript ts-node
```

## Setup and Installation

1. **Clone the repository**:
   Clone the project repository to your local machine.

   ```bash
   git clone https://github.com/your-repo/Policy-Expression-Evaluator.git
   cd Policy-Expression-Evaluator
   ```

2. **Install dependencies**:
   Install the necessary Node.js packages.

   ```bash
   npm install
   ```

3. **Prepare the Policies and Scenarios**:
   Ensure that your `policies.yaml` and `scenario.yaml` files are correctly placed in the `/Policies` directory. These files should be in YAML format and define the policies and scenarios you wish to evaluate.

## Running the Evaluator

To run the Policy Expression Evaluator, navigate to the project root directory and execute the following command:

```bash
ts-node src/evaluator.ts
```

This command will:

1. **Load the policies**: The evaluator will load the `policies.yaml` file from the `/Policies` directory.
2. **Load the scenarios**: It will then load the `scenario.yaml` file, which contains the scenarios to be tested.
3. **Evaluate the scenarios**: The evaluator will process each scenario against the defined policies, using the rules and conditions specified in the YAML files.
4. **Output the results**: The evaluation results, including whether each scenario passed or failed, will be output to the console.

### Example Output

Running the evaluator might produce an output similar to the following:

```
Evaluating scenario: Scenario 1
  - Policy: Policy 1
    - Rule: Allow access to resource 123
    - Condition: User role is 'admin'
    - Result: ALLOW
Scenario 1 passed.

Evaluating scenario: Scenario 2
  - Policy: Policy 2
    - Rule: Deny access to resource 456
    - Condition: Resource status is 'inactive'
    - Result: DENY
Scenario 2 failed.

Evaluation complete. 1 scenario passed, 1 scenario failed.
```

## Writing Policies and Scenarios

### Policies (`policies.yaml`)

A policy consists of rules that define what actions are allowed or denied under certain conditions. Here is a basic example of a policy definition in YAML:

```yaml
policies:
  - name: "Policy 1"
    description: "Allow access to resource 123 for admin users"
    resource: "resource123"
    rules:
      - actions: ["read"]
        effect: "ALLOW"
        condition:
          match:
            all:
              - expr: "user.role == 'admin'"
  - name: "Policy 2"
    description: "Deny access to inactive resources"
    resource: "resource456"
    rules:
      - actions: ["*"]
        effect: "DENY"
        condition:
          match:
            any:
              - expr: "resource.status == 'inactive'"
```

### Scenarios (`scenario.yaml`)

A scenario describes a test case, specifying a user, resource, and action to evaluate against the policies. Here is a basic example:

```yaml
scenarios:
  - name: "Scenario 1"
    description: "Admin tries to read resource 123"
    user:
      id: "user123"
      attr:
        role: "admin"
    resource:
      id: "resource123"
      attr:
        status: "active"
    action: "read"

  - name: "Scenario 2"
    description: "Guest tries to delete inactive resource 456"
    user:
      id: "user456"
      attr:
        role: "guest"
    resource:
      id: "resource456"
      attr:
        status: "inactive"
    action: "delete"
```

## Testing and Validation

After setting up your policies and scenarios, it's important to validate that the evaluator works as expected.

1. **Run the Evaluator**: Use the `ts-node` command as described earlier to run the evaluator.
2. **Review the Output**: Check the console output to see which scenarios passed or failed.
3. **Refine Policies**: If a scenario fails unexpectedly, review and refine your policies to ensure they align with the desired outcomes.

## Conclusion

The Policy Expression Evaluator is a powerful tool for testing and enforcing policies within your system. By following this guide, you should be able to set up the evaluator, define your policies and scenarios, and run evaluations to ensure your policies are correctly implemented.
