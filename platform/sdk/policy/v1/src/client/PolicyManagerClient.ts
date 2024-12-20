import axios, { AxiosInstance } from 'axios';
import { logExecution } from '../decorators/logExecution';
import { measureExecutionTime } from '../decorators/measureExecutionTime';

/**
 * PolicyManagerClient class provides methods to interact with the policy management API.
 * This class handles operations such as creating organizations, policies, roles, resources, and more.
 * It also includes logging and execution time measurement for each operation.
 */
class PolicyManagerClient {
  private apiClient: AxiosInstance;

  /**
   * Constructor for initializing the API client with a base URL.
   * @param baseURL - The base URL for the API endpoints.
   */
  constructor(baseURL: string) {
    this.apiClient = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Logs a step in the process with an optional detail message.
   * @param step - The step or action being logged.
   * @param details - Optional additional details to include in the log.
   */
  private logStep(step: string, details?: string) {
    console.log(`[${new Date().toISOString()}] ${step}${details ? ` - ${details}` : ''}`);
  }

  /**
   * Handles errors by logging them with an appropriate message.
   * @param error - The error encountered.
   * @param message - A message to log alongside the error.
   */
  private handleError(error: unknown, message: string): void {
    if (axios.isAxiosError(error)) {
      console.error(message, error.response ? error.response.data : error.message);
    } else if (error instanceof Error) {
      console.error(message, error.message);
    } else {
      console.error(message, error);
    }
  }

  /**
   * Creates a new organization using the API.
   * @param data - The organization data to create.
   * @returns The created organization data.
   */
  @logExecution
  @measureExecutionTime
  async createOrganization(data: any) {
    this.logStep('Creating organization');
    try {
      const response = await this.apiClient.post('/orgs', data);
      console.log('Organization created:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating organization');
      throw error;
    }
  }

  /**
   * Deletes an organization by its ID.
   * @param orgId - The ID of the organization to delete.
   * @returns The response from the API after deletion.
   */
  @logExecution
  @measureExecutionTime
  async deleteOrganization(orgId: string) {
    this.logStep('Deleting organization', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.delete(`/orgs/${orgId}`);
      console.log('Organization deleted:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error deleting organization');
      throw error;
    }
  }

  /**
   * Lists all organizations using the API.
   * @returns The list of organizations.
   */
  @logExecution
  @measureExecutionTime
  async listOrganizations() {
    this.logStep('Listing organizations');
    try {
      const response = await this.apiClient.get('/orgs');
      console.log('Organizations fetched:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error listing organizations');
      throw error;
    }
  }

  /**
   * Creates a policy for a specific organization.
   * @param orgId - The ID of the organization.
   * @param data - The policy data to create.
   * @returns The created policy data.
   */
  @logExecution
  @measureExecutionTime
  async createPolicy(orgId: string, data: any) {
    this.logStep('Creating policy', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.post(`/orgs/${orgId}/policies`, data);
      console.log('Policy created:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating policy');
      throw error;
    }
  }

  /**
   * Attaches a policy to a resource within an organization.
   * @param orgId - The ID of the organization.
   * @param resourceId - The ID of the resource.
   * @param policyId - The ID of the policy to attach.
   * @returns The response from the API after attaching the policy.
   */
  @logExecution
  @measureExecutionTime
  async attachPolicyToResource(orgId: string, resourceId: string, policyId: string) {
    this.logStep('Attaching policy to resource', `Org ID: ${orgId}, Resource ID: ${resourceId}, Policy ID: ${policyId}`);
    try {
      const response = await this.apiClient.post(`/orgs/${orgId}/resources/${resourceId}/attachPolicy`, { policyId });
      console.log('Policy attached to resource:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error attaching policy to resource');
      throw error;
    }
  }

  /**
   * Creates a resource profile for an organization.
   * @param orgId - The ID of the organization.
   * @param data - The resource profile data to create.
   * @returns The created resource profile data.
   */
  @logExecution
  @measureExecutionTime
  async createResourceProfile(orgId: string, data: any) {
    this.logStep('Creating resource profile', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.post(`/orgs/${orgId}/resources`, data);
      console.log('Resource profile created:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating resource profile');
      throw error;
    }
  }

  /**
   * Fetches all resources associated with an organization.
   * @param orgId - The ID of the organization.
   * @returns The list of resources.
   */
  @logExecution
  @measureExecutionTime
  async getAllResources(orgId: string) {
    this.logStep('Fetching all resources', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.get(`/orgs/${orgId}/resources`);
      console.log('Resources fetched:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching resources');
      throw error;
    }
  }

  /**
   * Fetches all policies associated with an organization.
   * @param orgId - The ID of the organization.
   * @returns The list of policies.
   */
  @logExecution
  @measureExecutionTime
  async getAllPolicies(orgId: string) {
    this.logStep('Fetching all policies', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.get(`/orgs/${orgId}/policies`);
      console.log('Policies fetched:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching policies');
      throw error;
    }
  }

  /**
   * Creates a new user within an organization.
   * @param orgId - The ID of the organization.
   * @param data - The user data to create.
   * @returns The created user data.
   */
  @logExecution
  @measureExecutionTime
  async createUser(orgId: string, data: any) {
    this.logStep('Creating user', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.post(`/orgs/${orgId}/users`, data);
      console.log('User created:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating user');
      throw error;
    }
  }

  /**
   * Creates a new group within an organization.
   * @param orgId - The ID of the organization.
   * @param data - The group data to create.
   * @returns The created group data.
   */
  @logExecution
  @measureExecutionTime
  async createGroup(orgId: string, data: any) {
    this.logStep('Creating group', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.post(`/orgs/${orgId}/groups`, data);
      console.log('Group created:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating group');
      throw error;
    }
  }

  // Role methods

  /**
   * Creates a new role within an organization.
   * @param orgId - The ID of the organization.
   * @param data - The role data to create.
   * @returns The created role data.
   */
  @logExecution
  @measureExecutionTime
  async createRole(orgId: string, data: any) {
    this.logStep('Creating role', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.post(`/orgs/${orgId}/roles`, data);
      console.log('Role created:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating role');
      throw error;
    }
  }

  /**
   * Fetches a role by its ID within an organization.
   * @param orgId - The ID of the organization.
   * @param roleId - The ID of the role.
   * @returns The fetched role data.
   */
  @logExecution
  @measureExecutionTime
  async getRole(orgId: string, roleId: string) {
    this.logStep('Fetching role', `Org ID: ${orgId}, Role ID: ${roleId}`);
    try {
      const response = await this.apiClient.get(`/orgs/${orgId}/roles/${roleId}`);
      console.log('Role fetched:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching role');
      throw error;
    }
  }

  /**
   * Updates a role within an organization.
   * @param orgId - The ID of the organization.
   * @param roleId - The ID of the role.
   * @param data - The updated role data.
   * @returns The updated role data.
   */
  @logExecution
  @measureExecutionTime
  async updateRole(orgId: string, roleId: string, data: any) {
    this.logStep('Updating role', `Org ID: ${orgId}, Role ID: ${roleId}`);
    try {
      const response = await this.apiClient.put(`/orgs/${orgId}/roles/${roleId}`, data);
      console.log('Role updated:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error updating role');
      throw error;
    }
  }

  /**
   * Deletes a role within an organization.
   * @param orgId - The ID of the organization.
   * @param roleId - The ID of the role.
   * @returns The response from the API after deletion.
   */
  @logExecution
  @measureExecutionTime
  async deleteRole(orgId: string, roleId: string) {
    this.logStep('Deleting role', `Org ID: ${orgId}, Role ID: ${roleId}`);
    try {
      const response = await this.apiClient.delete(`/orgs/${orgId}/roles/${roleId}`);
      console.log('Role deleted:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error deleting role');
      throw error;
    }
  }

  /**
   * Lists all roles within an organization.
   * @param orgId - The ID of the organization.
   * @returns The list of roles.
   */
  @logExecution
  @measureExecutionTime
  async listRoles(orgId: string) {
    this.logStep('Listing roles', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.get(`/orgs/${orgId}/roles`);
      console.log('Roles fetched:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error listing roles');
      throw error;
    }
  }

  // Variable methods

  /**
   * Creates a new variable within an organization.
   * @param orgId - The ID of the organization.
   * @param data - The variable data to create.
   * @returns The created variable data.
   */
  @logExecution
  @measureExecutionTime
  async createVariable(orgId: string, data: any) {
    this.logStep('Creating variable', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.post(`/orgs/${orgId}/variables`, data);
      console.log('Variable created:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating variable');
      throw error;
    }
  }

  /**
   * Fetches a variable by its ID within an organization.
   * @param orgId - The ID of the organization.
   * @param variableId - The ID of the variable.
   * @returns The fetched variable data.
   */
  @logExecution
  @measureExecutionTime
  async getVariable(orgId: string, variableId: string) {
    this.logStep('Fetching variable', `Org ID: ${orgId}, Variable ID: ${variableId}`);
    try {
      const response = await this.apiClient.get(`/orgs/${orgId}/variables/${variableId}`);
      console.log('Variable fetched:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching variable');
      throw error;
    }
  }

  /**
   * Updates a variable within an organization.
   * @param orgId - The ID of the organization.
   * @param variableId - The ID of the variable.
   * @param data - The updated variable data.
   * @returns The updated variable data.
   */
  @logExecution
  @measureExecutionTime
  async updateVariable(orgId: string, variableId: string, data: any) {
    this.logStep('Updating variable', `Org ID: ${orgId}, Variable ID: ${variableId}`);
    try {
      const response = await this.apiClient.put(`/orgs/${orgId}/variables/${variableId}`, data);
      console.log('Variable updated:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error updating variable');
      throw error;
    }
  }

  /**
   * Deletes a variable by its ID within an organization.
   * @param orgId - The ID of the organization.
   * @param variableId - The ID of the variable.
   * @returns The response from the API after deletion.
   */
  @logExecution
  @measureExecutionTime
  async deleteVariable(orgId: string, variableId: string) {
    this.logStep('Deleting variable', `Org ID: ${orgId}, Variable ID: ${variableId}`);
    try {
      const response = await this.apiClient.delete(`/orgs/${orgId}/variables/${variableId}`);
      console.log('Variable deleted:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error deleting variable');
      throw error;
    }
  }

  /**
   * Lists all variables within an organization.
   * @param orgId - The ID of the organization.
   * @returns The list of variables.
   */
  @logExecution
  @measureExecutionTime
  async listVariables(orgId: string) {
    this.logStep('Listing variables', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.get(`/orgs/${orgId}/variables`);
      console.log('Variables fetched:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error listing variables');
      throw error;
    }
  }

  // Derived Role methods

  /**
   * Creates a new derived role within an organization.
   * @param orgId - The ID of the organization.
   * @param data - The derived role data to create.
   * @returns The created derived role data.
   */
  @logExecution
  @measureExecutionTime
  async createDerivedRole(orgId: string, data: any) {
    this.logStep('Creating derived role', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.post(`/orgs/${orgId}/derivedRoles`, data);
      console.log('Derived role created:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating derived role');
      throw error;
    }
  }

  /**
   * Fetches a derived role by its ID within an organization.
   * @param orgId - The ID of the organization.
   * @param derivedRoleId - The ID of the derived role.
   * @returns The fetched derived role data.
   */
  @logExecution
  @measureExecutionTime
  async getDerivedRole(orgId: string, derivedRoleId: string) {
    this.logStep('Fetching derived role', `Org ID: ${orgId}, Derived Role ID: ${derivedRoleId}`);
    try {
      const response = await this.apiClient.get(`/orgs/${orgId}/derivedRoles/${derivedRoleId}`);
      console.log('Derived role fetched:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching derived role');
      throw error;
    }
  }

  /**
   * Updates a derived role within an organization.
   * @param orgId - The ID of the organization.
   * @param derivedRoleId - The ID of the derived role.
   * @param data - The updated derived role data.
   * @returns The updated derived role data.
   */
  @logExecution
  @measureExecutionTime
  async updateDerivedRole(orgId: string, derivedRoleId: string, data: any) {
    this.logStep('Updating derived role', `Org ID: ${orgId}, Derived Role ID: ${derivedRoleId}`);
    try {
      const response = await this.apiClient.put(`/orgs/${orgId}/derivedRoles/${derivedRoleId}`, data);
      console.log('Derived role updated:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error updating derived role');
      throw error;
    }
  }

  /**
   * Deletes a derived role by its ID within an organization.
   * @param orgId - The ID of the organization.
   * @param derivedRoleId - The ID of the derived role.
   * @returns The response from the API after deletion.
   */
  @logExecution
  @measureExecutionTime
  async deleteDerivedRole(orgId: string, derivedRoleId: string) {
    this.logStep('Deleting derived role', `Org ID: ${orgId}, Derived Role ID: ${derivedRoleId}`);
    try {
      const response = await this.apiClient.delete(`/orgs/${orgId}/derivedRoles/${derivedRoleId}`);
      console.log('Derived role deleted:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error deleting derived role');
      throw error;
    }
  }

  /**
   * Lists all derived roles within an organization.
   * @param orgId - The ID of the organization.
   * @returns The list of derived roles.
   */
  @logExecution
  @measureExecutionTime
  async listDerivedRoles(orgId: string) {
    this.logStep('Listing derived roles', `Org ID: ${orgId}`);
    try {
      const response = await this.apiClient.get(`/orgs/${orgId}/derivedRoles`);
      console.log('Derived roles fetched:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error listing derived roles');
      throw error;
    }
  }
}

export default PolicyManagerClient;

