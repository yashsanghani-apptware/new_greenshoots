/**
 * Interface representing the output of a policy rule in the Agsiri Smart Policy Engine.
 * Outputs are used to provide additional information or perform actions when a policy rule
 * is either fully or partially activated.
 */
export interface IOutput {
  /**
   * Optional expression that defines the output logic.
   * This expression is evaluated when the policy rule is triggered and can produce
   * a result that is included in the response or used for further processing.
   */
  expr?: string;

  /**
   * Optional conditions that determine when the output should be generated.
   * This can include different outputs depending on whether the rule's condition was met or not.
   */
  when?: IOutputWhen;
}

/**
 * Interface representing the conditions under which an output is generated in the Agsiri Smart Policy Engine.
 * These conditions specify different outputs depending on whether the rule's main condition was met or not.
 */
export interface IOutputWhen {
  /**
   * Optional output that is generated when the rule's condition is not met.
   * This can be used to provide information or take actions when the rule fails to activate due to unmet conditions.
   */
  conditionNotMet?: string;

  /**
   * Optional output that is generated when the rule is fully activated (i.e., the condition is met).
   * This can be used to provide information or take actions when the rule successfully activates.
   */
  ruleActivated?: string;
}

