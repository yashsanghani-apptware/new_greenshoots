/**
 * Interface representing a condition in the Agsiri Smart Policy Engine.
 * A condition is used to define whether a specific rule within a policy should be applied.
 * The condition can be expressed either as a match expression or a script.
 */
export interface ICondition {
  /**
   * An optional match expression that defines conditions using logical operations
   * (all, any, none) or a direct expression. This match expression is evaluated to
   * determine if the rule should be applied.
   */
  match?: IMatch;

  /**
   * An optional script that defines a condition in a scripting language supported by
   * the Agsiri engine. This can be used for more complex or custom logic that cannot be
   * easily expressed using the match syntax.
   */
  script?: string;
}

/**
 * Interface representing a match expression in the Agsiri Smart Policy Engine.
 * A match expression is a logical block that can contain multiple conditions combined
 * using logical operators (all, any, none), or a direct expression.
 */
export interface IMatch {
  /**
   * Optional list of expressions that must all evaluate to true for the match to succeed.
   * This represents a logical AND operation.
   */
  all?: IExprList;

  /**
   * Optional list of expressions where at least one must evaluate to true for the match to succeed.
   * This represents a logical OR operation.
   */
  any?: IExprList;

  /**
   * Optional list of expressions where none should evaluate to true for the match to succeed.
   * This represents a logical NOT operation.
   */
  none?: IExprList;

  /**
   * Optional direct expression that is evaluated as a boolean condition.
   * This can be used for simple conditions that don't require combining multiple expressions.
   */
  expr?: string;
}

/**
 * Interface representing a list of match expressions in the Agsiri Smart Policy Engine.
 * This list is used within the `all`, `any`, and `none` properties of the IMatch interface
 * to group multiple conditions together.
 */
export interface IExprList {
  /**
   * A list of match expressions that are grouped together.
   * The grouping logic (AND, OR, NOT) is determined by the parent property in the IMatch interface.
   */
  of: IMatch[];
}

