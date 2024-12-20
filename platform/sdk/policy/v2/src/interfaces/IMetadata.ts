/**
 * Interface representing metadata associated with a policy in the Agsiri Smart Policy Engine.
 * Metadata is used to store additional information about the policy, such as annotations,
 * source attributes, and identifiers.
 */
export interface IMetadata {
  /**
   * Optional annotations that can be attached to the policy.
   * Annotations are key-value pairs where the key is a string and the value is a string.
   * These can be used for tagging, categorization, or any other metadata purpose.
   */
  annotations?: Record<string, string>;

  /**
   * Optional hash value associated with the policy.
   * This can be used for integrity checks or versioning.
   * The hash can be represented as either a number or a string.
   */
  hash?: number | string;

  /**
   * Optional source attributes related to the policy.
   * These attributes provide additional context or information about the source of the policy.
   */
  sourceAttributes?: ISourceAttributes;

  /**
   * Optional source file path of the policy.
   * This is typically used to track the file from which the policy was loaded or defined.
   */
  sourceFile?: string;

  /**
   * Optional identifier for the store where the policy is stored.
   * This identifier can be used to reference or manage the policy within a specific storage system.
   */
  storeIdentifier?: string;
}

/**
 * Interface representing source attributes associated with a policy in the Agsiri Smart Policy Engine.
 * Source attributes provide additional context or metadata about the policy's origin or source.
 */
export interface ISourceAttributes {
  /**
   * Optional attributes related to the source of the policy.
   * These are key-value pairs where the key is a string and the value can be of any type.
   * Source attributes can be used to store any additional information relevant to the policy's origin.
   */
  attributes?: Record<string, any>;
}

