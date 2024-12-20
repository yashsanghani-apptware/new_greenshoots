# Pola Expressions Evaluator


## 1. **Understanding the Structure**

The code is designed to evaluate policies based on user attributes, resource attributes, and a given action. The policies contain rules with conditions that determine whether the action is allowed or denied.

## 2. **Define the Key Interfaces**

- **Condition**: Represents the conditions that a rule must evaluate, including:
  - `all`: All expressions must evaluate to `true`.
  - `any`: At least one expression must evaluate to `true`.
  - `none`: None of the expressions must evaluate to `true`.

- **Rule**: Defines the actions that a rule applies to, the effect (`ALLOW` or `DENY`), and optional conditions that must be evaluated.

- **Policy**: Represents a collection of rules that apply to specific resources and actions.

- **EvaluationDetails**: Captures the result of evaluating a policy, including which policy was evaluated, the rule applied, the result (`ALLOW` or `DENY`), and details of the condition evaluation.

## 3. **Evaluate an Expression**

### Pseudo Code for `evaluateExpression`:
```plaintext
FUNCTION evaluateExpression(expression, scope):
    - Log the expression being evaluated.
    - TRY to create a function dynamically:
        - The function will take `scope` as an argument, which includes user, resource, and context.
        - Inside the function, make the `expression` return a boolean value.
    - Execute the function with the given scope.
    - Log the result of the evaluation.
    - RETURN the result as a boolean.
    - IF an error occurs:
        - Log the error.
        - RETURN `false`.
```

## 4. **Evaluate Conditions in a Rule**

### Pseudo Code for `evaluateConditions`:
```plaintext
FUNCTION evaluateConditions(condition, scope):
    - Initialize `result` as `true`.
    - Initialize `details` as an empty list.
    
    - IF the condition has an `all` clause:
        - FOR each expression in `all`:
            - Evaluate the expression using `evaluateExpression`.
            - Add the evaluation result to `details`.
            - Update `result` to be true only if all evaluations are true.

    - IF the condition has an `any` clause:
        - Initialize `anyResult` as `false`.
        - FOR each expression in `any`:
            - Evaluate the expression using `evaluateExpression`.
            - Add the evaluation result to `details`.
            - Update `anyResult` to be true if any of the evaluations are true.
        - Update `result` to be true only if `anyResult` is true.

    - IF the condition has a `none` clause:
        - FOR each expression in `none`:
            - Evaluate the expression using `evaluateExpression`.
            - Add the negated evaluation result to `details`.
            - Update `result` to be true only if none of the evaluations are true.

    - Log the detailed results of condition evaluations.
    - RETURN an object containing `result` and `details`.
```

## 5. **Evaluate the Policies**

### Pseudo Code for `evaluatePolicy`:
```plaintext
FUNCTION evaluatePolicy(user, resource, context, action, policies):
    - Initialize `evaluationDetails` as an empty list.
    - Prepare the `initialScope`:
        - Include user attributes, resource attributes, context, and custom operators.

    - FOR each policy in `policies`:
        - Log the name of the policy being evaluated.
        - Copy `initialScope` into `localScope`.

        - IF the policy has local variables:
            - FOR each local variable:
                - TRY to evaluate the expression for the variable:
                    - Add the evaluated value to `localScope`.
                - IF an error occurs:
                    - Log the error.
                    - Set the variable to `false` in `localScope`.

        - FOR each rule in the policy:
            - IF the rule applies to the `action` or if it applies to all actions (`*`):
                - Evaluate the conditions of the rule using `evaluateConditions`.
                - Determine the `finalResult`:
                    - If the conditions evaluate to true, the result is the rule's `effect` (`ALLOW` or `DENY`).
                    - If conditions are false, the result is `DENY`.
                - Add the rule evaluation details to `evaluationDetails`.

                - IF the `finalResult` is `DENY` or `ALLOW`:
                    - RETURN `evaluationDetails` immediately as the decision has been made.

    - Log the final evaluation details.
    - RETURN `evaluationDetails`.
```

## 6. **Custom Operators**

### Pseudo Code for Custom Operators:
```plaintext
DEFINE customOperators:
    - `isAdmin(role)`:
        - Log the role being evaluated.
        - RETURN true if the role is "Admin", otherwise return false.

    - `isIn(value, list)`:
        - RETURN true if `value` is in `list`.

    - `contains(value, substring)`:
        - RETURN true if `value` contains `substring`.

    - `isOlderThan(age, threshold)`:
        - RETURN true if `age` is greater than `threshold`.

    - `hasTag(tags, tag)`:
        - RETURN true if `tag` is in `tags`.

    - `daysSince(date)`:
        - Calculate the difference between `date` and the current date in days.
        - RETURN the number of days.

    - Define additional operators for basic arithmetic, string manipulations, list operations, and time-related functions.

    - Ensure all operators are available to the expression evaluation.
```

## Conclusion

This pseudo code gives you a step-by-step breakdown of how policies are processed, evaluated, and how custom expressions are used to influence the decisions. By following this, you can understand how the evaluation works, how policies are constructed and processed, and the role of conditions in determining the final outcome.
