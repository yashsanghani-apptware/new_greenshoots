/**
 * Interface representing a resource in the Agsiri Smart Policy Engine.
 * A resource is an entity on which actions can be performed, such as files, records, or data objects.
 */
export interface IResource {
  /**
   * Optional unique identifier for the resource.
   * This identifier can be used to track or reference the resource within the system.
   */
  id?: string;

  /**
   * The type of the resource. This is a required field and typically represents
   * the kind or category of the resource (e.g., "file", "record", "data_object").
   */
  type: string;

  /**
   * A collection of attributes associated with the resource.
   * Attributes provide additional data or context about the resource, and are stored as key-value pairs.
   * The keys are strings representing the attribute names, and the values can be of any type.
   */
  attributes: Record<string, any>;
}

