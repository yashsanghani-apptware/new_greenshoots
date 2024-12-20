/**
 * Interface representing the variables used within the Agsiri Smart Policy Engine.
 * Variables allow for the reuse of expressions and conditions across different policies.
 */
export interface IVariables {
  /**
   * Optional array of variable set names to import.
   * These imported variable sets allow for the reuse of previously defined variables
   * across different policies, enabling more modular and maintainable policy definitions.
   * Each string in the array represents the name of a variable set to import.
   */
  import?: string[];

  /**
   * A collection of locally defined variables within the policy.
   * These variables are stored as key-value pairs, where the key is a string
   * representing the variable name, and the value is a string representing the
   * expression or data associated with the variable.
   * Local variables are accessible only within the policy in which they are defined
   * and provide a way to encapsulate specific expressions or conditions.
   */
  local?: Record<string, string>;
}

