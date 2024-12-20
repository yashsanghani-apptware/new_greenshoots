import { HttpClient } from '../utils/HttpClient';
import { IPolicySchema } from '../interfaces/IPolicySchema';
import { ApiEndpoints } from '../constants/ApiEndpoints';

/**
 * PolicyClient class provides methods to interact with the policy-related endpoints
 * of the Agsiri Smart Policy Engine. This includes creating, retrieving, updating,
 * and deleting policies, as well as evaluating policies and detecting conflicts.
 */
export class PolicyClient {
  private httpClient: HttpClient;

  /**
   * Constructs a new PolicyClient instance.
   * @param httpClient - An instance of HttpClient to handle HTTP requests.
   */
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Creates a new policy in the system.
   * @param policy - The policy schema object to be created.
   * @returns A promise that resolves to the created policy schema.
   * @throws Will throw an error if the HTTP request fails.
   */
  async createPolicy(policy: IPolicySchema): Promise<IPolicySchema> {
    return this.httpClient.post<IPolicySchema>(ApiEndpoints.CREATE_POLICY, policy);
  }

  /**
   * Retrieves an existing policy by its ID.
   * @param policyId - The ID of the policy to retrieve.
   * @returns A promise that resolves to the retrieved policy schema.
   * @throws Will throw an error if the policy is not found or if the HTTP request fails.
   */
  async getPolicy(policyId: string): Promise<IPolicySchema> {
    return this.httpClient.get<IPolicySchema>(`${ApiEndpoints.GET_POLICY}/${policyId}`);
  }

  /**
   * Updates an existing policy.
   * @param policyId - The ID of the policy to update.
   * @param policy - The updated policy schema object.
   * @returns A promise that resolves to the updated policy schema.
   * @throws Will throw an error if the policy is not found or if the HTTP request fails.
   */
  async updatePolicy(policyId: string, policy: IPolicySchema): Promise<IPolicySchema> {
    return this.httpClient.put<IPolicySchema>(`${ApiEndpoints.UPDATE_POLICY}/${policyId}`, policy);
  }

  /**
   * Deletes an existing policy by its ID.
   * @param policyId - The ID of the policy to delete.
   * @returns A promise that resolves when the policy is successfully deleted.
   * @throws Will throw an error if the policy is not found or if the HTTP request fails.
   */
  async deletePolicy(policyId: string): Promise<void> {
    return this.httpClient.delete<void>(`${ApiEndpoints.DELETE_POLICY}/${policyId}`);
  }

  /**
   * Evaluates a policy against a given request.
   * @param request - The request object containing the data to evaluate against the policy.
   * @returns A promise that resolves to the evaluation result.
   * @throws Will throw an error if the HTTP request fails.
   */
  async evaluatePolicy(request: any): Promise<any> {
    return this.httpClient.post<any>(ApiEndpoints.EVALUATE_POLICY, request);
  }

  /**
   * Detects conflicts within a given policy.
   * @param policy - The policy schema object to analyze for conflicts.
   * @returns A promise that resolves to the conflict detection result.
   * @throws Will throw an error if the HTTP request fails.
   */
  async detectPolicyConflicts(policy: IPolicySchema): Promise<any> {
    return this.httpClient.post<any>(ApiEndpoints.DETECT_CONFLICTS, policy);
  }
}

