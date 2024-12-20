import { ICondition } from './ICondition';
import { IOutput } from './IOutput';
import { IVariables } from './IVariables';
import { ISchemas } from './ISchemas';
import { IMetadata } from './IMetadata';

/**
 * Interface representing the schema for a policy in the Agsiri Smart Policy Engine.
 * The schema defines the structure and components of a policy, including rules, roles, variables, and metadata.
 */
export interface IPolicySchema {
  /**
   * Optional unique identifier for the policy.
   * This can be used to track or reference the policy within the system.
   */
  id?: string;

  /**
   * API version indicating the version of the Agsiri API that this policy schema conforms to.
   * This is a required field and should be set according to the Agsiri API version being used.
   */
  apiVersion: string;

  /**
   * Optional version of the policy. This allows for versioning of policies,
   * enabling the management of different policy versions (e.g., production vs. staging).
   */
  version?: string;

  /**
   * Optional description of the policy. This field can be used to provide a brief explanation
   * or context about the policy's purpose or usage.
   */
  description?: string;

  /**
   * Optional flag indicating whether the policy is disabled.
   * If set to true, the policy will not be enforced by the Agsiri Policy Engine.
   */
  disabled?: boolean;

  /**
   * Optional derived roles associated with the policy.
   * Derived roles allow for dynamic role assignments based on conditions and variables.
   */
  derivedRoles?: IDerivedRoles;

  /**
   * Optional exported variables that can be reused across multiple policies.
   * This allows for modular and consistent variable definitions.
   */
  exportVariables?: IExportVariables;

  /**
   * Optional principal policy that defines overrides for a specific user or principal.
   * This policy is evaluated when the principal makes a request.
   */
  principalPolicy?: IPrincipalPolicy;

  /**
   * Optional resource policy that defines rules for actions that can be performed on a given resource.
   * Resource policies are central to defining access control for specific resources.
   */
  resourcePolicy?: IResourcePolicy;

  /**
   * Optional variables that are used within the policy for condition expressions.
   * Variables can be defined locally within the policy or imported from other policies.
   */
  variables?: IVariables;

  /**
   * Optional metadata associated with the policy. Metadata provides additional context or information
   * about the policy, such as annotations, source attributes, and identifiers.
   */
  metadata?: IMetadata;
}

/**
 * Interface representing derived roles in the Agsiri Smart Policy Engine.
 * Derived roles are dynamic roles that are determined based on conditions and contextual information.
 */
export interface IDerivedRoles {
  /**
   * The name of the derived role set.
   * This name is used to reference the derived roles within policies.
   */
  name: string;

  /**
   * Definitions of the derived roles within this set.
   * Each derived role includes a name, parent roles, and an optional condition.
   */
  definitions: IRoleDefinition[];

  /**
   * Optional variables that are used within the derived roles for condition expressions.
   * Variables can be defined locally within the derived roles or imported from other policies.
   */
  variables?: IVariables;
}

/**
 * Interface representing a single role definition within a derived role set.
 * A role definition includes the name of the derived role, the parent roles it is based on, and an optional condition.
 */
export interface IRoleDefinition {
  /**
   * The name of the derived role.
   * This name is used within policies to reference the derived role.
   */
  name: string;

  /**
   * The parent roles that this derived role is based on.
   * The derived role is only applicable if the user has one of the parent roles.
   */
  parentRoles: string[];

  /**
   * Optional condition that must be met for the derived role to be assigned.
   * The condition is evaluated based on the context of the request.
   */
  condition?: ICondition;
}

/**
 * Interface representing exported variables in the Agsiri Smart Policy Engine.
 * Exported variables are reusable across multiple policies and can be imported by other policies.
 */
export interface IExportVariables {
  /**
   * The name of the exported variable set.
   * This name is used to reference the variables when importing them into other policies.
   */
  name: string;

  /**
   * Definitions of the variables within this set.
   * Each variable is a key-value pair where the key is the variable name and the value is the expression.
   */
  definitions: Record<string, string>;
}

/**
 * Interface representing a principal policy in the Agsiri Smart Policy Engine.
 * Principal policies define overrides for a specific user or principal, determining what actions they can take on resources.
 */
export interface IPrincipalPolicy {
  /**
   * The principal (e.g., user) that this policy applies to.
   * This is typically a unique identifier for the user or principal.
   */
  principal: string;

  /**
   * The version of the policy that applies to the principal.
   * This allows for versioning of principal policies, enabling the management of different policy versions.
   */
  version: string;

  /**
   * Optional scope of the principal policy.
   * The scope can be used to limit the applicability of the policy to specific contexts or resources.
   */
  scope?: string;

  /**
   * The rules that define what actions the principal can take on resources.
   * Each rule includes the resource it applies to and the actions the principal can perform.
   */
  rules: IPrincipalRule[];

  /**
   * Optional variables that are used within the principal policy for condition expressions.
   * Variables can be defined locally within the policy or imported from other policies.
   */
  variables?: IVariables;
}

/**
 * Interface representing a single rule within a principal policy.
 * A principal rule defines what actions a principal can take on a specific resource.
 */
export interface IPrincipalRule {
  /**
   * The resource that the rule applies to.
   * This is typically an identifier for the resource or resource type.
   */
  resource: string;

  /**
   * The actions that the principal can perform on the resource.
   * Each action includes the name of the action, the effect (allow or deny), and optional conditions or outputs.
   */
  actions: IPrincipalRuleAction[];
}

/**
 * Interface representing a single action within a principal rule.
 * A principal rule action defines the specific action that the principal can take on the resource.
 */
export interface IPrincipalRuleAction {
  /**
   * Optional name for the action. This can be used to reference the action within logs or outputs.
   */
  name?: string;

  /**
   * The specific action that the principal can perform on the resource (e.g., "view", "edit").
   */
  action: string;

  /**
   * Optional condition that must be met for the action to be allowed or denied.
   * The condition is evaluated based on the context of the request.
   */
  condition?: ICondition;

  /**
   * The effect of the action, which can be either "EFFECT_ALLOW" or "EFFECT_DENY".
   * This determines whether the action is permitted or denied.
   */
  effect: 'EFFECT_ALLOW' | 'EFFECT_DENY';

  /**
   * Optional output that is generated when the action is performed.
   * Outputs can be used to provide feedback or trigger additional actions.
   */
  output?: IOutput;
}

/**
 * Interface representing a resource policy in the Agsiri Smart Policy Engine.
 * Resource policies define rules for actions that can be performed on specific resources.
 */
export interface IResourcePolicy {
  /**
   * The version of the policy. This allows for versioning of resource policies,
   * enabling the management of different policy versions.
   */
  version: string;

  /**
   * The resource that the policy applies to. This is typically an identifier for the resource or resource type.
   */
  resource: string;

  /**
   * The rules that define what actions can be performed on the resource.
   * Each rule includes the actions, roles, conditions, and outputs.
   */
  rules: IResourceRule[];

  /**
   * Optional schemas that define the structure and validation for the resource attributes.
   * Schemas ensure that the resource data conforms to the expected format.
   */
  schemas?: ISchemas;

  /**
   * Optional variables that are used within the resource policy for condition expressions.
   * Variables can be defined locally within the policy or imported from other policies.
   */
  variables?: IVariables;

  /**
   * Optional scope of the resource policy. The scope can be used to limit the applicability of the policy to specific contexts or resources.
   */
  scope?: string;

  /**
   * Optional derived roles that are imported into the resource policy.
   * This allows the policy to leverage dynamic roles defined in other policies.
   */
  importDerivedRoles?: string[];
}

/**
 * Interface representing a single rule within a resource policy.
 * A resource rule defines what actions can be performed on the resource and under what conditions.
 */
export interface IResourceRule {
  /**
   * The actions that can be performed on the resource (e.g., "create", "delete").
   * Each action is a string representing a specific operation that can be performed on the resource.
   */
  actions: string[];

  /**
   * The effect of the rule, which can be either "EFFECT_ALLOW" or "EFFECT_DENY".
   * This determines whether the actions are permitted or denied.
   */
  effect: 'EFFECT_ALLOW' | 'EFFECT_DENY';

  /**
   * Optional roles that are allowed to perform the actions defined in the rule.
   * This allows for role-based access control within the resource policy.
   */
  roles?: string[];

  /**
   * Optional derived roles that are allowed to perform the actions defined in the rule.
   * Derived roles are dynamic roles that are determined based on conditions and context.
   */
  derivedRoles?: string[];

  /**
   * Optional condition that must be met for the actions to be allowed or denied.
   * The condition is evaluated based on the context of the request.
   */
  condition?: ICondition;

  /**
   * Optional output that is generated when the rule is triggered.
   * Outputs can be used to provide feedback or trigger additional actions.
   */
  output?: IOutput;

  /**
   * Optional name for the rule. This can be used to reference the rule within logs or outputs.
   */
  name?: string;
}

