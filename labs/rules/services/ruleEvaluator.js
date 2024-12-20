const Rule = require('../models/rule');
const Ruleset = require('../models/ruleset');
const Fact = require('../models/fact');
const notificationService = require('./notificationService');
const workflowService = require('./workflowService');
const caseService = require('./caseService');
const logger = require('../utils/logger');

const evaluateRule = (rule, facts) => {
  for (const condition of rule.conditions) {
    const fact = facts.find(f => f.name === condition.fact);
    if (!fact) return false;
    const factValue = fact[condition.property];
    const conditionValue = condition.value;

    switch (condition.operator) {
      case '==': if (factValue != conditionValue) return false; break;
      case '>': if (factValue <= conditionValue) return false; break;
      case '<': if (factValue >= conditionValue) return false; break;
      // Add more operators as needed
      default: return false;
    }
  }
  return true;
};

const executeActions = async (actions, facts) => {
  for (const action of actions) {
    switch (action.actionType) {
      case 'setProperty':
        const fact = facts.find(f => f.name === action.fact);
        if (fact) fact[action.property] = action.value;
        break;
      case 'notifyExternalService':
        await notificationService.notify(action.endpointUrl, action.payload);
        break;
      case 'invokeWorkflow':
        await workflowService.invoke(action.workflowId, action.parameters);
        break;
      case 'createCase':
        await caseService.createCase(action.caseDetails);
        break;
      // Add more action types as needed
      default: logger.error('Unknown action type', action);
    }
  }
};

const evaluateRuleset = async (rulesetId, facts) => {
  const ruleset = await Ruleset.findById(rulesetId).populate('rules');
  if (!ruleset) throw new Error('Ruleset not found');

  for (const rule of ruleset.rules) {
    if (evaluateRule(rule, facts)) {
      await executeActions(rule.actions, facts);
    }
  }
};

module.exports = { evaluateRuleset };

