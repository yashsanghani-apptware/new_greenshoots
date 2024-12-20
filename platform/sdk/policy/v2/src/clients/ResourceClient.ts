import { HttpClient } from '../utils/HttpClient';
import { IResource } from '../interfaces/IResource';
import { ApiEndpoints } from '../constants/ApiEndpoints';

/**
 * ResourceClient class provides methods to interact with the resource-related endpoints
 * of the Agsiri Smart Policy Engine. This includes creating, retrieving, updating,
 * and deleting resources.
 */
export class ResourceClient {
  private httpClient: HttpClient;

  /**
   * Constructs a new ResourceClient instance.
   * @param httpClient - An instance of HttpClient to handle HTTP requests.
   */
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Creates a new resource in the system.
   * @param resource - The resource object to be created.
   * @returns A promise that resolves to the created resource.
   * @throws Will throw an error if the HTTP request fails.
   */
  async createResource(resource: IResource): Promise<IResource> {
    return this.httpClient.post<IResource>(ApiEndpoints.CREATE_RESOURCE, resource);
  }

  /**
   * Retrieves an existing resource by its ID.
   * @param resourceId - The ID of the resource to retrieve.
   * @returns A promise that resolves to the retrieved resource.
   * @throws Will throw an error if the resource is not found or if the HTTP request fails.
   */
  async getResource(resourceId: string): Promise<IResource> {
    return this.httpClient.get<IResource>(`${ApiEndpoints.GET_RESOURCE}/${resourceId}`);
  }

  /**
   * Updates an existing resource.
   * @param resourceId - The ID of the resource to update.
   * @param resource - The updated resource object.
   * @returns A promise that resolves to the updated resource.
   * @throws Will throw an error if the resource is not found or if the HTTP request fails.
   */
  async updateResource(resourceId: string, resource: IResource): Promise<IResource> {
    return this.httpClient.put<IResource>(`${ApiEndpoints.UPDATE_RESOURCE}/${resourceId}`, resource);
  }

  /**
   * Deletes an existing resource by its ID.
   * @param resourceId - The ID of the resource to delete.
   * @returns A promise that resolves when the resource is successfully deleted.
   * @throws Will throw an error if the resource is not found or if the HTTP request fails.
   */
  async deleteResource(resourceId: string): Promise<void> {
    return this.httpClient.delete<void>(`${ApiEndpoints.DELETE_RESOURCE}/${resourceId}`);
  }
}

