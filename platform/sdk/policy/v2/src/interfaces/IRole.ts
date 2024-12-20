import { ICondition } from './ICondition';
import { IVariables } from './IVariables';

/**
 * Interface representing a role in the Agsiri Smart Policy Engine.
 * A role defines a set of permissions and can inherit permissions from parent roles.
 */
export interface IRole {
  /**
   * Optional unique identifier for the role.
   * This identifier can be used to track or reference the role within the system.
   */
  id?: string;

  /**
   * The name of the role. This is a required field and uniquely identifies
   * the role within the system.
   */
  name: string;

  /**
   * An array of parent role names. These roles are inherited by the current role,
   * meaning that the current role will have all the permissions of its parent roles.
   * This array should contain strings representing the names of the parent roles.
   */
  parentRoles: string[];

  /**
   * An optional condition that must be met for this role to be activated.
   * Conditions are defined using the `ICondition` interface, and can include complex
   * logic to determine when the role is applicable.
   */
  condition?: ICondition;

  /**
   * A collection of variables associated with the role.
   * Variables provide additional data or context that can be used within conditions
   * or other policy elements. These are stored as key-value pairs.
   * The keys are strings representing the variable names, and the values can be of any type.
   */
  variables?: IVariables;
}

