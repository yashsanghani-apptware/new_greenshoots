/**
 * Class representing the API endpoints for interacting with the Agsiri Smart Policy Engine.
 * This class provides a centralized and consistent way to reference the various API endpoints
 * used for policy, role, user, and resource management.
 */
export class ApiEndpoints {
  /**
   * Endpoint for creating a new policy.
   * Method: POST
   * Example usage: POST /policies
   */
  static readonly CREATE_POLICY = '/api/orgs/66bf68757daced0013dabcb1/policies';

  /**
   * Endpoint for retrieving an existing policy.
   * Method: GET
   * Example usage: GET /policies/{policyId}
   */
  static readonly GET_POLICY = '/policies';

  /**
   * Endpoint for updating an existing policy.
   * Method: PUT
   * Example usage: PUT /policies/{policyId}
   */
  static readonly UPDATE_POLICY = '/policies';

  /**
   * Endpoint for deleting an existing policy.
   * Method: DELETE
   * Example usage: DELETE /policies/{policyId}
   */
  static readonly DELETE_POLICY = '/policies';

  /**
   * Endpoint for evaluating a policy against a given request.
   * Method: POST
   * Example usage: POST /evaluate
   * The evaluation endpoint checks if the given request complies with the defined policies.
   */
  static readonly EVALUATE_POLICY = '/evaluate';

  /**
   * Endpoint for detecting conflicts within a policy.
   * Method: POST
   * Example usage: POST /policies/conflicts
   * This endpoint is used to analyze policies for potential conflicts.
   */
  static readonly DETECT_CONFLICTS = '/policies/conflicts';

  /**
   * Endpoint for creating a new role.
   * Method: POST
   * Example usage: POST /roles
   */
  static readonly CREATE_ROLE = '/roles';

  /**
   * Endpoint for retrieving an existing role.
   * Method: GET
   * Example usage: GET /roles/{roleId}
   */
  static readonly GET_ROLE = '/roles';

  /**
   * Endpoint for updating an existing role.
   * Method: PUT
   * Example usage: PUT /roles/{roleId}
   */
  static readonly UPDATE_ROLE = '/roles';

  /**
   * Endpoint for deleting an existing role.
   * Method: DELETE
   * Example usage: DELETE /roles/{roleId}
   */
  static readonly DELETE_ROLE = '/roles';

  /**
   * Endpoint for retrieving an existing user.
   * Method: GET
   * Example usage: GET /users/{userId}
   */
  static readonly GET_USER = '/users';

  /**
   * Endpoint for updating an existing user.
   * Method: PUT
   * Example usage: PUT /users/{userId}
   */
  static readonly UPDATE_USER = '/users';

  /**
   * Endpoint for deleting an existing user.
   * Method: DELETE
   * Example usage: DELETE /users/{userId}
   */
  static readonly DELETE_USER = '/users';

  /**
   * Endpoint for assigning a role to a user.
   * Method: POST
   * Example usage: POST /users/roles
   * This endpoint is used to assign roles to a user.
   */
  static readonly ASSIGN_ROLE = '/users/roles';

  /**
   * Endpoint for creating a new resource.
   * Method: POST
   * Example usage: POST /resources
   */
  static readonly CREATE_RESOURCE = '/resources';

  /**
   * Endpoint for retrieving an existing resource.
   * Method: GET
   * Example usage: GET /resources/{resourceId}
   */
  static readonly GET_RESOURCE = '/resources';

  /**
   * Endpoint for updating an existing resource.
   * Method: PUT
   * Example usage: PUT /resources/{resourceId}
   */
  static readonly UPDATE_RESOURCE = '/resources';

  /**
   * Endpoint for deleting an existing resource.
   * Method: DELETE
   * Example usage: DELETE /resources/{resourceId}
   */
  static readonly DELETE_RESOURCE = '/resources';
}

