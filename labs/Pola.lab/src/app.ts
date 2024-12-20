import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { evaluatePolicy, Policy } from './controllers/policyEvaluator';

// Utility function to load YAML files and parse them into JSON
const loadYamlFile = (filePath: string): any => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing YAML file at ${filePath}:`, error);
    return null;
  }
};

// Load policies from policies.yaml
const policiesFilePath = path.join(__dirname, '../policies/policies.yaml');
const policies: Policy[] = loadYamlFile(policiesFilePath);

if (!policies) {
  console.error('Failed to load policies.');
  process.exit(1);
}

// Load scenarios from scenario.yaml
const scenarioFilePath = path.join(__dirname, '../policies/scenario.yaml');
const scenarios = loadYamlFile(scenarioFilePath);

if (!scenarios) {
  console.error('Failed to load scenarios.');
  process.exit(1);
}

// Iterate over scenarios and evaluate each one
scenarios.forEach((scenario: any) => {
  console.log(`Evaluating Scenario ID: ${scenario.scenarioId}`);
  const { user, resource, context, action } = scenario;

  console.log('User:', JSON.stringify(user, null, 2));
  console.log('Resource:', JSON.stringify(resource, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));
  console.log('Action:', action);

  const evaluationResults = evaluatePolicy(user, resource, context, action, policies);
  console.log('Evaluation Results:', JSON.stringify(evaluationResults, null, 2));
});

