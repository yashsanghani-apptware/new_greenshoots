// src/controllers/policyEvaluator.ts

export interface Condition {
  match: {
    all?: { expr: string }[];
    any?: { expr: string }[];
    none?: { expr: string }[];
  };
}

export interface Rule {
  actions: string[];
  effect: 'ALLOW' | 'DENY';
  condition?: Condition;
}

export interface Policy {
  name: string;
  description: string;
  resource: string;
  variables?: {
    local?: { [key: string]: string };
  };
  rules: Rule[];
}

export interface EvaluationDetails {
  policy: string;
  rule: Rule;
  conditionEvaluation: any[];
  result: 'ALLOW' | 'DENY';
}

// Importing the custom operators
import { customOperators } from './customOperators';

const evaluateExpression = (expr: string, scope: any): boolean => {
  console.log('Evaluating expression:', expr);
  // console.log('Scope for expression:', JSON.stringify(scope, null, 2));

  try {
    const functionBody = `
      const { user, resource, context } = scope;
      const customOperators = scope.customOperators;
      return ${expr};
    `;
    const evaluateFn = new Function('scope', functionBody);
    const result = evaluateFn({ ...scope, customOperators });
    console.log(`Result of expression "${expr}":`, result);
    return !!result;
  } catch (error) {
    console.error(`Error evaluating expression ${expr}:`, error);
    return false;
  }
};

const evaluateConditions = (condition: Condition, scope: any): { result: boolean, details: any[] } => {
  const { match } = condition;
  let result = true;
  const details = [];

  if (match?.all) {
    // console.log("Evaluating 'all' conditions");
    for (const cond of match.all) {
      const evaluation = evaluateExpression(cond.expr, scope);
      details.push({ expr: cond.expr, result: evaluation });
      result = result && evaluation;
    }
  }

  if (match?.any) {
    // console.log("Evaluating 'any' conditions");
    let anyResult = false;
    for (const cond of match.any) {
      const evaluation = evaluateExpression(cond.expr, scope);
      details.push({ expr: cond.expr, result: evaluation });
      anyResult = anyResult || evaluation;
    }
    result = result && anyResult;
  }

  if (match?.none) {
    // console.log("Evaluating 'none' conditions");
    for (const cond of match.none) {
      const evaluation = evaluateExpression(cond.expr, scope);
      details.push({ expr: cond.expr, result: !evaluation });
      result = result && !evaluation;
    }
  }

  console.log("Condition evaluation results:", details);
  return { result, details };
};

export const evaluatePolicy = (
  user: any,
  resource: any,
  context: any,
  action: string,
  policies: Policy[]
): EvaluationDetails[] => {
  const evaluationDetails: EvaluationDetails[] = [];
  
  const initialScope: { [key: string]: any } = {
    user: user?.attr || {},
    resource: resource?.attr || {},
    context,
    customOperators // Pass the custom operators into the scope
  };

  console.log('Initial scope for evaluation:', JSON.stringify(initialScope, null, 2));

  for (const policy of policies) {
    console.log(`Evaluating policy: ${policy.name}`);
    const localScope: { [key: string]: any } = { ...initialScope };

    // Evaluate local variables
    for (const [key, expr] of Object.entries(policy.variables?.local || {})) {
      try {
        console.log(`Evaluating local variable ${key}: ${expr}`);
        localScope[key] = evaluateExpression(expr, localScope);
        console.log(`Local variable ${key} evaluated to: ${localScope[key]}`);
      } catch (error) {
        console.error(`Error evaluating local variable ${key}: ${expr}`, error);
        localScope[key] = false;
      }
    }

    for (const rule of policy.rules) {
      if (rule.actions.includes(action) || rule.actions.includes('*')) {
        console.log(`Evaluating rule for action: ${action}`);
        const { result, details } = evaluateConditions(rule.condition || { match: {} }, localScope);

        const finalResult = result ? rule.effect : 'DENY';

        evaluationDetails.push({
          policy: policy.name,
          rule,
          conditionEvaluation: details,
          result: finalResult
        });

        console.log(`Rule evaluation result: ${finalResult}`);

        if (finalResult === 'DENY' || finalResult === 'ALLOW') {
          return evaluationDetails;
        }
      } else {
        console.log(`Action ${action} not included in rule actions: ${rule.actions}`);
      }
    }
  }

  console.log('Final evaluation details:', evaluationDetails);
  return evaluationDetails;
};

