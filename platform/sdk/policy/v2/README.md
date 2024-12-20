# Agsiri Smart Policy Engine Example

This README provides instructions for building and running the example code that demonstrates how to use the Agsiri Smart Policy Engine to manage resource policies. The example code includes operations such as creating, retrieving, updating, and deleting policies through the `PolicyClient`.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Example Program](#running-the-example-program)
- [Code Overview](#code-overview)
- [Expected Output](#expected-output)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.x or later)
- **npm** (version 7.x or later)
- **Docker** (to run the Agsiri API server)

## Setup Instructions

### 1. Clone the Repository

Clone the repository containing the example code:

```bash
git clone https://github.com/coretical/agsiri-policy-sdk.git
cd agsiri-policy-sdk
```

### 2. Install Dependencies

Install the required Node.js dependencies using npm:

```bash
npm install
```

### 3. Start the Agsiri API Server

To interact with the Agsiri API, you'll need to run the Agsiri server locally using Docker. Pull and start the Docker container as follows:

```bash
docker pull agsiri/agsiri-server:latest
docker run -it -p 1963:1963 agsiri/agsiri-server:latest
```

### 4. Update Configuration (Optional)

If necessary, update the API base URL and other configurations in the `Config` file (`src/config/Config.ts`).

## Running the Example Program

After setting up the environment, you can run the example program to see the Agsiri Smart Policy Engine in action.

### 1. Compile the TypeScript Code

Before running the code, ensure that the TypeScript files are compiled:

```bash
npm run build
```

### 2. Run the Example Program

Execute the example program to perform the policy management operations:

```bash
node dist/example.js
```

## Code Overview

### File: `src/example.ts`

The example program demonstrates the following operations:

1. **Creating a Resource Policy**: Defines a resource policy with specific actions and effects and submits it to the Agsiri API.
2. **Retrieving a Policy**: Fetches the created policy using its ID to verify the stored data.
3. **Updating the Policy**: Modifies the existing policy by adding a new rule.
4. **Deleting the Policy**: Removes the policy from the system by its ID.

### Key Components:

- **PolicyClient**: The primary client used to interact with the Agsiri Policy API.
- **HttpClient**: A utility class for making HTTP requests.
- **IPolicySchema and IResourcePolicy**: Interfaces that define the structure of the policy schema and resource policy.

## Expected Output

When you run the example program, you should see output similar to the following:

```bash
Created Resource Policy: { ... }
Retrieved Policy: { ... }
Updated Policy: { ... }
Policy with ID resourcePolicyId deleted successfully
```

This output confirms that the policy was successfully created, retrieved, updated, and deleted.

## Troubleshooting

### Common Issues:

- **Server Not Running**: Ensure that the Agsiri API server is running locally on port 3592.
- **TypeScript Compilation Errors**: Make sure that all TypeScript interfaces are correctly defined and that the TypeScript compiler is set up properly.
- **Network Issues**: Verify your network connection if you're having trouble reaching the API.

### Logs and Debugging:

Use the console logs provided in the example program to trace each step. If an error occurs, check the error message and stack trace for more details.

### Additional Help:

If you encounter any issues not covered in this guide, please refer to the Agsiri Smart Policy Engine documentation or open an issue on the GitHub repository.

## Conclusion

This example showcases the basic usage of the Agsiri Smart Policy Engine for managing resource policies. By following the steps outlined in this README, you should be able to set up your environment, run the example code, and understand how to integrate similar functionality into your own applications.

Feel free to explore the SDK further and customize it to meet your specific policy management needs.
