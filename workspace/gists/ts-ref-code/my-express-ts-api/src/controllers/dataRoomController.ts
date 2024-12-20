import mongoose from "mongoose"
import DataRoom  from "../models/dataRoom"
import {Request, Response} from 'express'

import {
    INVALID_MESSAGE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGES,
    PERMISSION_TYPES,
  } from "../constants"

const isValidObjectId = (id: any): boolean => mongoose.Types.ObjectId.isValid(id);

// Create Data Room
export const createDataRoom = async (req: Request, res: Response) => {
  try {
    const { client_id, name, description, user_id, key_info, permissions } =
      req.body;
    // Validate client_id and user_id
    if (!isValidObjectId(client_id)) {
      return res
        .status(400)
        .json({ message: INVALID_MESSAGE.INVALID_CLIENT_ID });
    }

    if (!isValidObjectId(user_id)) {
      return res.status(400).json({ message: INVALID_MESSAGE.INVALID_USER_ID });
    }

    // Validate name and description
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: INVALID_MESSAGE.INVALID_NAME });
    }

    if (typeof description !== "string" || description.trim() === "") {
      return res
        .status(400)
        .json({ message: INVALID_MESSAGE.INVALID_DESCRIPTION });
    }

    // Validate permissions
    if (!Array.isArray(permissions)) {
      return res
        .status(400)
        .json({ message: INVALID_MESSAGE.INVALID_PERMISSIONS });
    }

    permissions.forEach((permission) => {
      if (!isValidObjectId(permission.user_id)) {
        return res
          .status(400)
          .json({ message: INVALID_MESSAGE.INVALID_PERMISSIONS_USER_ID });
      }
    //   let PERMISSION_TYPES: string[] = ["VIEW", "READ", "WRITE", "CREATE"]
      if (!PERMISSION_TYPES.includes(permission.access_level)) {
        return res
          .status(400)
          .json({ message: INVALID_MESSAGE.INVALID_PERMISSIONS_ACCESS_LEVEL });
      }
    });

    const dataRoom = new DataRoom({
      client_id,
      name,
      description,
      user_id,
      creation_date: new Date(),
      key_info,
      permissions,
    });

    await dataRoom.save();
    res.status(201).json({
      message: SUCCESS_MESSAGE.DATA_ROOM_CREATED,
      dataRoom,
    });
  } catch (error) {
    console.error({ message: ERROR_MESSAGES.ERROR_CREATING_DATA_ROOM, error });
    res
      .status(500)
      .json({ message: ERROR_MESSAGES.ERROR_CREATING_DATA_ROOM, error });
  }
};

// Get a Specific Data Room
export const getDataRoom = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.dataroom_id)) {
      return res.status(400).json({
        message: ERROR_MESSAGES.MONGO_SCHEMA_ID_INVALID,
      });
    }
    const dataRoom = await DataRoom.findById(req.params.dataroom_id);
    if (!dataRoom) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.DATA_ROOM_NOT_FOUND });
    }
    console.info(`Data Room Fetched`);
    res.status(200).json(dataRoom);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
