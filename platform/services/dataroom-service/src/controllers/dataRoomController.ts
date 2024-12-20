import mongoose, { Document, Types } from "mongoose";
import { Request, Response } from "express";
import DataRoom, { IDataRoom } from "../models/dataRoom";
import Permission, { IPermission } from "../models/permission";
import {translate, initI18n} from '../utils/i18n';
import {
  INVALID_MESSAGE,
  SUCCESS_MESSAGE,
  ERROR_MESSAGES,
  PERMISSION_TYPES,
} from "../constants";
import logger from "../logger/logger";
import Cabinet from "../models/cabinet";
import File from "../models/file";

const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

// Define the request body types for the specific endpoints
interface ICreateDataRoomRequest extends Request {
  body: {
    organization_id: string;
    ari: string;
    name: string;
    description: string;
    created_by: string;
    owner: string;
    data_residency: {
      country: string;
      region: string;
      data_center: string;
    }
    key_info: object;
    permissions: { user_id: string; access_level: string }[];
  };
}

interface IUpdateDataRoomRequest extends Request {
  body: {
    organization_id?: string;
    ari: string;
    data_residency?: {
      country: string;
      region: string;
      data_center: string;
    }
    name?: string;
    description?: string;
    created_by?: string;
    owner?: string;
    key_info?: object;
    permissions?: { user_id: string; access_level: string }[];
  };
}

type PermissionType = (typeof PERMISSION_TYPES)[number];
interface ICreatePermissionRequest extends Request {
  body: {
    type: PermissionType;
    roles: string[];
    users: string[];
    start_time: Date;
    end_time: Date;
  };
}

// Define the interface for the request parameters and body
interface IUpdatePermissionRequest extends Request {
  params: {
    dataroom_id: string;
    permission_id: string;
  };
  body: {
    type: "VIEW" | "READ" | "WRITE" | "CREATE";
    roles: string[];
    users: string[];
    start_time: Date;
    end_time: Date;
  };
}

// Create Data Room
export const createDataRoom = async (
  req: ICreateDataRoomRequest,
  res: Response
) => {
  try {
    const { organization_id, ari, data_residency, name, description, created_by, owner, key_info, permissions } =
      req.body;

    // Validate organization_id and created_by
    if (!isValidObjectId(organization_id)) {
      logger.error(translate('INVALID_ORGANIZATION_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_ORGANIZATION_ID') });
    }

    if (!isValidObjectId(created_by)) {
      logger.error(translate('INVALID_CREATED_BY'));
      return res.status(400).json({ message: translate('INVALID_CREATED_BY') });
    }

    // Validate name and description
    if (typeof name !== "string" || name.trim() === "") {
      logger.error(translate('INVALID_NAME'));
      return res.status(400).json({ message: translate('INVALID_NAME') });
    }

    if (typeof description !== "string" || description.trim() === "") {
      logger.error(translate('INVALID_DESCRIPTION') );
      return res
        .status(400)
        .json({ message: translate('INVALID_DESCRIPTION') });
    }

    // Validate permissions
    if (!Array.isArray(permissions)) {
      logger.error(translate('INVALID_PERMISSIONS'));
      return res
        .status(400)
        .json({ message: translate('INVALID_PERMISSIONS') });
    }

    permissions.forEach((permission) => {
      if (!isValidObjectId(permission.user_id)) {
        logger.error(translate('INVALID_PERMISSIONS_USER_ID'));
        return res
          .status(400)
          .json({ message: translate('INVALID_PERMISSIONS_USER_ID') });
      }
    });

    const dataRoom = new DataRoom({
      organization_id,
      ari,
      data_residency,
      name,
      description,
      created_by,
      owner,
      created_at: new Date(),
      key_info,
      permissions,
    });

    await dataRoom.save();
    logger.info(translate('DATA_ROOM_CREATED'));
    logger.info(`${JSON.stringify(dataRoom)}`);
    res.status(201).json({
      message: translate('DATA_ROOM_CREATED'),
      dataRoom,
    });
  } catch (error) {
    logger.error({ message: translate('ERROR_CREATING_DATA_ROOM'), error });
    res
      .status(500)
      .json({ message: translate('ERROR_CREATING_DATA_ROOM'), error });
  }
};

// Get a Specific Data Room
export const getDataRoom = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.dataroom_id)) {
      logger.error(translate('MONGO_SCHEMA_ID_INVALID'));
      return res.status(400).json({
        message: translate('MONGO_SCHEMA_ID_INVALID'),
      });
    }
    const dataRoom = await DataRoom.findById(req.params.dataroom_id).populate("cabinets");
    if (!dataRoom) {
      logger.error(translate('DATA_ROOM_NOT_FOUND'));
      return res
        .status(404)
        .json({message:translate('DATA_ROOM_NOT_FOUND')});
    }
    logger.info(`Data Room Fetched`);
    dataRoom?.isDeleted === true ? res.status(404).json({ message: ERROR_MESSAGES.DATA_ROOM_NOT_FOUND }) : res.status(200).json(dataRoom);
  } catch (error: any) {
    logger.error({ message:  translate('ERROR_CREATING_DATA_ROOM'), error });
    res
      .status(500)
      .json({
        message: translate('ERROR_CREATING_DATA_ROOM'),
        error: error.message,
      });
  }
};

// Get List of Data Rooms
export const getDataRooms = async (req: Request, res: Response) => {
  try {
    const dataRooms = await DataRoom.find({isDeleted: false}).populate("cabinets");
    if (dataRooms.length === 0)
      return res
        .status(200)
        .json(translate('DATA_ROOM_NOT_FOUND'));
    logger.info(`Data Rooms fetched`);
    console.log({dataRooms}, "__________");
    res.status(200).json(dataRooms);
  } catch (error) {
    res.status(500).json({ message: translate('ERROR_FETCHING_DATA_ROOMS') });
  }
};

// // Update Data Room
export const updateDataRoom = async (
  req: IUpdateDataRoomRequest,
  res: Response
) => {
  try {
    const { dataroom_id } = req.params;
    const updateFields = req.body;

    // Validate dataroom_id
    if (!isValidObjectId(dataroom_id)) {
      logger.error(translate('INVALID_DATAROOM_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_DATAROOM_ID') });
    }

    // Validate organization_id if present
    if (updateFields.organization_id && !isValidObjectId(updateFields.organization_id)) {
      logger.error(translate('INVALID_ORGANIZATION_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_ORGANIZATION_ID') });
    }

    // Validate created_by if present
    if (updateFields.created_by && !isValidObjectId(updateFields.created_by)) {
      logger.error(translate('INVALID_CREATED_BY'));
      return res.status(400).json({ message: translate('INVALID_CREATED_BY') });
    }

    // Validate name if present
    if (
      (updateFields.name || updateFields.name === "") &&
      (typeof updateFields.name !== "string" || updateFields.name.trim() === "")
    ) {
      logger.error(translate('INVALID_NAME'));
      return res.status(400).json({ message: translate('INVALID_NAME') });
    }

    // Validate description if present
    if (
      (updateFields.description || updateFields.description === "") &&
      (typeof updateFields.description !== "string" ||
        updateFields.description.trim() === "")
    ) {
      logger.error(translate('INVALID_DESCRIPTION'));
      return res
        .status(400)
        .json({ message: translate('INVALID_DESCRIPTION') });
    }

    // Validate key_info if present
    if (updateFields.key_info && typeof updateFields.key_info !== "object") {
      logger.error(translate('INVALID_KEY_INFO'));
      return res
        .status(400)
        .json({ message: translate('INVALID_KEY_INFO') });
    }

    // Validate permissions if present
    if (updateFields.permissions) {
      if (!Array.isArray(updateFields.permissions)) {
        logger.error(translate('INVALID_PERMISSIONS'));
        return res
          .status(400)
          .json({ message: translate('INVALID_PERMISSIONS') });
      }

      for (const permission of updateFields.permissions) {
        if (!isValidObjectId(permission.user_id)) {
          logger.error(translate('INVALID_PERMISSIONS_USER_ID'));
          return res
            .status(400)
            .json({ message: translate('INVALID_PERMISSIONS_USER_ID') });
        }
      }
    }

    // Perform the update
    const dataRoom = await DataRoom.findByIdAndUpdate(
      dataroom_id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!dataRoom) {
      logger.error(translate('DATA_ROOM_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('DATA_ROOM_NOT_FOUND') });
    }
    logger.info(
      `${ translate('DATA_ROOM_UPDATED')} => ${JSON.stringify(dataRoom)}`
    );
    res.status(200).json({
      message: translate('DATA_ROOM_UPDATED'),
      dataRoom,
    });
  } catch (error: any) {
    logger.error( translate('ERROR_UPDATING_DATA_ROOM'));
    res
      .status(500)
      .json({
        message: translate('ERROR_UPDATING_DATA_ROOM'),
        error: error.message,
      });
  }
};

// // Delete Data Room
export const deleteDataRoom = async (req: Request, res: Response) => {
  try {
    const { dataroom_id } = req.params;

    // Validate dataroom_id
    if (!isValidObjectId(dataroom_id)) {
      logger.error(translate('INVALID_DATAROOM_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_DATAROOM_ID') });
    }

    // Delete all Cabinet in the data room
    const dataRoomCabinets = await DataRoom.findById(dataroom_id).populate("cabinets");
    if (dataRoomCabinets?.cabinets) {
      dataRoomCabinets?.cabinets?.map(async (cabinet) => {

        // Delete all files in the cabinet
        const cabinetFiles = await Cabinet.findById(cabinet._id).populate("files");
        if (cabinetFiles?.files) {
          cabinetFiles?.files?.map(async (file) => {
            await File.findByIdAndUpdate(file._id, {isDeleted: true});
          })
        }
        await Cabinet.findByIdAndUpdate(cabinet._id, {isDeleted: true});
      })
    }

    const dataRoom = await DataRoom.findByIdAndUpdate(dataroom_id, {isDeleted: true, deleted_at: new Date()});
    if (!dataRoom) {
      logger.error(translate('DATA_ROOM_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('DATA_ROOM_NOT_FOUND') });
    }
    logger.info(`${translate('DATA_ROOM_DELETED')} => ${dataroom_id}`);
    res.status(200).json({
      message: translate('DATA_ROOM_DELETED'),
    });
  } catch (error: any) {
    logger.error(translate('ERROR_DELETING_DATA_ROOM'));
    res.status(500).json({
      message: translate('ERROR_DELETING_DATA_ROOM'),
      error: error.message,
    });
  }
};

// Create Permission
export const createPermission = async (
  req: ICreatePermissionRequest,
  res: Response
) => {
  try {
    const { dataroom_id } = req.params;
    const { type, roles, users, start_time, end_time } = req.body;

    // Validate dataroom_id
    if (!isValidObjectId(dataroom_id)) {
      logger.error(translate('INVALID_DATAROOM_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_DATAROOM_ID') });
    }

    // Check if the DataRoom exists
    const dataRoom = await DataRoom.findById(dataroom_id);
    if (!dataRoom) {
      logger.error(translate('DATA_ROOM_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('DATA_ROOM_NOT_FOUND') });
    }

    // Validate permission data
    if (!PERMISSION_TYPES.includes(type)) {
      logger.error(translate('INVALID_PERMISSION_TYPE'));
      return res
        .status(400)
        .json({ message: translate('INVALID_PERMISSION_TYPE') });
    }

    if (!Array.isArray(roles) || !Array.isArray(users)) {
      logger.error(translate('ROLES_USERS_MUST_ARRAY'));
      return res
        .status(400)
        .json({ message: translate('ROLES_USERS_MUST_ARRAY') });
    }

    if (!start_time || !end_time) {
      logger.error(translate('START_END_TIME_REQUIRED'));
      return res
        .status(400)
        .json({ message: translate('START_END_TIME_REQUIRED') });
    }

    // Create and save the Permission
    const permission = new Permission({
      type,
      roles,
      users,
      start_time,
      end_time,
    });

    await permission.save();

    // Update the DataRoom with the new permission
    dataRoom.permissions.push(permission._id);
    await dataRoom.save();

    logger.info(
      `${translate('PERMISSION_CREATED')} => ${JSON.stringify(permission)}`
    );

    res
      .status(201)
      .json({ message: translate('PERMISSION_CREATED'), permission });
  } catch (error: any) {
    logger.error(translate('ERROR_CREATING_PERMISSION'));
    res.status(500).json({
      message: translate('ERROR_CREATING_PERMISSION'),
      error: error.message,
    });
  }
};

// Get Permission using Data Room Id and Permission Id
export const getPermission = async (req: Request, res: Response) => {
  try {
    const { dataroom_id, permission_id } = req.params;

    // Validate dataroom_id
    if (!isValidObjectId(dataroom_id)) {
      logger.error(translate('INVALID_DATAROOM_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_DATAROOM_ID') });
    }

    // Find the DataRoom by ID and populate permissions
    const dataRoom = await DataRoom.findById(dataroom_id).populate(
      "permissions"
    );
    if (!dataRoom) {
      logger.error(translate('DATA_ROOM_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('DATA_ROOM_NOT_FOUND') });
    }

    // Ensure the populated permissions field is of the correct type
    const populatedPermissions =
      dataRoom.permissions as unknown as Types.DocumentArray<IPermission>;

    // Find the permission within the dataRoom's permissions
    const permission = populatedPermissions.find(
      (p) => p._id.toString() === permission_id
    );

    if (!permission) {
      logger.error(translate('PERMISSION_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('PERMISSION_NOT_FOUND') });
    }

    logger.info(`Permission found => ${JSON.stringify(permission)}`);
    res.status(200).json(permission);
  } catch (error: any) {
    logger.error(translate('ERROR_FETCHING_PERMISSIONS'));
    res.status(500).json({
      message: translate('ERROR_FETCHING_PERMISSIONS'),
      error: error.message,
    });
  }
};

// Get all Data Room Permissions
export const getPermissions = async (req: Request, res: Response) => {
  try {
    const { dataroom_id } = req.params;

    // Validate dataroom_id
    if (!isValidObjectId(dataroom_id)) {
      logger.error(translate('INVALID_DATAROOM_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_DATAROOM_ID') });
    }

    // Find the DataRoom by ID and populate permissions
    const dataRoom = await DataRoom.findById(dataroom_id).populate(
      "permissions"
    );
    if (!dataRoom) {
      logger.error(translate('DATA_ROOM_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('DATA_ROOM_NOT_FOUND') });
    }

    logger.info(
      `Data Room Permissions found => ${JSON.stringify(dataRoom.permissions)}`
    );
    res.status(200).json(dataRoom.permissions);
  } catch (error: any) {
    logger.error(translate('ERROR_FETCHING_PERMISSIONS'));
    res.status(500).json({
      message: translate('ERROR_FETCHING_PERMISSIONS'),
      error: error.message,
    });
  }
};
// Update Permission
export const updatePermission = async (req: Request, res: Response) => {
  try {
    const { dataroom_id, permission_id } = req.params;
    const { type, roles, users, start_time, end_time } = req.body;

    // Validate dataroom_id
    if (!isValidObjectId(dataroom_id)) {
      logger.error(translate('INVALID_DATAROOM_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_DATAROOM_ID') });
    }

    // Validate permission_id
    if (!isValidObjectId(permission_id)) {
      logger.error(translate('INVALID_PERMISSION_ID'));``
      return res
        .status(400)
        .json({ message: translate('INVALID_PERMISSION_ID') });
    }

    // Validate permission type
    if (!PERMISSION_TYPES.includes(type)) {
      logger.error(translate('INVALID_PERMISSION_TYPE'));
      return res
        .status(400)
        .json({ message: translate('INVALID_PERMISSION_TYPE') });
    }

    // Validate roles and users
    if (!Array.isArray(roles) || !Array.isArray(users)) {
      logger.error(translate('ROLES_USERS_MUST_ARRAY'));
      return res
        .status(400)
        .json({ message: translate('ROLES_USERS_MUST_ARRAY') });
    }

    // Validate start and end times
    if (!start_time || !end_time) {
      logger.error(translate("START_END_TIME_REQUIRED"));
      return res
        .status(400)
        .json({ message: translate("START_END_TIME_REQUIRED") });
    }

    // Find the DataRoom
    const dataRoom: (IDataRoom & { permissions: string[] }) | null =
      await DataRoom.findById(dataroom_id);
    if (!dataRoom) {
      logger.error(translate('DATA_ROOM_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('DATA_ROOM_NOT_FOUND') });
    }

    // Check if permission_id exists in DataRoom permissions array
    if (!dataRoom.permissions.includes(permission_id)) {
      logger.error(translate('PERMISSION_NOT_FOUND_IN_DATA_ROOM'));
      return res
        .status(404)
        .json({ message: translate('PERMISSION_NOT_FOUND_IN_DATA_ROOM') });
    }

    // Find and update the Permission
    const permission: IPermission | null = await Permission.findById(
      permission_id
    );
    if (!permission) {
      logger.error(translate('PERMISSION_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('PERMISSION_NOT_FOUND') });
    }

    // Update permission fields
    permission.type = type;
    permission.roles = roles;
    permission.users = users;
    permission.start_time = start_time;
    permission.end_time = end_time;

    await permission.save();

    logger.info(`${translate('PERMISSION_UPDATED')} => ${permission_id}`);
    res
      .status(200)
      .json({ message: translate('PERMISSION_UPDATED'), permission });
  } catch (error: any) {
    logger.error(translate('ERROR_UPDATING_PERMISSION'));
    res.status(500).json({
      message: translate('ERROR_UPDATING_PERMISSION'),
      error: error.message,
    });
  }
};
export const deletePermission = async (req: Request, res: Response) => {
  try {
    const { dataroom_id, permission_id } = req.params;

    // Validate dataroom_id
    if (!mongoose.Types.ObjectId.isValid(dataroom_id)) {
      logger.error(translate('INVALID_DATAROOM_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_DATAROOM_ID') });
    }

    // Validate permission_id
    if (!mongoose.Types.ObjectId.isValid(permission_id)) {
      logger.error(translate('INVALID_PERMISSION_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_PERMISSION_ID') });
    }

    // Find the DataRoom
    const dataRoom: (IDataRoom & { permissions: Types.ObjectId[] }) | null =
      await DataRoom.findById(dataroom_id);
    if (!dataRoom) {
      logger.error(translate('DATA_ROOM_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('DATA_ROOM_NOT_FOUND') });
    }

    // Check if permission_id exists in DataRoom permissions array
    const permissionIndex = dataRoom.permissions.findIndex(
      (permission) => permission.toString() === permission_id
    );
    if (permissionIndex === -1) {
      logger.error(translate('PERMISSION_NOT_FOUND_IN_DATA_ROOM'));
      return res
        .status(404)
        .json({ message: translate('PERMISSION_NOT_FOUND_IN_DATA_ROOM') });
    }

    // Remove the permission ID from DataRoom
    dataRoom.permissions.splice(permissionIndex, 1);
    await dataRoom.save();

    // Find and delete the Permission
    const permission: IPermission | null = await Permission.findByIdAndDelete(
      permission_id
    );
    if (!permission) {
      logger.error(translate('PERMISSION_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('PERMISSION_NOT_FOUND') });
    }

    logger.info(
      `${translate('PERMISSION_DELETED')} => ${JSON.stringify(permission)}`
    );
    res
      .status(200)
      .json({ message: translate('PERMISSION_DELETED'), permission });
  } catch (error: any) {
    logger.error(translate('SERVER_ERROR'));
    res
      .status(500)
      .json({ message: translate('SERVER_ERROR'), error: error.message });
  }
};
export const checkUserPermissions = async (req: Request, res: Response) => {
  try {
    const { dataroom_id, user_id } = req.params;
    const { permissions } = req.body;

    // Validate dataroom_id and user_id
    if (!mongoose.Types.ObjectId.isValid(dataroom_id)) {
      logger.error(translate('INVALID_DATAROOM_ID'));
      return res
        .status(400)
        .json({ message: translate('INVALID_DATAROOM_ID') });
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      logger.error(translate('INVALID_USER_ID'));
      return res.status(400).json({ message: translate('INVALID_USER_ID') });
    }

    // Validate permissions array
    if (
      !permissions ||
      !Array.isArray(permissions) ||
      permissions.length === 0
    ) {
      logger.error(translate('INVALID_PERMISSIONS'));
      return res
        .status(400)
        .json({ message: translate('INVALID_PERMISSIONS') });
    }

    // Validate each permission type
    const validPermissions = PERMISSION_TYPES;
    for (const perm of permissions) {
      if (!validPermissions.includes(perm)) {
        logger.error(translate('INVALID_PERMISSION_TYPE'));
        return res
          .status(400)
          .json({ message: translate('INVALID_PERMISSION_TYPE') });
      }
    }

    const dataRoom: IDataRoom | null = await DataRoom.findById(dataroom_id);
    if (!dataRoom) {
      logger.error(translate('DATA_ROOM_NOT_FOUND'));
      return res
        .status(404)
        .json({ message: translate('DATA_ROOM_NOT_FOUND') });
    }

    // Fetch permissions details
    const permissionDetails: IPermission[] = await Permission.find({
      _id: { $in: dataRoom.permissions },
    });

    // Check if the user has the required permissions
    const hasPermission = permissionDetails.some((permission) => {
      return (
        permission.users.includes(user_id) &&
        permissions.includes(permission.type)
      );
    });

    if (!hasPermission) {
      logger.error(translate('PERMISSION_DENIED'));
      return res
        .status(403)
        .json({ message: translate('PERMISSION_DENIED') });
    }

    logger.info(translate('PERMISSION_GRANTED'));
    res.status(200).json({ message: translate('PERMISSION_GRANTED') });
  } catch (error: any) {
    logger.error(translate('SERVER_ERROR'));
    res
      .status(500)
      .json({ message: translate('SERVER_ERROR'), error: error.message });
  }
};
export default {
  createDataRoom,
  getDataRoom,
  getDataRooms,
  updateDataRoom,
  deleteDataRoom,
  createPermission,
  getPermission,
  getPermissions,
  updatePermission,
  deletePermission,
  checkUserPermissions,
};
