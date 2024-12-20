import { ICondition } from './ICondition';
import { IOutput } from './IOutput';
import { IVariables } from './IVariables';
import { ISchemas } from './ISchemas';

/**
 * Interface representing a Policy within the Agsiri Smart Policy Engine.
 * A Policy is a collection of rules that define the permissions and conditions
 * under which specific actions are allowed or denied.
 */
export interface IPolicy {
  /**
   * Optional unique identifier for the policy.
   */
  id?: string;

  /**
   * Version of the policy. This is a required field and must match the version used in the policy engine.
   */
  version: string;

  /**
   * Optional description providing additional details about the policy.
   */
  description?: string;

  /**
   * A list of rules that make up the policy. Each rule defines specific actions, conditions, and effects.
   */
  rules: IPolicyRule[];

  /**
   * Optional variables that can be referenced within the policy rules.
   */
  variables?: IVariables;

  /**
   * Optional schemas to validate the structure of the principal and resource attributes used in the policy.
   */
  schemas?: ISchemas;
}

/**
 * Interface representing a single rule within a Policy.
 * Each rule specifies the actions that can be performed, the effect of the rule (allow or deny),
 * and any conditions or outputs associated with the rule.
 */
export interface IPolicyRule {
  /**
   * A list of actions that the rule applies to. Actions are strings representing the operations
   * that can be performed on resources (e.g., "view", "edit", "delete").
   */
  actions: string[];

  /**
   * The effect of the rule, either allowing or denying the specified actions.
   * - "EFFECT_ALLOW": The actions are allowed if the rule matches.
   * - "EFFECT_DENY": The actions are denied if the rule matches.
   */
  effect: 'EFFECT_ALLOW' | 'EFFECT_DENY';

  /**
   * Optional list of roles that the rule applies to. If specified, the rule only applies to principals
   * with one of these roles.
   */
  roles?: string[];

  /**
   * Optional list of derived roles that the rule applies to. Derived roles are dynamic roles computed
   * based on conditions or context, and can be used to refine access control.
   */
  derivedRoles?: string[];

  /**
   * Optional condition that must be met for the rule to apply. If the condition evaluates to true,
   * the rule's effect is enforced; otherwise, the rule is ignored.
   */
  condition?: ICondition;

  /**
   * Optional output expression that can be evaluated when the rule is activated or when the condition is not met.
   * The output can be used for logging, auditing, or providing feedback to users.
   */
  output?: IOutput;

  /**
   * Optional name for the rule. This can be used to identify the rule for debugging, logging, or audit purposes.
   */
  name?: string;
}

