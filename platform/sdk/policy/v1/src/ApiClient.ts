// src/ApiClient.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * ApiClient class provides a simplified interface for making HTTP requests using Axios.
 * It abstracts the complexity of making GET, POST, PUT, and DELETE requests and allows
 * for easier interaction with an API by providing methods for each HTTP operation.
 */
export class ApiClient {
  private client: AxiosInstance;

  /**
   * Constructs an instance of ApiClient.
   * @param baseURL - The base URL for all requests made by this client. It sets the default
   * URL to be used in the requests.
   */
  constructor(baseURL: string) {
    // Create an Axios instance with the specified baseURL
    this.client = axios.create({ baseURL });
  }

  /**
   * Sends a GET request to the specified path.
   * @param path - The endpoint path to which the GET request will be sent.
   * @param config - Optional AxiosRequestConfig for custom request configuration.
   * @returns A promise resolving to the AxiosResponse for the GET request.
   */
  public async get(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.client.get(path, config);
  }

  /**
   * Sends a POST request to the specified path with the provided data.
   * @param path - The endpoint path to which the POST request will be sent.
   * @param data - The data to be sent in the body of the POST request.
   * @param config - Optional AxiosRequestConfig for custom request configuration.
   * @returns A promise resolving to the AxiosResponse for the POST request.
   */
  public async post(path: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.client.post(path, data, config);
  }

  /**
   * Sends a PUT request to the specified path with the provided data.
   * @param path - The endpoint path to which the PUT request will be sent.
   * @param data - The data to be sent in the body of the PUT request.
   * @param config - Optional AxiosRequestConfig for custom request configuration.
   * @returns A promise resolving to the AxiosResponse for the PUT request.
   */
  public async put(path: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.client.put(path, data, config);
  }

  /**
   * Sends a DELETE request to the specified path.
   * @param path - The endpoint path to which the DELETE request will be sent.
   * @param config - Optional AxiosRequestConfig for custom request configuration.
   * @returns A promise resolving to the AxiosResponse for the DELETE request.
   */
  public async delete(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.client.delete(path, config);
  }
}

export default ApiClient;

