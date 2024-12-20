import { HttpClient } from '../utils/HttpClient';
import { IUser } from '../interfaces/IUser';
import { ApiEndpoints } from '../constants/ApiEndpoints';

/**
 * UserClient class provides methods to interact with the user-related endpoints
 * of the Agsiri Smart Policy Engine. This includes assigning roles to users,
 * retrieving, updating, and deleting user information.
 */
export class UserClient {
  private httpClient: HttpClient;

  /**
   * Constructs a new UserClient instance.
   * @param httpClient - An instance of HttpClient to handle HTTP requests.
   */
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Assigns a role to a user.
   * @param userId - The ID of the user to whom the role will be assigned.
   * @param roleId - The ID of the role to be assigned to the user.
   * @returns A promise that resolves to the updated user information with the assigned role.
   * @throws Will throw an error if the HTTP request fails.
   */
  async assignRoleToUser(userId: string, roleId: string): Promise<IUser> {
    return this.httpClient.post<IUser>(`${ApiEndpoints.ASSIGN_ROLE}/${userId}`, { roleId });
  }

  /**
   * Retrieves an existing user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns A promise that resolves to the retrieved user information.
   * @throws Will throw an error if the user is not found or if the HTTP request fails.
   */
  async getUser(userId: string): Promise<IUser> {
    return this.httpClient.get<IUser>(`${ApiEndpoints.GET_USER}/${userId}`);
  }

  /**
   * Updates an existing user's information.
   * @param userId - The ID of the user to update.
   * @param user - The updated user object.
   * @returns A promise that resolves to the updated user information.
   * @throws Will throw an error if the user is not found or if the HTTP request fails.
   */
  async updateUser(userId: string, user: IUser): Promise<IUser> {
    return this.httpClient.put<IUser>(`${ApiEndpoints.UPDATE_USER}/${userId}`, user);
  }

  /**
   * Deletes an existing user by their ID.
   * @param userId - The ID of the user to delete.
   * @returns A promise that resolves when the user is successfully deleted.
   * @throws Will throw an error if the user is not found or if the HTTP request fails.
   */
  async deleteUser(userId: string): Promise<void> {
    return this.httpClient.delete<void>(`${ApiEndpoints.DELETE_USER}/${userId}`);
  }
}

