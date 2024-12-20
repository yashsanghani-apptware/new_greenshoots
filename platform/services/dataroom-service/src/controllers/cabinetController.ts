// import Cabinet from "../models/cabinet";
import Cabinet, { ICabinet } from "../models/cabinet";
import File from "../models/file";
import mongoose, { Document, Types } from "mongoose";
import Permission, { IPermission } from "../models/permission";
import {Request, Response} from 'express';
import {translate, initI18n} from '../utils/i18n';
import {
  INVALID_MESSAGE,
  SUCCESS_MESSAGE,
  ERROR_MESSAGES,
  PERMISSION_TYPES,
  CABINET_TYPES
} from "../constants"
import DataRoom from "../models/dataRoom";
// Implement other CRUD operations for Cabinet

// const isValidObjectId = (id: any): boolean => mongoose.Types.ObjectId.isValid(id);
const isValidObjectId = (id: any): boolean => {
  return mongoose.isValidObjectId(id);
};

// Define the request body types for the specific endpoints
interface ICreateCabinetRequest extends Request {
  body: {
    dataroom: mongoose.Types.ObjectId; // The ID of the DataRoom this Cabinet belongs to
    ari: string; // The unique Agsiri Resource Identifier for the Cabinet
    name: string; // Human-readable name for the Cabinet
    description?: string; // A brief description of the Cabinet
    created_by: mongoose.Types.ObjectId; // User ID of the Cabinet creator
    created_at: Date; // Timestamp of when the Cabinet was created
    modified_by?: mongoose.Types.ObjectId; // User ID of the last person who modified the Cabinet
    modified_at?: Date; // Timestamp of the last modification
    deleted_at?: Date; // Timestamp for when the Cabinet was marked as deleted
    isDeleted?: boolean;
    type: "REGULAR" | "SECURE"; // Indicates the security level of the Cabinet
    parent_cabinet_id?: mongoose.Types.ObjectId; // ID of the parent Cabinet if nested
    regulatory_hold?: {
      hold_id: mongoose.Types.ObjectId; // Unique identifier for the regulatory hold
      reason: string; // Reason for the hold
      applied_by: mongoose.Types.ObjectId; // ID of the user who applied the hold
      applied_at: Date; // Date when the hold was applied
      status: "ACTIVE" | "RELEASED"; // Status of the hold
      released_at?: Date; // Date when the hold was lifted
    };
    workflow_triggers?: Array<{
      event: string; // Event that triggers the workflow
      workflow_id: mongoose.Types.ObjectId; // ID of the workflow to be triggered
      conditions?: Array<{
        attribute: string; // Attribute to evaluate in the condition
        operator: string; // Operator used for comparison
        value: any; // Value to compare against
        type: string; // Type of condition
      }>;
    }>;
    audit_trail?: mongoose.Types.ObjectId[]; // List of AuditLog entries related to this Cabinet
    files?: mongoose.Types.ObjectId[]; // List of Files stored in this Cabinet
  };
}

interface IUpdateCabinetRequest extends Request {
  body: {
    dataroom?: mongoose.Types.ObjectId;
    ari?: string;
    name?: string;
    description?: string;
    created_by?: mongoose.Types.ObjectId;
    modified_by?: mongoose.Types.ObjectId;
    type?: 'REGULAR' | 'SECURE';
    parent_cabinet_id?: mongoose.Types.ObjectId;
    regulatory_hold?: {
      hold_id?: mongoose.Types.ObjectId;
      reason?: string;
      applied_by?: mongoose.Types.ObjectId;
      applied_at?: Date;
      status?: 'ACTIVE' | 'RELEASED';
      released_at?: Date;
    };
    workflow_triggers?: Array<{
      event?: string;
      workflow_id?: mongoose.Types.ObjectId;
      conditions?: Array<{
        attribute?: string;
        operator?: string;
        value?: any;
        type?: string;
      }>;
    }>;
    files?: mongoose.Types.ObjectId[]; // Files are optional
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

export const createCabinet = async (req: ICreateCabinetRequest, res: Response) => {
  try {
    const {
      dataroom,
      ari,
      name,
      description,
      created_by,
      modified_by,
      type,
      parent_cabinet_id,
      regulatory_hold,
      workflow_triggers,
      files,
    } = req.body;


    // Validate dataroom
    if (!isValidObjectId(dataroom)) {
      return res.status(400).json({ message: translate('INVALID_DATAROOM_ID') });
    }

    // Validate ari
    if (typeof ari !== 'string' || ari.trim() === '') {
      return res.status(400).json({ message: translate('INVALID_ARI') });
    }

    // Validate name
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: translate('INVALID_NAME') });
    }

    // Validate description (if provided)
    if (description && typeof description !== 'string') {
      return res.status(400).json({ message: translate('INVALID_DESCRIPTION') });
    }

    // Validate created_by
    if (!isValidObjectId(created_by)) {
      return res.status(400).json({ message: translate('INVALID_USER_ID') });
    }

    // Validate modified_by (if provided)
    if (modified_by && !isValidObjectId(modified_by)) {
      return res.status(400).json({ message: translate('INVALID_MODIFIED_BY_ID') });
    }

    // Validate type
    if (!['REGULAR', 'SECURE'].includes(type)) {
      return res.status(400).json({ message: translate('INVALID_TYPE') });
    }

    // Validate parent_cabinet_id (if provided)
    if (parent_cabinet_id && !isValidObjectId(parent_cabinet_id)) {
      return res.status(400).json({ message: translate('INVALID_PARENT_CABINET_ID') });
    }

    // Validate regulatory_hold (if provided)
    if (regulatory_hold) {
      if (!isValidObjectId(regulatory_hold.hold_id)) {
        return res.status(400).json({ message: translate('INVALID_HOLD_ID') });
      }
      if (typeof regulatory_hold.reason !== 'string' || regulatory_hold.reason.trim() === '') {
        return res.status(400).json({ message: translate('INVALID_HOLD_REASON') });
      }
      if (!isValidObjectId(regulatory_hold.applied_by)) {
        return res.status(400).json({ message: translate('INVALID_APPLIED_BY_ID') });
      }
      if (!(regulatory_hold.status === 'ACTIVE' || regulatory_hold.status === 'RELEASED')) {
        return res.status(400).json({ message: translate('INVALID_HOLD_STATUS') });
      }
    }

   // Validate workflow_triggers (if provided)
    if (workflow_triggers) {
      if (!Array.isArray(workflow_triggers)) {
        return res.status(400).json({ message: translate('INVALID_WORKFLOW_TRIGGERS') });
      }
      
      for (const trigger of workflow_triggers) {
        if (typeof trigger.event !== 'string' || !isValidObjectId(trigger.workflow_id)) {
          return res.status(400).json({ message: translate('INVALID_WORKFLOW_TRIGGER') });
        }

        if (trigger.conditions) {
          if (!Array.isArray(trigger.conditions)) {
            return res.status(400).json({ message: translate('INVALID_CONDITIONS') });
          }

          for (const condition of trigger.conditions) {
            if (typeof condition.attribute !== 'string' || typeof condition.operator !== 'string') {
              return res.status(400).json({ message: translate('INVALID_CONDITION_ATTRIBUTE_OR_OPERATOR') });
            }
          }
        }
      }
    }


    // Validate files (if provided)
    if (files && !Array.isArray(files)) {
      return res.status(400).json({ message: translate('INVALID_FILES') });
    }
    if (files) {
      files.forEach(file => {
        if (!isValidObjectId(file)) {
          return res.status(400).json({ message: translate('INVALID_FILE_ID') });
        }
      });
    }

    // Create a new Cabinet document
    const cabinet = new Cabinet({
      dataroom,
      ari,
      name,
      description,
      created_by,
      modified_by,
      type,
      parent_cabinet_id,
      regulatory_hold,
      workflow_triggers,
      files: files || [], // Initialize with an empty array if no files provided
      isDeleted: false,
    });

    await cabinet.save();

    // Update DataRoom model to include this cabinet
    await DataRoom.findByIdAndUpdate(dataroom, { $push: { cabinets: cabinet._id } }, { new: true });

    res.status(201).json({
      message: translate('CABINET_CREATED'),
      cabinet,
    });
  } catch (error) {
    res.status(500).json({ message: translate('ERROR_CREATING_CABINET'), error });
  }
};

// Get List of Cabinets
export const getCabinets = async (req: Request, res: Response) => {
  try {
    const cabinet = await Cabinet.find({isDeleted: false}).populate("files");
    if (cabinet.length == 0)
      return res
        .status(200)
        .json({ message: translate('CABINET_NOT_AVAILABLE')});
    res.status(200).json(cabinet);
  } catch (error) {
    res.status(404).json({ message: translate('ERROR_FETCHING_CABINET') });
  }
};

// Get a Specific Cabinet
export const getCabinet = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.cabinet_id)) {
      return res.status(400).json({
        message: translate('MONGO_SCHEMA_ID_INVALID'),
      });
    }
    const cabinet = await Cabinet.findById(req.params.cabinet_id).populate("files");
    if (!cabinet) {
      return res
        .status(404)
        .json({ message: translate('CABINET_NOT_FOUND') });
    }
    cabinet?.isDeleted === true ? res.status(404).json({ message: ERROR_MESSAGES.CABINET_NOT_FOUND }) : res.status(200).json(cabinet);
  } catch (error) {
    res.status(404).json({ message: translate('ERROR_FETCHING_CABINET') });
  }
};

export const updateCabinet = async (req: IUpdateCabinetRequest, res: Response) => {
  try {
    const { cabinet_id } = req.params;
    const updateFields = req.body;

    // Validate cabinet_id
    if (!isValidObjectId(cabinet_id)) {
      return res.status(400).json({ message: translate('INVALID_CABINET_ID') });
    }

    // Validate dataroom if present
    if (updateFields.dataroom && !isValidObjectId(updateFields.dataroom)) {
      return res.status(400).json({ message: translate('INVALID_DATAROOM_ID') });
    }

    // Validate ari if present
    if (updateFields.ari && (typeof updateFields.ari !== 'string' || updateFields.ari.trim() === '')) {
      return res.status(400).json({ message: translate('INVALID_ARI') });
    }

    // Validate name if present
    if (
      (updateFields.name || updateFields.name === "") &&
       (typeof updateFields.name !== 'string' || updateFields.name.trim() === '')) {
      return res.status(400).json({ message: translate('INVALID_NAME') });
    } 

    // Validate description if present
    if (
      (updateFields.description || updateFields.description === "") &&
      (typeof updateFields.description !== 'string' ||
        updateFields.description.trim() === "")) {
      return res.status(400).json({ message: translate('INVALID_DESCRIPTION') });
    }

    // Validate created_by if present
    if (updateFields.created_by && !isValidObjectId(updateFields.created_by)) {
      return res.status(400).json({ message: translate('INVALID_CREATED_BY_ID') });
    }

    // Validate modified_by if present
    if (updateFields.modified_by && !isValidObjectId(updateFields.modified_by)) {
      return res.status(400).json({ message: translate('INVALID_MODIFIED_BY_ID') });
    }

    // Validate type if present
    if (updateFields.type && !CABINET_TYPES.includes(updateFields.type)) {
      return res.status(400).json({ message: translate('INVALID_TYPE') });
    }

    // Validate parent_cabinet_id if present
    if (updateFields.parent_cabinet_id && !isValidObjectId(updateFields.parent_cabinet_id)) {
      return res.status(400).json({ message: translate('INVALID_PARENT_CABINET_ID') });
    }

    // Validate regulatory_hold if present
    if (updateFields.regulatory_hold) {
      if (updateFields.regulatory_hold.hold_id && !isValidObjectId(updateFields.regulatory_hold.hold_id)) {
        return res.status(400).json({ message: translate('INVALID_HOLD_ID') });
      }
      if (updateFields.regulatory_hold.reason && typeof updateFields.regulatory_hold.reason !== 'string') {
        return res.status(400).json({ message: translate('INVALID_HOLD_REASON') });
      }
      if (updateFields.regulatory_hold.applied_by && !isValidObjectId(updateFields.regulatory_hold.applied_by)) {
        return res.status(400).json({ message: translate('INVALID_APPLIED_BY_ID') });
      }
      if (updateFields.regulatory_hold.status && !['ACTIVE', 'RELEASED'].includes(updateFields.regulatory_hold.status)) {
        return res.status(400).json({ message: translate('INVALID_HOLD_STATUS') });
      }
    }

    // Validate workflow_triggers (if provided)
if (updateFields.workflow_triggers) {
  if (!Array.isArray(updateFields.workflow_triggers)) {
    return res.status(400).json({ message: translate('INVALID_WORKFLOW_TRIGGERS') });
  }

  for (const trigger of updateFields.workflow_triggers) {
    // Validate workflow_id
    if (trigger.workflow_id && !isValidObjectId(trigger.workflow_id)) {
      return res.status(400).json({ message: translate('INVALID_WORKFLOW_ID') });
    }

    // Validate conditions (if provided)
    if (trigger.conditions) {
      if (!Array.isArray(trigger.conditions)) {
        return res.status(400).json({ message: translate('INVALID_CONDITIONS') });
      }

      for (const condition of trigger.conditions) {
        if (condition.attribute && typeof condition.attribute !== 'string') {
          return res.status(400).json({ message: translate('INVALID_CONDITION_ATTRIBUTE') });
        }

        if (condition.operator && typeof condition.operator !== 'string') {
          return res.status(400).json({ message: translate('INVALID_CONDITION_OPERATOR') });
        }
      }
    }
  }
}


    // Validate files if present
    if (updateFields.files) {
      if (!Array.isArray(updateFields.files)) {
        return res.status(400).json({ message: translate('INVALID_FILES') });
      }
      updateFields.files.forEach(file => {
        if (!isValidObjectId(file)) {
          return res.status(400).json({ message: translate('INVALID_FILE_ID') });
        }
      });
    }

    // Perform the update
    const cabinet = await Cabinet.findByIdAndUpdate(cabinet_id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!cabinet) {
      return res.status(404).json({ message: translate('CABINET_NOT_FOUND') });
    }

    res.status(200).json({
      message: translate('CABINET_UPDATED'),
      cabinet,
    });
  } catch (error: any) {
    res.status(500).json({
      message: translate('ERROR_UPDATING_CABINET'),
      error: error.message,
    });
  }
};

// Delete Cabinet
export const deleteCabinet = async (req: Request, res: Response) => {
  try {
    // Validate cabinet_id
    if (!isValidObjectId(req.params.cabinet_id)) {
      return res
        .status(400)
        .json({ message: translate('INVALID_CABINET_ID') });
    }
    const cabinetFiles = await Cabinet.findById(req.params.cabinet_id).populate("files");
    if (cabinetFiles?.files) {
      cabinetFiles?.files?.map(async (file) => {
        await File.findByIdAndUpdate(file._id, {isDeleted: true});
      })
    }
    const cabinet = await Cabinet.findByIdAndUpdate(req.params.cabinet_id, {
      isDeleted: true, new: true});
    if (!cabinet) {
      return res
        .status(404)
        .json({ message: translate('CABINET_NOT_FOUND') });
    }
    res.status(200).json({ message: translate('CABINET_DELETED') });
  } catch (error:any) {
    res
      .status(500)
      .json({
        message: translate('ERROR_DELETING_CABINET'),
        error: error.message,
      });
  }
};

// // Create Cabinet Permission
// export const createPermission = async (req: ICreatePermissionRequest, res: Response) => {
//   try {
//     const { cabinet_id } = req.params;
//     const { type, roles, users, start_time, end_time } = req.body;

//     if (!isValidObjectId(cabinet_id)) {
//       return res
//         .status(400)
//         .json({ message: translate('INVALID_CABINET_ID') });
//     }
//     const cabinet = await Cabinet.findById(cabinet_id);
//     if (!cabinet) {
//       return res
//         .status(404)
//         .json({ message: translate('CABINET_NOT_FOUND') });
//     }

//     // Validate permission data
//     if (!PERMISSION_TYPES.includes(type)) {
//       return res
//         .status(400)
//         .json({ message: translate('INVALID_PERMISSION_TYPE') });
//     }
//     if (!Array.isArray(roles) || !Array.isArray(users)) {
//       return res
//         .status(400)
//         .json({ message: translate('ROLES_USERS_MUST_ARRAY') });
//     }
//     if (!start_time || !end_time) {
//       return res
//         .status(400)
//         .json({ message: translate('START_END_TIME_REQUIRED') });
//     }

//     const permission = new Permission({
//       type,
//       roles,
//       users,
//       start_time,
//       end_time,
//     });
//     await permission.save();
//     cabinet.permissions.push(permission._id);
//     await cabinet.save();
//     res
//       .status(201)
//       .json({ message: translate('PERMISSION_CREATED'), permission });
//   } catch (error:any) {
//     res
//       .status(500)
//       .json({
//         message: translate('ERROR_CREATING_PERMISSION'),
//         error: error.message,
//       });
//   }
// };

// // Get Cabinet Permission
// export const getPermission = async (req: Request, res: Response) => {
//   try {
//     const { cabinet_id, permission_id } = req.params;
//     if (!isValidObjectId(cabinet_id)) {
//       return res
//         .status(400)
//         .json({ message: translate("INVALID_CABINET_ID") });
//     }

//     const cabinet = await Cabinet.findById(cabinet_id).populate("permissions");
//     if (!cabinet) {
//       return res
//         .status(404)
//         .json({ message: translate("CABINET_NOT_FOUND") });
//     }

//      // Ensure the populated permissions field is of the correct type
//     const populatedPermissions =
//       cabinet.permissions as unknown as Types.DocumentArray<IPermission>;

//     const permission = populatedPermissions.find((p) => p._id.toString() === permission_id);
//     if (!permission) {
//       return res
//         .status(404)
//         .json({ message: translate("PERMISSION_NOT_FOUND") });
//     }
//     res.status(200).json(permission);
//   } catch (error:any) {
//     res
//       .status(500)
//       .json({
//         message: translate("ERROR_FETCHING_PERMISSIONS"),
//         error: error.message,
//       });
//   }
// };

// // Get List of Cabinet Permissions
// export const getPermissions = async (req: Request, res: Response) => {
//   try {
//     const { cabinet_id } = req.params;

//     if (!isValidObjectId(cabinet_id)) {
//       return res
//         .status(400)
//         .json({ message: translate("INVALID_CABINET_ID") });
//     }

//     const cabinet = await Cabinet.findById(cabinet_id).populate("permissions");
//     if (!cabinet) {
//       return res
//         .status(404)
//         .json({ message: translate("CABINET_NOT_FOUND") });
//     }
//     res.status(200).json(cabinet.permissions);
//   } catch (error:any) {
//     res
//       .status(500)
//       .json({
//         message: translate("ERROR_FETCHING_PERMISSIONS"),
//         error: error.message,
//       });
//   }
// };

// // Update Cabinet Permission
// export const updatePermission = async (req: Request, res: Response) => {
//   try {
//     const { cabinet_id, permission_id } = req.params;
//     const { type, roles, users, start_time, end_time } = req.body;

//     // Validate cabinet_id
//     if (!isValidObjectId(cabinet_id)) {
//       return res
//         .status(400)
//         .json({ message: translate("INVALID_CABINET_ID") });
//     }

//     // Validate permission type
//     if (!PERMISSION_TYPES.includes(type)) {
//       return res
//         .status(400)
//         .json({ message: translate("INVALID_PERMISSION_TYPE") });
//     }

//     // Validate roles and users
//     if (!Array.isArray(roles) || !Array.isArray(users)) {
//       return res
//         .status(400)
//         .json({ message: translate("ROLES_USERS_MUST_ARRAY") });
//     }

//     // Validate start and end times
//     if (!start_time || !end_time) {
//       return res
//         .status(400)
//         .json({ message: translate("START_END_TIME_REQUIRED") });
//     }

//     // Find the Cabinet
//     const cabinet: (ICabinet & { permissions: string[] }) | null =
//     await Cabinet.findById(cabinet_id);
//     if (!cabinet) {
//       return res
//         .status(404)
//         .json({ message: translate("CABINET_NOT_FOUND") });
//     }

//     // Check if permission_id exists in Cabinet permissions array
//     if (!cabinet.permissions.includes(permission_id as any )) {
//       return res
//         .status(404)
//         .json({ message: translate("PERMISSION_NOT_FOUND_IN_CABINET") });
//     }

//     // Find and update the Permission
//      const permission: IPermission | null = await Permission.findById(
//       permission_id
//     );
//     if (!permission) {
//       return res
//         .status(404)
//         .json({ message: translate("PERMISSION_NOT_FOUND") });
//     }

//     // Update permission fields
//     permission.type = type;
//     permission.roles = roles;
//     permission.users = users;
//     permission.start_time = start_time;
//     permission.end_time = end_time;

//     await permission.save();

//     res
//       .status(200)
//       .json({ message: translate("PERMISSION_UPDATED"), permission });
//   } catch (error:any) {
//     res
//       .status(500)
//       .json({
//         message: translate("ERROR_UPDATING_PERMISSION"),
//         error: error.message,
//       });
//   }
// };

// // Delete Cabinet Permission
// export const deletePermission = async (req: Request, res: Response) => {
//   try {
//     const { cabinet_id, permission_id } = req.params;

//     // Validate cabinet_id
//     // if (!mongoose.Types.ObjectId.isValid(cabinet_id)) {
//       if (!isValidObjectId(cabinet_id)) {
//       return res
//         .status(400)
//         .json({ message: translate("INVALID_CABINET_ID") });
//     }

//     // Validate permission_id
//     // if (!mongoose.Types.ObjectId.isValid(permission_id)) {
//       if (!isValidObjectId(permission_id)) {
//       return res
//         .status(400)
//         .json({ message: translate("INVALID_PERMISSION_ID") });
//     }

//     // Find the Cabinet
//     const cabinet: (ICabinet & { permissions: string[] }) | null =
//     await Cabinet.findById(cabinet_id);
//     if (!cabinet) {
//       return res
//         .status(404)
//         .json({ message: translate("CABINET_NOT_FOUND") });
//     }

//     // Check if permission_id exists in Cabinet permissions array
//     const permissionIndex = cabinet.permissions.findIndex(
//       (permission) => permission.toString() === permission_id
//     );
//     if (permissionIndex === -1) {
//       return res
//         .status(404)
//         .json({ message: translate("PERMISSION_NOT_FOUND_IN_CABINET") });
//     }

//     // Remove the permission ID from Cabinet
//     cabinet.permissions.splice(permissionIndex, 1);
//     await cabinet.save();

//     // Find and delete the Permission
//     const permission: IPermission | null = await Permission.findByIdAndDelete(
//       permission_id
//     );
//     if (!permission) {
//       return res
//         .status(404)
//         .json({ message: translate("PERMISSION_NOT_FOUND") });
//     }

//     res
//       .status(200)
//       .json({ message: translate("PERMISSION_DELETED"), permission });
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Check User Permissions for Cabinet
// export const checkUserPermissions = async (req: Request, res: Response) => {
//   try {
//     const { cabinet_id, user_id } = req.params;
//     const { permissions } = req.body;

//     // Validate cabinet_id and user_id
//     // if (!mongoose.Types.ObjectId.isValid(cabinet_id)) {
//       if (!isValidObjectId(cabinet_id)) {
//       return res
//         .status(400)
//         .json({ message: translate("INVALID_CABINET_ID") });
//     }
//     // if (!mongoose.Types.ObjectId.isValid(user_id)) {
//       if (!isValidObjectId(user_id)) {
//       return res.status(400).json({ message: translate("INVALID_USER_ID") });
//     }

//     // Validate permissions array
//     if (
//       !permissions ||
//       !Array.isArray(permissions) ||
//       permissions.length === 0
//     ) {
//       return res
//         .status(400)
//         .json({ message: translate("INVALID_PERMISSIONS") });
//     }

//     const validPermissions = PERMISSION_TYPES; // Define valid permission types
//     for (const perm of permissions) {
//       if (!validPermissions.includes(perm)) {
//         return res
//           .status(400)
//           .json({ message: translate("INVALID_PERMISSION_TYPE") });
//       }
//     }

//     const cabinet: ICabinet | null = await Cabinet.findById(cabinet_id);
//     if (!cabinet) {
//       return res
//         .status(404)
//         .json({ message: translate("CABINET_NOT_FOUND") });
//     }

//     // Fetch permissions details
//     const permissionDetails: IPermission[] = await Permission.find({
//       _id: { $in: cabinet.permissions },
//     });

//     // Check if the user has the required permissions
//     const hasPermission = permissionDetails.some((permission:any) => {
//       return (
//         permission.users.includes(user_id) &&
//         permissions.includes(permission.type)
//       );
//     });

//     if (!hasPermission) {
//       return res
//         .status(403)
//         .json({ message: translate("PERMISSION_DENIED") });
//     }

//     res.status(200).json({ message:  translate("PERMISSION_GRANTED") });
//   } catch (error:any) {
//     res
//       .status(500)
//       .json({ message: translate("SERVER_ERROR"), error: error.message });
//   }
// };
