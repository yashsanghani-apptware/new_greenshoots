import { Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';
import File from '../models/file';
import s3Service, {FileType} from '../services/s3Service';
import Permission from '../models/permission';
import {translate, initI18n} from '../utils/i18n';
import {
  INVALID_MESSAGE,
  SUCCESS_MESSAGE,
  ERROR_MESSAGES,
  PERMISSION_TYPES,
  FILE_TYPE
} from '../constants';

import Cabinet from '../models/cabinet';
import DataRoom from '../models/dataRoom';
import axios from 'axios';

const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const {organization_id, name, description, created_by, type, status, cabinet_id, dataroom_id } = req.body;
    
    // Validate organization_id 
    if(cabinet_id){
      if (!isValidObjectId(cabinet_id)) {
        res.status(400).json({ message:translate('INVALID_CABINET_ID') });
        return;
      }
    }

    if(dataroom_id) {
      if (!isValidObjectId(dataroom_id)) {
        res.status(400).json({ message: translate('INVALID_DATAROOM_ID') });
        return;
      }
    }

    if (!isValidObjectId(created_by)) {
      res.status(400).json({ message: translate('INVALID_CREATED_BY') });
      return;
    }

    if (typeof name !== 'string' || name.trim() === '') {
      res.status(400).json({ message: translate('INVALID_NAME') });
      return;
    }

    if (typeof status !== 'string' || status.trim() === '') {
      res.status(400).json({ message: translate('INVALID_STATUS') });
      return;
    }

    if (typeof description !== 'string' || description.trim() === '') {
      res.status(400).json({ message: translate('INVALID_DESCRIPTION') });
      return;
    }

    const allowedTypes = FILE_TYPE;
    if (!allowedTypes.includes(type)) {
      res.status(400).json({ message: translate('INVALID_TYPE') });
      return;
    }

    if (!req.files || !req.files.file) {
      res.status(400).json({ message: translate('ONLY_ALLOWED_NAME_ACCEPTED') });
      return;
    }

    let cabinet = null;
    let dataroom = null;
    if(cabinet_id){
      cabinet = await Cabinet.findById(cabinet_id).populate({ path: 'dataroom', model: 'DataRoom', select: '_id' }).select('_id dataroom');
      if(!cabinet){
        res.status(400).json({ message: translate('CABINET_NOT_FOUND') });
        return;
      }
    }

    if(dataroom_id){
      dataroom = await DataRoom.findById(dataroom_id).select('_id dataroom');
      if(!dataroom){
        res.status(400).json({ message: translate('DATA_ROOM_NOT_FOUND') });
        return;
      }
    }

    //Create File 
    const file = new File({
      ...req.body,
    });
    const savedFile = await file.save();


    //Upload file in S3
    const uploadResult = await s3Service.uploadFile(req.files.file as FileType, organization_id, String(savedFile._id) );
    const newVersion = {
      version_id: uploadResult.VersionId, // Ensure S3 versioning is enabled to get VersionId
      url: uploadResult.Location,
      created_at: new Date(),
    };

    //Update File model:
    const updatedFile = await File.findByIdAndUpdate(savedFile._id, {
      $push: { versions: newVersion }, 
      $set: { content_url: uploadResult.Location,  cabinet_id: cabinet_id, dataroom_id: dataroom_id  },
    }, { new: true });


    //Update cabinet model:
    if(cabinet){
      await Cabinet.findByIdAndUpdate(cabinet_id, { $push: { files: savedFile._id } }, { new: true });
    }

    //Update dataroom model:
    if(dataroom){
      await DataRoom.findByIdAndUpdate(dataroom_id, { $push: { files: savedFile._id } }, { new: true });
    }
    res.status(201).json(updatedFile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id } = req.params;

    if (file_id && !isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    const file = await File.findOne({_id: file_id, isDeleted: false});
    let signedUrl;
    if (file && file.content_url) {
      signedUrl = await s3Service.generatePresignedUrl(file.content_url);
    }
    if (file !== null && signedUrl) {
      file.content_url = signedUrl;
    }
    res.status(200).json(file);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cabinet_id, dataroom_id, organization_id } = req.body;
    if (cabinet_id && !isValidObjectId(cabinet_id)) {
      res.status(400).json({ message: translate('INVALID_CABINET_ID') });
      return;
    }

    if(dataroom_id && !isValidObjectId(dataroom_id)) {
      res.status(400).json({ message: translate('INVALID_DATAROOM_ID') });
      return;
    }

    if (organization_id && !isValidObjectId(organization_id)) {
      res.status(400).json({ message: translate('INVALID_ORGANIZATION_ID') });
      return;
    }

    const query = { isDeleted: false, ...(cabinet_id && { cabinet_id }), ...(dataroom_id && { dataroom_id }), ...(organization_id && { organization_id })};
    const file = await File.find( query );
    res.status(200).json(file);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const mount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cabinet_id, dataroom_id } = req.body;
    const {file_id} = req.params;

    if (file_id && !isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    if (cabinet_id && !isValidObjectId(cabinet_id)) {
      res.status(400).json({ message: translate('INVALID_CABINET_ID') });
      return;
    }

    if(dataroom_id && !isValidObjectId(dataroom_id)) {
      res.status(400).json({ message: translate('INVALID_DATAROOM_ID') });
      return;
    }


    const fileDetails = await File.findOne({_id: file_id, isDeleted: false});
    if(!fileDetails){
      res.status(400).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    if(!cabinet_id && !dataroom_id){
      res.status(400).json({ message: translate('CABINET_OR_DATAROOM_REQUIRED') });
      return;
    }

    if(cabinet_id){
      //check if the cabinet is not deleted
      const cabinetDetails = await Cabinet.findById(cabinet_id, { isDeleted: false });
      if(!cabinetDetails){
        res.status(400).json({ message: translate('CABINET_NOT_FOUND') });
      }

      //check if the file is already attached to the cabinet
      if(fileDetails.cabinet_id && fileDetails.cabinet_id == cabinet_id){
        res.status(400).json({ message: translate('FILE_ALREADY_ATTACHED_TO_CABINET') });
        return;
      } 
    
      //check if the cabinet already contains the file
      if(cabinetDetails?.files.includes(file_id as any)){
        res.status(400).json({ message: translate('FILE_ALREADY_ATTACHED_TO_CABINET') });
        return;
      }

      //attach cabinet to the file
      await File.findByIdAndUpdate(file_id, { cabinet_id }, { new: true });

      //attach the file to the cabinet
      await Cabinet.findByIdAndUpdate(cabinet_id, { $push: { files: fileDetails._id } }, { new: true });
      res.status(200).json({ message: translate('FILE_ATTACHED_SUCCESSFULLY_TO_CABINET') });
    }

    if(dataroom_id){
      //check if the dataroom is not deleted
      const dataroomDetails = await DataRoom.findById(dataroom_id, { isDeleted: false });

      if(!dataroomDetails){
        res.status(400).json({ message: translate('DATAROOM_NOT_FOUND') });
      }

      //check if the file is already attached to the dataroom
      if(fileDetails.dataroom_id && fileDetails.dataroom_id == dataroom_id){
        res.status(400).json({ message: translate('FILE_ALREADY_ATTACHED_TO_DATAROOM') });
        return;
      } 
      
      //check if the dataroom already contains the file
      if(dataroomDetails?.files.includes(file_id as any)){
        res.status(400).json({ message: translate('FILE_ALREADY_ATTACHED_TO_DATAROOM') });
        return;
      }
      
      //attach dataroom to the file
      await File.findByIdAndUpdate(file_id, { dataroom_id }, { new: true });

      //attach the file to the dataroom
      await DataRoom.findByIdAndUpdate(dataroom_id, { $push: { files: fileDetails._id } }, { new: true });
      res.status(200).json({ message: translate('FILE_ATTACHED_SUCCESSFULLY_TO_DATAROOM') });
    }

  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const unmount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cabinet_id, dataroom_id } = req.body;
    const {file_id} = req.params; 

    if (file_id && !isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    if (cabinet_id && !isValidObjectId(cabinet_id)) {
      res.status(400).json({ message: translate('INVALID_CABINET_ID') });
      return;
    }

    if(dataroom_id && !isValidObjectId(dataroom_id)) {
      res.status(400).json({ message: translate('INVALID_DATAROOM_ID') });
      return;
    }


    const fileDetails = await File.findOne({_id: file_id, isDeleted: false});
    if(!fileDetails){
      res.status(400).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    if(!cabinet_id && !dataroom_id){
      res.status(400).json({ message: translate('CABINET_OR_DATAROOM_REQUIRED') });
      return;
    }

    if(cabinet_id){
      //check if the cabinet is not deleted
      const cabinetDetails = await Cabinet.findById(cabinet_id, { isDeleted: false });
      if(!cabinetDetails){  
        res.status(400).json({ message: translate('CABINET_NOT_FOUND') });
        return;
      }

      //check if the file is already attached to the cabinet
      if(!cabinetDetails?.files.includes(file_id as any)){
        res.status(400).json({ message: translate('FILE_NOT_ATTACHED_TO_CABINET') });
        return;
      }

      //dettach cabinet from the file
      await File.findByIdAndUpdate(file_id, { cabinet_id: null }, { new: true });

      //dettach the file from the cabinet
      await Cabinet.findByIdAndUpdate(cabinet_id, { $pull: { files: fileDetails._id } }, { new: true });
      res.status(200).json({ message: translate('FILE_DETTACHED_SUCCESSFULLY_FROM_CABINET') });
    }

    if(dataroom_id){
      //check if the dataroom is not deleted
      const dataroomDetails = await DataRoom.findById(dataroom_id, { isDeleted: false });
      if(!dataroomDetails){
        res.status(400).json({ message: translate('DATAROOM_NOT_FOUND') });
        return;
      }

      //check if the file is already attached to the dataroom
      if(!dataroomDetails?.files.includes(file_id as any)){
        res.status(400).json({ message: translate('FILE_NOT_ATTACHED_TO_DATAROOM') });
        return;
      }

      //dettach dataroom from the file
      await File.findByIdAndUpdate(file_id, { dataroom_id: null }, { new: true });

      //dettach the file from the dataroom
      await DataRoom.findByIdAndUpdate(dataroom_id, { $pull: { files: fileDetails._id } }, { new: true });
      res.status(200).json({ message: translate('FILE_DETTACHED_SUCCESSFULLY_FROM_DATAROOM') });
    }

  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

/**
 * Retrieves a specific file version based on the provided cabinet ID, file ID, and version ID.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @return {Promise<void>} A promise that resolves when the file version is retrieved and sent in the response.
 */
export const getFileVersion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id, version_id } = req.params;

    if (file_id && !isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    const file = await File.findOne({ _id: file_id, isDeleted: false });
    if (!file) {
      res.status(404).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    const version = file.versions.find(v => v.version_id === version_id);
    if (!version) {
      res.status(404).json({ message: translate('VERSION_NOT_FOUND') });
      return;
    }

    res.status(200).json(version);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Downloads a file from the server and sends it as a response to the client.
 *
 * @param {Request} req - The request object containing the cabinet_id and file_id parameters.
 * @param {Response} res - The response object used to send the file to the client.
 * @return {Promise<void>} - A promise that resolves when the file is successfully downloaded and sent to the client.
 */
export const downloadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id } = req.params;
    const { version_id } = req.query;

    if (!isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    const file = await File.findOne({ _id: file_id, isDeleted: false });

    if (!file) {
      res.status(404).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    // Determine the URL to download: default or specific version
    let fileUrl = file.content_url; // Default to the main file URL

    if (version_id) {
      const version = file.versions.find(v => v.version_id === version_id);

      if (version) {
        fileUrl = version.url; // Use the version-specific URL if found
      } else {
        res.status(404).json({ message: translate('VERSION_NOT_FOUND') });
        return;
      }
    }
    // Fetching the file from the URL
    const response = await axios.get(fileUrl, { responseType: 'stream' });

    // Setting headers for the file download
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.setHeader('Content-Type', response.headers['content-type']);

    // Piping the file stream to the response
    response.data.pipe(res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id } = req.params;
    const { organization_id, name, description, created_by, type, status } = req.body;

    // Validate organization_id 
    if (!isValidObjectId(organization_id)) {
      res.status(400).json({ message: translate('INVALID_ORGANIZATION_ID') });
      return;
    }

    if (!isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    if (created_by && !isValidObjectId(created_by)) {
      res.status(400).json({ message: translate('INVALID_CREATED_BY') });
      return;
    }

    const updateFields: { [key: string]: any } = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        res.status(400).json({ message: translate('INVALID_NAME') });
        return;
      }
      updateFields.name = name;
    }

    if (description !== undefined) {
      if (typeof description !== 'string' || description.trim() === '') {
        res.status(400).json({ message: translate('INVALID_DESCRIPTION') });
        return;
      }
      updateFields.description = description;
    }

    if (type !== undefined) {
      const allowedTypes = FILE_TYPE;
      if (!allowedTypes.includes(type)) {
        res.status(400).json({ message: translate('INVALID_TYPE') });
        return;
      }
      updateFields.type = type;
    }

    if (status !== undefined) {
      if (typeof status !== 'string' || status.trim() === '') {
        res.status(400).json({ message: translate('INVALID_STATUS') });
        return;
      }
      updateFields.status = status;
    }

    if (req.files?.file) {
      // Retrieve the current file document
      const file = await File.findOne({_id: file_id, isDeleted: false});

      if (!file) {
        res.status(404).json({ message: translate('FILE_NOT_FOUND') });
        return;
      }

      const uploadResult = await s3Service.uploadFile(req.files.file as FileType, organization_id, file_id ); 
      const newVersion = {
        version_id: uploadResult.VersionId, // Ensure S3 versioning is enabled to get VersionId
        url: uploadResult.Location,
        created_at: new Date(),
      };

      // Update the URL
      updateFields.url = uploadResult.Location;
      updateFields.versions = [...file.versions, newVersion ];
    }

    const updatedFile = await File.findByIdAndUpdate(file_id, updateFields, {
      new: true,
    });

    if (!updatedFile) {
      res.status(404).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    res.status(200).json(updatedFile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id } = req.params;

    if (!isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    const file = await File.findOne({_id: file_id, isDeleted: false});
    if (!file) {
      res.status(404).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    // await s3Service.deleteFile(file.url);
    await File.findByIdAndUpdate(file_id, {isDeleted: true, deleted_at: new Date()}, {new: true});

    res.status(200).json({ message: translate('FILE_DELETED') });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createFilePermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cabinet_id, file_id } = req.params;
    const { type, roles, users, start_time, end_time } = req.body;

    if (!isValidObjectId(cabinet_id)) {
      res.status(400).json({ message: translate('INVALID_CABINET_ID') });
      return;
    }

    if (!isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    const allowedTypes = PERMISSION_TYPES;
    if (!allowedTypes.includes(type)) {
      res.status(400).json({ message: translate('INVALID_TYPE') });
      return;
    }

    const file = await File.findOne({_id: file_id, isDeleted: false});
    if (!file) {
      res.status(404).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    const newPermission = new Permission({
      type,
      roles,
      users,
      start_time,
      end_time,
    });

    await newPermission.save();

    file.permissions?.push(newPermission._id);
    await file.save();

    res.status(201).json(newPermission);
  } catch (error: any) {
    console.log({ error: error.message });
    res.status(400).json({ message: translate('ERROR_CREATING_PERMISSION') });
  }
};

export const getFilePermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cabinet_id, file_id } = req.params;

    if (!isValidObjectId(cabinet_id)) {
      res.status(400).json({ message: translate('INVALID_CABINET_ID') });
      return;
    }

    if (!isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    const file = await File.findOne({_id: file_id, isDeleted: false}).populate('permissions');
    if (!file) {
      res.status(404).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    res.status(200).json(file.permissions);
  } catch (error) {
    res.status(500).json({ message: translate('ERROR_FETCHING_FILE_PERMISSIONS') });
  }
};

export const getFilePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cabinet_id, file_id, permission_id } = req.params;

    if (!isValidObjectId(cabinet_id)) {
      res.status(400).json({ message: translate('INVALID_CABINET_ID') });
      return;
    }

    if (!isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    if (!isValidObjectId(permission_id)) {
      res.status(400).json({ message: translate('INVALID_PERMISSION_ID') });
      return;
    }

    const permission = await Permission.findById(permission_id);
    if (!permission) {
      res.status(404).json({ message: translate('PERMISSION_NOT_FOUND') });
      return;
    }

    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: translate('ERROR_FETCHING_FILE_PERMISSIONS') });
  }
};

//Update Permission
export const updatePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id, permission_id } = req.params;
    const { type, roles, users, start_time, end_time } = req.body;

    // Validate file_id
    if (!isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    // Validate permission type
    const validTypes = PERMISSION_TYPES;
    if (!validTypes.includes(type)) {
      res.status(400).json({ message: translate('INVALID_TYPE') });
      return;
    }

    // Validate roles and users
    if (!Array.isArray(roles) || !Array.isArray(users)) {
      res.status(400).json({ message: translate('ROLES_USERS_MUST_ARRAY') });
      return;
    }

    // Validate start and end times
    if (!start_time || !end_time) {
      res.status(400).json({ message: translate('START_END_TIME_REQUIRED') });
      return;
    }

    // Find the file
    const file = await File.findOne({_id: file_id, isDeleted: false});
    if (!file) {
      res.status(404).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    // Check if permission_id exists in DataRoom permissions array
    if (!file.permissions?.includes(permission_id as any)) {
      res.status(404).json({ message: translate('PERMISSION_NOT_FOUND') });
      return;
    }

    // Find and update the Permission
    const permission = await Permission.findById(permission_id);
    if (!permission) {
      res.status(404).json({ message: translate('PERMISSION_NOT_FOUND') });
      return;
    }

    // Update permission fields
    permission.type = type;
    permission.roles = roles;
    permission.users = users;
    permission.start_time = start_time;
    permission.end_time = end_time;

    await permission.save();

    res.status(200).json({ message: translate('PERMISSION_UPDATED'), permission });
  } catch (error: any) {
    res.status(500).json({ message: translate('ERROR_UPDATING_PERMISSION'), error: error.message });
  }
};

//Delete  Permission
export const deletePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id, permission_id } = req.params;

    // Validate file_id
    if (!isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }

    // Validate permission_id
    if (!isValidObjectId(permission_id)) {
      res.status(400).json({ message: translate('INVALID_PERMISSION_ID') });
      return;
    }

    // Find the file
    const file = await File.findOne({_id: file_id, isDeleted: false});
    if (!file) {
      res.status(404).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    // Check if permission_id exists in file permissions array
    const permissionIndex = file.permissions?.indexOf(permission_id as any);
    if (permissionIndex === -1) {
      res.status(404).json({ message: translate('PERMISSION_NOT_FOUND') });
      return;
    }

    // Remove the permission ID from file
    file.permissions?.splice(permissionIndex || -1, 1);
    await file.save();

    // Find and delete the Permission
    const permission = await Permission.findByIdAndDelete(permission_id);
    if (!permission) {
      res.status(404).json({ message: translate('PERMISSION_NOT_FOUND') });
      return;
    }

    res.status(200).json({ message: translate('PERMISSION_DELETED'), permission });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Check User Permissions 
export const checkUserPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id, user_id } = req.params;
    const { permissions } = req.body;

    // Validate file_id and user_id
    if (!isValidObjectId(file_id)) {
      res.status(400).json({ message: translate('INVALID_FILE_ID') });
      return;
    }
    if (!isValidObjectId(user_id)) {
      res.status(400).json({ message: translate('INVALID_USER_ID') });
      return;
    }

    // Validate permissions array
    if (!permissions || !Array.isArray(permissions) || permissions.length === 0) {
      res.status(400).json({ message: translate('INVALID_PERMISSIONS') });
      return;
    }

    const validPermissions = PERMISSION_TYPES;
    for (const perm of permissions) {
      if (!validPermissions.includes(perm)) {
        res.status(400).json({ message: translate('INVALID_PERMISSION_TYPE') });
        return;
      }
    }

    const file = await File.findOne({_id: file_id, isDeleted: false}).populate('permissions');
    if (!file) {
      res.status(404).json({ message: translate('FILE_NOT_FOUND') });
      return;
    }

    // Fetch permissions details
    const permissionDetails = await Permission.find({
      _id: { $in: file.permissions },
    });

    // Check if the user has the required permissions
    const hasPermission = permissionDetails.some((permission) => {
      return permission.users.includes(user_id) && permissions.includes(permission.type);
    });

    if (!hasPermission) {
      res.status(403).json({ message: translate('PERMISSION_DENIED') });
      return;
    }

    res.status(200).json({ message: translate('PERMISSION_GRANTED') });
  } catch (error: any) {
    res.status(500).json({ message: translate('SERVER_ERROR'), error: error.message });
  }
};
