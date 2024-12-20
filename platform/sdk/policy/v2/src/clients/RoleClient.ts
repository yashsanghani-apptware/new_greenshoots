import { HttpClient } from '../utils/HttpClient';
import { IRole } from '../interfaces/IRole';
import { ApiEndpoints } from '../constants/ApiEndpoints';

/**
 * RoleClient class provides methods to interact with the role-related endpoints
 * of the Agsiri Smart Policy Engine. This includes creating, retrieving, updating,
 * and deleting roles.
 */
export class RoleClient {
  private httpClient: HttpClient;

  /**
   * Constructs a new RoleClient instance.
   * @param httpClient - An instance of HttpClient to handle HTTP requests.
   */
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Creates a new role in the system.
   * @param role - The role object to be created.
   * @returns A promise that resolves to the created role.
   * @throws Will throw an error if the HTTP request fails.
   */
  async createRole(role: IRole): Promise<IRole> {
    return this.httpClient.post<IRole>(ApiEndpoints.CREATE_ROLE, role);
  }

  /**
   * Retrieves an existing role by its ID.
   * @param roleId - The ID of the role to retrieve.
   * @returns A promise that resolves to the retrieved role.
   * @throws Will throw an error if the role is not found or if the HTTP request fails.
   */
  async getRole(roleId: string): Promise<IRole> {
    return this.httpClient.get<IRole>(`${ApiEndpoints.GET_ROLE}/${roleId}`);
  }

  /**
   * Updates an existing role.
   * @param roleId - The ID of the role to update.
   * @param role - The updated role object.
   * @returns A promise that resolves to the updated role.
   * @throws Will throw an error if the role is not found or if the HTTP request fails.
   */
  async updateRole(roleId: string, role: IRole): Promise<IRole> {
    return this.httpClient.put<IRole>(`${ApiEndpoints.UPDATE_ROLE}/${roleId}`, role);
  }

  /**
   * Deletes an existing role by its ID.
   * @param roleId - The ID of the role to delete.
   * @returns A promise that resolves when the role is successfully deleted.
   * @throws Will throw an error if the role is not found or if the HTTP request fails.
   */
  async deleteRole(roleId: string): Promise<void> {
    return this.httpClient.delete<void>(`${ApiEndpoints.DELETE_ROLE}/${roleId}`);
  }
}

