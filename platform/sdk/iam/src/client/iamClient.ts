import axios, { AxiosInstance } from "axios";
import { Policy } from "../models/policy.model";
import { IGroup } from "../models/group.model";
import { IUser } from "../models/user.model";
import { IRole } from "../models/role.model";

export class IAMClient {
  private api: AxiosInstance; // Use AxiosInstance here
  private token: string;

  constructor(apiEndpoint: string) {
    this.api = axios.create({
      baseURL: apiEndpoint,
    });
    this.token = "";
  }

  /**
   * Login using the IAM CLient
   * @param username - User name
   * @param password - Password of the user
   * @returns Genearted token
   */
  async login(username: string, password: string): Promise<string> {
    const response = await this.api.post("/auth/login", { username, password });
    this.token = response.data.token;
    return this.token;
  }

  /**
   * Refresh the token
   * @param token Exisiting token
   * @returns New generated token
   */
  async refreshToken(token: string): Promise<string> {
    const response = await this.api.post("/auth/refresh", { token });
    this.token = response.data.token;
    return this.token;
  }

  /**
   * Create User using the IAM Client library
   * @param userData Request body with user details
   * @returns User data or error message
   */
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    console.log({ userData });
    
    const response = await this.api.post("/users", userData, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Get the particular user details using user id
   * @param userId User Id to fetch the user details
   * @returns User data
   */
  async getUser(userId: string): Promise<IUser> {
    const response = await this.api.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Fetch all the users
   * @returns List of users
   */
  async listUsers(): Promise<IUser[]> {
    const response = await this.api.get("/users", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Update the user details
   * @param userId User id require to update the particular User
   * @param userData Updated data of the User (Request body)
   * @returns Updated user details in the response
   */
  async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser> {
    const response = await this.api.put(`/users/${userId}`, userData, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Delete the specific user
   * @param userId Delete the particular user using this userId
   */
  async deleteUser(userId: string): Promise<void> {
    await this.api.delete(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  /**
   * Attach policies to the User
   * @param userId - The ID of the user to attach the policies to.
   * @param policies - The policies to attach to the user.
   */
  async attachPoliciesToUser(
    userId: string,
    policies: string[]
  ): Promise<void> {
    await this.api.post(
      `/users/${userId}/policies`,
      { policies },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  /**
   * Attach roles to the User
   * @param userId - The ID of the user to attach the roles to.
   * @param policies - The roles to attach to the user.
   */
  async attachRolesToUser(userId: string, roleIds: string[]): Promise<void> {
    
    await this.api.post(
      `/users/${userId}/roles`,
      {  roleIds },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  /**
   * Attach groups to the User
   * @param userId - The ID of the user to attach the groups to.
   * @param groupIds - The IDs of the groups to attach.
   */
  async attachGroupsToUser(userId: string, groupIds: string[]): Promise<void> {
    const response =await this.api.post(
      `/users/${userId}/groups`,
      {  groupIds },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  /**
   * Create Role using the IAM Client library
   * @param userData Request body with role details
   * @returns Roles details
   */
  async createRole(roleData: Partial<IRole>): Promise<IRole> {
    const response = await this.api.post("/roles", roleData, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Get the particular role details using role id
   * @param roleId role Id to fetch the role details
   * @returns roles data
   */
  async getRole(roleId: string): Promise<IRole> {
    const response = await this.api.get(`/roles/${roleId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Handles retrieving a role by its name.
   * @param roleName Role name
   * @returns Role details using the role name
   */
  async getRoleByName(roleName: string): Promise<IRole> {
    const response = await this.api.get(`/roles/name/${roleName}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Fetch all the roles
   * @returns List of roles
   */
  async listRoles(): Promise<IRole[]> {
    const response = await this.api.get("/roles", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Update the role details
   * @param roleId Role id require to update the particular Role
   * @param roleData updated data of the Role (Request body)
   * @returns Updated role details in the response
   */
  async updateRole(roleId: string, roleData: Partial<IRole>): Promise<IRole> {
    const response = await this.api.put(`/roles/${roleId}`, roleData, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Delete the specific role
   * @param roleId Delete the particular role using this roleId
   */
  async deleteRole(roleId: string): Promise<void> {
    await this.api.delete(`/roles/${roleId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  /**
   * Handles attaching policies to a role by policy names (default) or IDs.
   * @param roleId - The ID of the role to attach the policies to.
   * @param policies - The policies to attach to the role.
   */
  async attachPoliciesToRole(
    roleId: string,
    policies: string[]
  ): Promise<void> {
    await this.api.post(
      `/roles/${roleId}/policies`,
      { policies },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

    /**
   * Creates a new group in the IAM system.
   *
   * @param {Partial<IGroup>} groupData - The data for the new group.
   * @returns {Promise<IGroup>} - The created group.
   */
  async createGroup(groupData: Partial<IGroup>): Promise<IGroup> {
    const response = await this.api.post("/groups", groupData, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Get the particular group details using group id
   * @param groupId Group Id to fetch the group details
   * @returns Group data
   */
  async getGroup(groupId: string): Promise<IGroup> {
    const response = await this.api.get(`/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Fetch all the groups
   * @returns List of groups
   */
  async listGroups(): Promise<IGroup[]> {
    const response = await this.api.get("/groups", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Update the group details
   * @param groupId Group id require to update the particular Group
   * @param groupData updated data of the Group (Request body)
   * @returns Updated group details in the response
   */
  async updateGroup(
    groupId: string,
    groupData: Partial<IGroup>
  ): Promise<IGroup> {
    const response = await this.api.patch(`/groups/${groupId}`, groupData, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Delete the specific group
   * @param groupId Delete the particular group using this groupId
   */
  async deleteGroup(groupId: string): Promise<void> {
    await this.api.delete(`/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  /**
   * Handles attaching policies to a group by policy names (default) or IDs.
   * @param groupId - The ID of the group to attach the policies to.
   * @param policies - The policies to attach to the group.
   * @returns The updated group.
   */
  async attachPoliciesToGroup(
    groupId: string,
    policies: string[]
  ): Promise<void> {
    await this.api.post(
      `/groups/${groupId}/policies`,
      { policies },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  /**
   * Retrieves a group by its name.
   * @param name - The name of the group to retrieve.
   * @returns The group with the specified name.
   */
  async getGroupByName(name: string): Promise<void> {
    await this.api.get(`/groups/name/${name}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  /**
   * Creates a new policy in the IAM system.
   * @param policyData - The data for the new policy.
   * @returns The created policy.
   * @throws {Error} If the policy already exists.
   */
  async createPolicy(policyData: Partial<Policy>): Promise<Policy> {
    const response = await this.api.post("/policies", policyData, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Retrieves a policy by its ID.
   * @param policyId - The ID of the policy to retrieve.
   * @returns The policy with the specified ID.
   */
  async getPolicy(policyId: string): Promise<Policy> {
    const response = await this.api.get(`/policies/${policyId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Fetch all the policies
   * @returns List of policies
   */
  async listPolicies(): Promise<Policy[]> {
    const response = await this.api.get("/policies", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Update the policy details
   * @param policyId Policy id require to update the particular Policy
   * @param policyData updated data of the Policy (Request body)
   * @returns Updated policy details in the response
   */
  async updatePolicy(
    policyId: string,
    policyData: Partial<Policy>
  ): Promise<Policy> {
    const response = await this.api.patch(`/policies/${policyId}`, policyData, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response.data;
  }

  /**
   * Delete the specific policy
   * @param policyId Delete the particular policy using this policyId
   */
  async deletePolicy(policyId: string): Promise<void> {
    await this.api.delete(`/policies/${policyId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  /**
   * gets the policy by name
   * @param name - The name of the policy to retrieve.
   * @returns The policy with the specified name.
   */ 
  async getPolicyByName(name: string): Promise<void> {
    await this.api.get(`/policies/name/${name}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
