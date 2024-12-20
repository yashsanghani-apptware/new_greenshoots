import axios, { AxiosInstance } from "axios";
import { IDataRoom } from "../../services/dataroom-service/src/models/dataRoom";
import { IFile } from "../../services/dataroom-service/src/models/file";
import { ICabinet } from "../../services/dataroom-service/src/models/cabinet";


export class DataroomClient {
  private api: AxiosInstance; // Use AxiosInstance here
  private token: string;

  constructor(apiEndpoint: string) {
    this.api = axios.create({
      baseURL: apiEndpoint,
    });
    this.token = "";
  } 

  /**
   * createDataRoom creates a new data room
   * @param newDataRoom - Data room details
   * @returns - newly created Data room
   */
    async createDataRoom(newDataRoom: Partial<IDataRoom>): Promise<any> {
      const response = await this.api.post("/datarooms", newDataRoom);
      return response.data;
    }
  
    /**
     * Get the particular DataRoom details using dataRoomId
     * @param dataRoomId dataRoomId to fetch the DataRoom details
     * @returns DataRoom data
     */
    async getDataRoom(dataRoomId: string): Promise<IDataRoom> {
      const response = await this.api.get(`/datarooms/${dataRoomId}`);
      return response.data;
    }
  
    /**
     * Fetch all the DataRooms
     * @returns List of DataRooms
     */
    async getDataRooms(): Promise<IDataRoom[]> {
      const response = await this.api.get("/datarooms");
      return response.data;
    }
  
    /**
     * Update the DataRoom details
     * @param dataRoomId dataRoomId require to update the particular DataRoom
     * @param DataRoomData Updated data of the DataRoom (Request body)
     * @returns Updated DataRoom details in the response
     */
    async updateDataRoom(dataRoomId: string, userData: Partial<IDataRoom>): Promise<IDataRoom> {
      const response = await this.api.put(`/datarooms/${dataRoomId}`, userData, {
      });
      return response.data;
    }
  
    /**
     * Delete the specific DataRoom
     * @param dataRoomId Delete the particular DataRoom using this dataRoomId
     */
    async deleteDataRoom(dataRoomId: string): Promise<void> {
      await this.api.delete(`/datarooms/${dataRoomId}`);
    }
  
    /**
     * Create cabinet using the IAM Client library
     * @param cabinetData Request body with cabinet details
     * @returns cabinet data or error message
     */
    async createCabinet(cabinetData: Partial<ICabinet>): Promise<any> {
      const response = await this.api.post("/cabinets", cabinetData, {
      });
      return response.data;
    }
  
    /**
     * Get the particular cabinet details using cabinetId
     * @param cabinetId cabinetId to fetch the cabinet details
     * @returns cabinet data
     */
    async getCabinet(cabinetId: string): Promise<ICabinet> {
      const response = await this.api.get(`/cabinets/${cabinetId}`, {
      });
      return response.data;
    }
  
    /**
     * Fetch all the Cabinets
     * @returns List of Cabinets
     */
    async getCabinets(): Promise<ICabinet[]> {
      const response = await this.api.get("/cabinets", {
      });
      return response.data;
    }
  
    /**
     * Update the cabinet details
     * @param cabinetId cabinetId require to update the particular cabinet
     * @param DataRoomData Updated data of the cabinet (Request body)
     * @returns Updated cabinet details in the response
     */
    async updateCabinet(cabinetId: string, userData: Partial<ICabinet>): Promise<ICabinet> {
      const response = await this.api.put(`/cabinets/${cabinetId}`, userData, {
      });
      return response.data;
    }
  
    /**
     * Delete the specific cabinet
     * @param cabinetId Delete the particular cabinet using this cabinetId
     */
    async deleteCabinet(cabinetId: string): Promise<void> {
      await this.api.delete(`/cabinets/${cabinetId}`);
    }
  

  /**
   * Uploads a file to a specific cabinet.
   *
   * @param {Partial<any>} newFileFormData - The file data to upload.
   * @return {Promise<IFile>} A promise that resolves to the uploaded file data.
   */
  async uploadFile(newFileFormData: Partial<any>): Promise<IFile> {
    const response = await this.api.post(`/files`, newFileFormData);
    return response.data;
  }
  /**
   * Retrieves a file from a cabinet.
   *
   * @param {any} cabinetId - The ID of the cabinet.
   * @param {any} fileId - The ID of the file.
   * @return {Promise<IFile>} A promise that resolves to the file data.
   */
  async getFile(fileId: any): Promise<IFile> {
    const response = await this.api.get(`/files/${fileId}`);
    return response.data;
  }

  /**
   * Retrieves a file from a cabinet.
   *
   * @param {any} organizationId - The ID of the organization.
   * @return {Promise<IFile>} A promise that resolves to the file data.
   */
  async getFiles(organizationId: any): Promise<IFile[]> {
    const response = await this.api.get(`/files`, organizationId );
    return response.data;
  }

  /**
   * Updates a file in a cabinet.
   *
   * @param {any} fileId - The ID of the file to update.
   * @param {Partial<IFile>} updatedFile - The updated file data.
   * @return {Promise<IFile>} A promise that resolves to the updated file data.
   */
  async updateFile(fileId: any, updatedFile: Partial<IFile>): Promise<IFile> {
    const response = await this.api.put(`/files/${fileId}`, updatedFile);
    return response.data;
  }

  /**
   * Deletes a file from a cabinet.
   *
   * @param {any} fileId - The ID of the file to delete.
   * @return {Promise<IFile>} A promise that resolves to the deleted file data.
   */
  async deleteFile(fileId: any): Promise<IFile> {
    const response = await this.api.delete(`/files/${fileId}`);
    return response.data;
  }

  /** 
   * Mounts a file to a cabinet
   * @param {any} fileId - The ID of the file to mount.
   * @param {any} cabinetId - The ID of the cabinet to mount the file to.
   * @return {Promise<IFile>} A promise that resolves to the mounted file data.
   */
  async mountFile(fileId: any, cabinetId: any): Promise<IFile> {    
    const response = await this.api.post(`/files/${fileId}/mount`, {cabinet_id: cabinetId});
    return response.data;
  }

  /** 
   * Unmounts a file from a cabinet
   * @param {any} fileId - The ID of the file to unmount.
   * @param {any} cabinetId - The ID of the cabinet to unmount the file from.
   * @return {Promise<IFile>} A promise that resolves to the unmounted file data.
   */
  async unmountFile(fileId: any, cabinetId: any): Promise<IFile> {
    const response = await this.api.post(`/files/${fileId}/unmount`, {cabinet_id: cabinetId});
    return response.data;
  }
  
  /**
   * Routes a document for signature using DocuSign.
   *
   * @param {any} docuSignFormData - The data required for routing the document for signature.
   * @return {any} The response data from the signature routing request.
   */
  async routeForSignature(docuSignFormData: any) {
    const response = await this.api.post(`/signatures`, docuSignFormData, {
    });
    return response.data
  }
}
