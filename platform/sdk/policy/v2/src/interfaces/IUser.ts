/**
 * Interface representing a user in the Agsiri Smart Policy Engine.
 * A user is an entity that can be assigned roles and can have associated attributes.
 */
export interface IUser {
  /**
   * Optional unique identifier for the user.
   * This identifier can be used to track or reference the user within the system.
   */
  id?: string;

  /**
   * The name of the user. This is a required field and typically represents
   * the user's full name or username within the system.
   */
  name: string;

  /**
   * An array of roles assigned to the user. Roles define the permissions that
   * the user has within the system. Each string in the array represents the name
   * of a role that the user is associated with.
   */
  roles: string[];

  /**
   * A collection of attributes associated with the user.
   * Attributes provide additional data or context about the user and are stored
   * as key-value pairs. The keys are strings representing the attribute names,
   * and the values can be of any type.
   */
  attributes?: Record<string, any>;
}

