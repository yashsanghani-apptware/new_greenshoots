// Invalid error messages
export const INVALID_MESSAGE = {
  INVALID_CLIENT_ID: "Invalid client_id",
  INVALID_FILE_ID: "Invalid file_id",
  INVALID_STATUS: "Invalid status",
  INVALID_USER_ID: "Invalid user_id",
  INVALID_DATAROOM_ID: "Invalid dataroom_id",
  INVALID_NAME: "Invalid name",
  INVALID_DESCRIPTION: "Invalid description",
  INVALID_PERMISSIONS: "Invalid permissions",
  INVALID_PERMISSIONS_USER_ID: "Invalid permissions.user_id",
  INVALID_PERMISSIONS_ACCESS_LEVEL: "Invalid permissions.access_level",
  INVALID_KEY_INFO: "Invalid key_info",
  INVALID_PERMISSION_TYPE: "Invalid permission type in permissions array",
  INVALID_PERMISSION_ID: "Invalid permission_id",
  INVALID_TYPE: "Invalid type",
  INVALID_CABINET_ID: "Invalid cabinet_id",
  MISSING_REQUIRED_FILEDS_DOCUSIGN: "Missing required fields: signer_email, signer_name, cc_email, cc_name",
  INVALID_EMAIL_FORMAT: "Invalid email format for signer_email or cc_email",
  INAVLID_SIGNER_CC_NAME: "Signer name and CC name must not be empty",
  NO_FILES_UPLOADED: "No files uploaded"
} as const;

// Successful Messages
export const SUCCESS_MESSAGE = {
  DATA_ROOM_CREATED: "Data Room Created Successfully",
  DATA_ROOM_UPDATED: "Data Room updated successfully.",
  DATA_ROOM_DELETED: "Data Room deleted successfully.",
  FILE_DELETED: "File deleted successfully",
  PERMISSION_CREATED: "Permission created successfully.",
  PERMISSION_UPDATED: "Permission updated successfully.",
  PERMISSION_DELETED: "Permission deleted successfully",
  PERMISSION_GRANTED: "Permission granted",
  CABINET_CREATED: "Cabinet Created Successfully",
  CABINET_UPDATED: "Cabinet updated successfully.",
  CABINET_DELETED: "Cabinet deleted successfully.",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  ERROR_CREATING_DATA_ROOM: "Error creating data room",
  ERROR_UPDATING_DATA_ROOM: "Error updating data room.",
  ERROR_DELETING_DATA_ROOM: "Error deleting data room.",
  ERROR_CREATING_PERMISSION: "Error creating permission.",
  ERROR_FETCHING_FILE_PERMISSIONS: "Error fetching permissions.",
  ERROR_UPDATING_PERMISSION: "Error updating permission.",
  MONGO_SCHEMA_ID_INVALID:
    "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters",
  DATA_ROOM_NOT_FOUND: "Data Room not found",
  FILE_NOT_FOUND: "File not found",
  VERSION_NOT_FOUND: "Version not found",
  DATA_ROOM_NOT_AVAILABLE: "Data Rooms are not available",
  ERROR_FETCHING_DATA_ROOMS: "Error fetching data rooms",
  ERROR_FETCHING_PERMISSIONS: "Error retrieving permissions.",
  ROLES_USERS_MUST_ARRAY: "Roles and users must be arrays",
  START_END_TIME_REQUIRED: "Start and end times are required",
  PERMISSION_NOT_FOUND: "Permission not found",
  PERMISSION_NOT_FOUND_IN_DATA_ROOM: "Permission not found in Data Room",
  PERMISSION_DENIED: "Permission denied",
  SERVER_ERROR: "Server error",
  ERROR_CREATING_CABINET: "Error creating cabinet",
  CABINET_NOT_AVAILABLE: "Cabinet are not available",
  ERROR_FETCHING_CABINET: "Error fetching cabinet",
  CABINET_NOT_FOUND: "Cabinet not found",
  ERROR_UPDATING_CABINET: "Error updating cabinet.",
  ERROR_DELETING_CABINET: "Error deleting cabinet.",
  PERMISSION_NOT_FOUND_IN_CABINET: "Permission not found in Cabinet",
  NO_FILE_ATTACHED: "No file is attached",
  ONLY_ALLOWED_NAME_ACCEPTED: "Only the allowed file name are accepted",
} as const;

// Permission Types
export const PERMISSION_TYPES = ["VIEW", "READ", "WRITE", "CREATE"] as const;

export const FILE_TYPE = ["SHARED", "TEMPLATES", "SECURE"];

// Roles
export const ROLES = ["ADMIN", "INVESTOR", "FARM_USER"] as const;

// Cabinet Types
export const CABINET_TYPES = ["REGULAR", "SECURE"] as const;
