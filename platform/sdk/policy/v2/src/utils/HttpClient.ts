import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config } from '../config/Config';

/**
 * HttpClient class provides a simplified interface for making HTTP requests using Axios.
 * It supports GET, POST, PUT, and DELETE methods with customizable configurations.
 */
export class HttpClient {
  private client: AxiosInstance; // Axios instance for making HTTP requests

  /**
   * Constructor initializes the Axios instance with a base URL and default configuration.
   *
   * @param baseURL - The base URL for all HTTP requests. Defaults to Config.BASE_API_URL.
   */
  constructor(baseURL: string = Config.BASE_API_URL) {
    this.client = axios.create({
      baseURL, // Set the base URL for HTTP requests
      timeout: Config.DEFAULT_TIMEOUT, // Set a default timeout for requests
      headers: {
        'Content-Type': 'application/json', // Set default content type for requests
      },
    });
  }

  /**
   * Sends a GET request to the specified endpoint.
   *
   * @param endpoint - The API endpoint to send the GET request to.
   * @param config - Optional AxiosRequestConfig for custom request configurations.
   * @returns A promise resolving to the response data of type T.
   */
  public async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(endpoint, config); // Send GET request
    return response.data; // Return the response data
  }

  /**
   * Sends a POST request to the specified endpoint with the provided data.
   *
   * @param endpoint - The API endpoint to send the POST request to.
   * @param data - The data to be sent in the request body.
   * @param config - Optional AxiosRequestConfig for custom request configurations.
   * @returns A promise resolving to the response data of type T.
   */
  public async post<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(endpoint, data, config); // Send POST request
    return response.data; // Return the response data
  }

  /**
   * Sends a PUT request to the specified endpoint with the provided data.
   *
   * @param endpoint - The API endpoint to send the PUT request to.
   * @param data - The data to be sent in the request body.
   * @param config - Optional AxiosRequestConfig for custom request configurations.
   * @returns A promise resolving to the response data of type T.
   */
  public async put<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(endpoint, data, config); // Send PUT request
    return response.data; // Return the response data
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @param endpoint - The API endpoint to send the DELETE request to.
   * @param config - Optional AxiosRequestConfig for custom request configurations.
   * @returns A promise resolving to the response data of type T.
   */
  public async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(endpoint, config); // Send DELETE request
    return response.data; // Return the response data
  }
}

